
wf-plan1-20260707-001Test Prioritizationâ

PLN-UI-001Smoke"rCritical gate for required fields in core registration path; high impact and very stable browser-level validation.á

PLN-UI-002
Regression"kInput-format negative path for UI quality; important but secondary to end-to-end registration availability.~

PLN-UI-003Smoke"gPrimary success outcome for FLOW-001; validates submit success feedback and post-submit reset behavior.â
PLN-NAV-001Smoke"qBasic application sanity and discoverability check; broken navigation blocks access to user management workflows.è

PLN-UI-004
Regression"sHigh-value integrated UI CRUD flow with multiple dependencies; broader scenario better suited for regression cycle.Ñ
PLN-API-REG-001Smoke"hCore business API for user creation; must stay healthy for system operability and downstream user flows.å
PLN-API-REG-002Smoke"pRequired-field validation directly mitigates documented data-quality risk and protects contract integrity early.ê
PLN-API-USR-001
Regression"oRead-by-id positive and negative behavior is important for CRUD completeness but not first-line startup sanity.ì
PLN-API-USR-002
Regression"rUpdate path combines validation and not-found handling; valuable repeated check with moderate implementation cost.ê
PLN-API-USR-003
Regression"oDelete lifecycle coverage is key for full CRUD confidence and aligns with documented gap risk in skipped tests.