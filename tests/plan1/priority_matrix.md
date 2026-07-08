# Priority Matrix (Plan 1)

- artifact_type: priority_matrix.pb
- schema: .github/spec/qa_workflow.proto#PrioritizationHandoff
- workflow_id: wf-plan1-20260707-001
- produced_by: Test Prioritization

## Summary

- Smoke: 5
- Regression: 5
- Automation candidates: 10

## Entries

| case_id | bucket | automation_candidate | rationale |
|---|---|---:|---|
| PLN-UI-001 | Smoke | true | Critical gate for required fields in core registration path; high impact and very stable browser-level validation. |
| PLN-UI-002 | Regression | true | Input-format negative path for UI quality; important but secondary to end-to-end registration availability. |
| PLN-UI-003 | Smoke | true | Primary success outcome for FLOW-001; validates submit success feedback and post-submit reset behavior. |
| PLN-NAV-001 | Smoke | true | Basic application sanity and discoverability check; broken navigation blocks access to user management workflows. |
| PLN-UI-004 | Regression | true | High-value integrated UI CRUD flow with multiple dependencies; broader scenario better suited for regression cycle. |
| PLN-API-REG-001 | Smoke | true | Core business API for user creation; must stay healthy for system operability and downstream user flows. |
| PLN-API-REG-002 | Smoke | true | Required-field validation directly mitigates documented data-quality risk and protects contract integrity early. |
| PLN-API-USR-001 | Regression | true | Read-by-id positive and negative behavior is important for CRUD completeness but not first-line startup sanity. |
| PLN-API-USR-002 | Regression | true | Update path combines validation and not-found handling; valuable repeated check with moderate implementation cost. |
| PLN-API-USR-003 | Regression | true | Delete lifecycle coverage is key for full CRUD confidence and aligns with documented gap risk in skipped tests. |

## Bucket Counts

| bucket | count |
|---|---:|
| Smoke | 5 |
| Regression | 5 |