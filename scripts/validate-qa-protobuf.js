#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const protobuf = require("protobufjs");

function parseArgs(argv) {
  const args = {
    plan: null,
    proto: path.join(".github", "spec", "qa_workflow.proto"),
    strict: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--plan") {
      args.plan = argv[i + 1];
      i += 1;
    } else if (token === "--proto") {
      args.proto = argv[i + 1];
      i += 1;
    } else if (token === "--strict") {
      args.strict = true;
    }
  }

  return args;
}

function exists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function checkWorkflowInvariants(message, errors) {
  if (!message.workflow_id) {
    errors.push("workflow_state.pb: workflow_id is required");
  }

  if (!message.stages || message.stages.length === 0) {
    errors.push("workflow_state.pb: stages must not be empty");
  }

  if (!message.artifacts || message.artifacts.length === 0) {
    errors.push("workflow_state.pb: artifacts must not be empty");
  }

  for (const stage of message.stages || []) {
    if (stage.status === 3 && stage.blocking_reason) {
      errors.push(
        `workflow_state.pb: stage ${stage.stage} is completed but has blocking_reason`
      );
    }
  }

  const blockedOrFailed = (message.stages || []).some(
    (s) => s.status === 4 || s.status === 5
  );
  if (message.status_global === 4 && !blockedOrFailed) {
    errors.push(
      "workflow_state.pb: status_global is blocked but no stage is blocked/failed"
    );
  }

  for (const artifact of message.artifacts || []) {
    const isSpecialized = [
      "documentation",
      "test_plan",
      "priority_matrix",
      "generated_test_cases",
      "automation",
    ].includes(artifact.artifact_key);

    if (isSpecialized && artifact.updated_by === "orchestrator") {
      errors.push(
        `workflow_state.pb: specialized artifact ${artifact.artifact_key} cannot have updated_by=orchestrator`
      );
    }
  }
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.plan) {
    console.error(
      "Usage: node scripts/validate-qa-protobuf.js --plan tests/planN [--proto .github/spec/qa_workflow.proto] [--strict]"
    );
    process.exit(2);
  }

  const root = await protobuf.load(args.proto);

  const filesToTypes = [
    ["workflow_state.pb", "qa.workflow.v1.WorkflowState"],
    ["plan_routing.pb", "qa.workflow.v1.RoutingDecision"],
    ["documentation.pb", "qa.workflow.v1.DocumentationHandoff"],
    ["test_plan.pb", "qa.workflow.v1.PlanningHandoff"],
    ["priority_matrix.pb", "qa.workflow.v1.PrioritizationHandoff"],
    ["generated_test_cases.pb", "qa.workflow.v1.GenerationHandoff"],
    ["automation.pb", "qa.workflow.v1.AutomationHandoff"],
    ["error_events.pb", "qa.workflow.v1.ErrorEventLog"],
  ];

  const errors = [];
  const warnings = [];
  let decodedCount = 0;

  for (const [fileName, typeName] of filesToTypes) {
    const filePath = path.join(args.plan, fileName);
    const Type = root.lookupType(typeName);

    if (!exists(filePath)) {
      const message = `${filePath}: missing`;
      if (args.strict) {
        errors.push(message);
      } else {
        warnings.push(message);
      }
      continue;
    }

    try {
      const buffer = fs.readFileSync(filePath);
      const decoded = Type.decode(buffer);
      const plain = Type.toObject(decoded, {
        longs: String,
        enums: Number,
        bytes: Buffer,
      });

      const verifyResult = Type.verify(plain);
      if (verifyResult) {
        errors.push(`${filePath}: ${verifyResult}`);
        continue;
      }

      if (fileName === "workflow_state.pb") {
        checkWorkflowInvariants(plain, errors);
      }

      decodedCount += 1;
    } catch (err) {
      errors.push(`${filePath}: decode failed (${err.message})`);
    }
  }

  for (const warning of warnings) {
    console.warn(`WARN ${warning}`);
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`ERROR ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `OK protobuf validation passed for ${args.plan}; decoded files: ${decodedCount}`
  );
}

main().catch((err) => {
  console.error(`ERROR unexpected failure: ${err.message}`);
  process.exit(1);
});
