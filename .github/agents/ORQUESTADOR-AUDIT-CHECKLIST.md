# Checklist de Auditoria Orquestador QA

## Objetivo

Validar que cada ejecucion del Orquestador QA cumpla bootstrap obligatorio, enrutamiento por agente especializado y limites de dominio.

## Controles de entrada

- Existe `solicitud_qa` y se definio `target_stage` (o se aplica default `automation`).
- Se ejecuto bootstrap de contexto al inicio de la invocacion.
- El `workflow_id` permanece estable en toda la ejecucion.

## Controles de enrutamiento

- La etapa Documentation fue asignada a Test Documentation.
- La etapa Planner fue asignada a Test Planner.
- La etapa Prioritization fue asignada a Test Prioritization.
- La etapa Generator fue asignada a Test Generator.
- La etapa Automation fue asignada a Test Automation.
- Si se solicita etapa objetivo intermedia, el flujo se detiene al completar dicha etapa.

## Controles de dominio

- El orquestador no crea manualmente `documentation_artifact`.
- El orquestador no crea manualmente `test_plan_artifact`.
- El orquestador no crea manualmente `priority_matrix_artifact`.
- El orquestador no crea manualmente `generated_test_cases_artifact`.
- El orquestador no crea manualmente `automation_artifact`.
- Ningun artefacto especializado usa `updated_by: orchestrator`.

## Controles de consistencia

- `stages.<stage>.status` esta sincronizado con `artifacts.<artifact>.status`.
- Los artefactos especializados tienen `updated_by` del agente propietario.
- Existe trazabilidad entre requisitos y artefactos sin saltos de etapa.

## Controles de fallo y retry

- Cada fallo se registra en `./tests/planN/agent-errors.json`.
- Cada fallo se registra tambien en `./tests/planN/logs/wf-<workflow_id>.log`.
- Se aplica secuencia `log -> retry` hasta `max_attempts`.
- Si se agotan intentos, el workflow termina en `status_global: blocked`.
- Si hay bloqueo, el artefacto de la etapa fallida queda `missing` o `failed`.
- No hay sustitucion manual de salida tras fallo de agente.

## Red flags

- Aparece texto de completacion manual por parte del orquestador.
- Hay artefactos especializados en `ready` sin evidencia de invocacion de su agente.
- Hay `updated_by: orchestrator` en artefactos especializados.
- Hay estado `completed` en etapa con errores no resueltos.
- Hay diferencias entre `stages` y `artifacts` para la misma etapa.

Si se detecta una red flag, marcar el workflow como `blocked`, registrar incidencia y requerir correccion antes de continuar.
