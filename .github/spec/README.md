# QA Workflow Protobuf Spec

This directory defines the machine-first handoff protocol for QA agents.

## Source of truth

- Schema: `qa_workflow.proto`
- Package: `qa.workflow.v1`
- Serialization: binary protobuf (`*.pb`)

## Required runtime outputs by plan

- `./tests/planN/workflow_state.pb`
- `./tests/planN/plan_routing.pb`
- `./tests/planN/documentation.pb`
- `./tests/planN/test_plan.pb`
- `./tests/planN/priority_matrix.pb`
- `./tests/planN/generated_test_cases.pb`
- `./tests/planN/automation.pb`
- `./tests/planN/error_events.pb`

## Human-trace outputs

- `./tests/planN/proceso.md`
- `./tests/planN/logs/wf-<workflow_id>.log`
- `./tests/planN/Documentation/summary.md`

## Validation policy

- JSON is deprecated for QA handoffs and validation.
- Agents must validate protobuf payloads against `qa_workflow.proto`.
- Invalid payloads must fail fast and be logged as error events.

## Validator command

- Validate available protobuf files for a plan:
	- `npm run validate:qa:protobuf -- --plan tests/planN`
- Strict mode (all required handoff files must exist):
	- `npm run validate:qa:protobuf:strict -- --plan tests/planN`

The validator decodes each `*.pb`, checks schema compatibility, and applies workflow invariants on `workflow_state.pb`.
