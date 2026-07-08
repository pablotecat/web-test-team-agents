# Prompt Maestro Para Regenerar Agentes QA En Otro Proyecto

Usa el siguiente prompt con tu LLM para que reconstruya, desde cero, el sistema de agentes QA con workflow orquestado y handoffs en protobuf.

## Prompt listo para copiar

Quiero que actues como arquitecto de un sistema multiagente de QA y que generes, desde cero, la estructura completa de agentes y skills para mi nuevo repositorio.

Objetivo general:
- Implementar un workflow QA machine-first con handoffs en protobuf.
- Flujo obligatorio: Documentation -> Planning -> Prioritization -> Generation -> Automation.
- Debe existir un agente Orquestador QA que enrute por etapas y no sustituya nunca el trabajo de especialistas.

Requisitos de arquitectura:
1. Crear contrato protobuf canonico en .github/spec/qa_workflow.proto con:
- enums Stage y Status
- WorkflowRequest, RetryPolicy, StageState, ArtifactState, TraceLink, ErrorEvent, ErrorEventLog
- WorkflowState
- RoutingDecision
- DocumentationHandoff, PlanningHandoff, PrioritizationHandoff, GenerationHandoff, AutomationHandoff

2. Crear agentes en .github/agents con estos nombres exactos:
- orquestador-qa.agent.md
- test-documentation.agent.md
- test-planner.agent.md
- test-prioritization.agent.md
- test-generator.agent.md
- test-automation.agent.md

3. Crear skills en .github/skills con estos nombres exactos:
- orquestador-qa.skills.md
- test-documentation.skills.md
- test-planner.skills.md
- test-prioritization.skills.md
- test-generator.skills.md
- test-automation.skills.md

4. Todos los handoffs de etapa deben escribirse en ./tests/planN/*.pb:
- documentation.pb
- test_plan.pb
- priority_matrix.pb
- generated_test_cases.pb
- automation.pb
- plan_routing.pb
- workflow_state.pb
- error_events.pb

5. El Orquestador QA debe:
- aceptar como entrada minima solo solicitud_qa
- bootstrapear contexto si contexto_compartido no existe
- validar estructura antes de enrutar
- aplicar retry_policy max_attempts=3
- registrar errores por intento fallido
- abortar con status_global=blocked al agotar intentos
- nunca generar manualmente artifacts especializados
- nunca usar updated_by=orchestrator en artifacts especializados

6. Reglas de ownership por etapa (obligatorio):
- Documentation -> Test Documentation
- Planning -> Test Planner
- Prioritization -> Test Prioritization
- Generation -> Test Generator
- Automation -> Test Automation

7. Regla de autoridad:
- Solo Test Prioritization decide bucket y automation_candidate.
- Test Planner y Test Generator no pueden priorizar ni reclasificar.

8. Salida requerida por agente:
- Cada archivo .agent.md debe incluir: frontmatter (name, description, role, inputs, outputs, non_goals y/o owned_decisions), objetivo, pasos, formato minimo de salida, criterios de finalizacion y seccion Skills operativas consolidadas apuntando a su archivo .skills.md.

9. Skills minimas obligatorias por agente:
- Orquestador QA:
  - Bootstrap de contexto compartido
  - Validacion previa al routing
  - Enrutamiento por estado de artefactos
  - Sincronizacion de contexto inter-agente
  - Resolucion de conflictos de responsabilidad
  - Replanificacion controlada
  - Manejo de fallos y reintentos
  - Guardrails de dominio y auditoria

- Test Documentation:
  - Extraccion de requisitos
  - Normalizacion de lenguaje
  - Trazabilidad a fuentes
  - Identificacion de huecos
  - Particionado por area
  - Mapeo de dependencias

- Test Planner:
  - Modelado de cobertura
  - Diseno de suites
  - Trazabilidad estructural
  - Definicion de precondiciones
  - Limite de responsabilidad

- Test Prioritization:
  - Evaluacion de riesgo
  - Seleccion de automatizacion
  - Balance de cobertura
  - Justificacion auditable
  - Priorizacion basada en documentacion
  - Autoridad de sobrescritura

- Test Generator:
  - Expansion de casos
  - Diseno de datos de prueba
  - Claridad operativa
  - Preparacion para automatizacion
  - Limite de priorizacion

- Test Automation:
  - Implementacion Playwright
  - Reutilizacion de POM
  - Trazabilidad tecnica
  - Calidad de codigo de pruebas

10. Validaciones funcionales que debes implementar en los textos de instrucciones:
- El Orquestador no puede rutear si el contexto no esta normalizado.
- Si falla una etapa y aun hay intentos, secuencia obligatoria: log -> retry.
- Si se agotan intentos: log -> abort y artifact asociado en failed o missing.
- No marcar un artifact como ready si no cumple su output_contract.
- Mantener sincronizados stage.status y artifact.status en cada transicion.

11. Entregables adicionales:
- .github/AGENTS.md con matriz de agentes, limites y reglas de separacion.
- .github/spec/README.md con instrucciones para validar protobuf.
- Un ejemplo de workflow inicial en ./tests/plan1 con placeholders validos de salida (sin inventar resultados de negocio).

12. Formato de respuesta que debes devolver:
- Primero: arbol de archivos a crear.
- Segundo: contenido completo de cada archivo en bloques separados.
- Tercero: checklist de verificacion final por etapa.

Importante:
- No uses JSON para handoff operativo entre agentes; solo protobuf binario.
- Usa markdown solo para trazabilidad humana (resumenes y logs).
- Evita contradicciones de ownership entre agentes.
- Mantener nombres de archivos y etapas exactamente como se especifican.

Si te falta algun dato del dominio del proyecto, propon defaults explicitos y continua.

## Como usar este prompt

1. Pegalo completo en tu LLM.
2. Cambia solo:
- nombre de proyecto
- rutas si no usas .github o tests/planN
- stack de automatizacion (si no usaras Playwright)
3. Conserva sin cambios las reglas de ownership, retry y handoff protobuf.
