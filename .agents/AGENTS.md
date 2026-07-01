# QA Test Team Agents

Este documento define responsabilidades, entradas, salidas y limites de los agentes QA.

## Ubicacion de agentes

- Definiciones de agentes custom para VS Code Chat: `.github/agents/*.agent.md`.
- Definiciones de skills por agente: `.github/skills/*.skills.md`.
- En cada agente, la seccion `Skills operativas consolidadas` contiene solo lista de skills disponibles y referencia a su archivo en `.github/skills/`.
- Recursos compartidos del workflow QA: `.agents/shared/`.

## Estado de implementacion

Implementados en esta iteracion:
- Orquestador
- Capa Planificacion: Test Documentation, Test Planner, Test Prioritization
- Capa Creacion: Test Generator, Test Automation

No implementados por ahora (placeholders sin logica):
- Capa Creacion: Test Load
- Capa Ejecucion: Test CI/CD, Test A11y, Test Security
- Capa Analisis: Test Results, Test Logs, Test Dashboard

## Matriz de agentes

| Agente | Capa | Entrada principal | Salida principal | Dependencias | Limites |
|---|---|---|---|---|---|
| Orquestador | 0 | solicitud_qa (minimo) + contexto workflow (opcional) | Routing, plan de ejecucion por etapas, estado normalizado | Todos los implementados | No crea casos ni tests directamente |
| Test Documentation | 1 Planificacion | Documentacion funcional, API, UI, historias | documentation_artifact JSON | Orquestador | No define suites ni prioridades |
| Test Planner | 1 Planificacion | documentation_artifact JSON | test_plan_artifact JSON | Test Documentation | No clasifica Smoke/Regresion/Automatizacion |
| Test Prioritization | 1 Planificacion | test_plan_artifact JSON | priority_matrix_artifact JSON | Test Planner | No escribe codigo de tests |
| Test Generator | 2 Creacion | priority_matrix_artifact JSON | generated_test_cases_artifact JSON | Test Prioritization | No implementa pruebas Playwright |
| Test Automation | 2 Creacion | generated_test_cases_artifact JSON | automation_artifact JSON + specs | Test Generator | No replanifica ni reprioriza |

## Modo de entrada minima del Orquestador

- El punto de entrada recomendado es solo `solicitud_qa`.
- Si no existe `contexto_compartido`, el Orquestador debe autogenerarlo y validarlo contra `shared/context-schema.json`.
- El routing solo se ejecuta despues de normalizar y validar el contexto.

## Flujo de trabajo esperado

1. Orquestador recibe una tarea QA.
2. Orquestador enruta a Test Documentation.
3. Test Planner consume la salida de Documentation.
4. Test Prioritization consume la salida de Planner.
5. Test Generator consume la salida de Prioritization.
6. Test Automation consume la salida de Generator.
7. Orquestador valida completitud y consistencia.

## Contrato de intercambio

- Todos los handoffs entre agentes usan JSON segun shared/context-schema.json.
- Cada agente debe declarar:
  - input_contract
  - output_contract
  - done_criteria
  - known_risks
- Cada salida debe incluir trazabilidad a requirements_source y workflow_id.

## Politica de fallo y reintento

- Si un agente falla, esta prohibido completar manualmente su salida.
- Flujo obligatorio: registrar error -> reintentar mismo agente -> abortar si se agotan intentos.
- Politica default de reintentos: 3 intentos totales (2 reintentos).
- Todo fallo debe registrarse en log JSON y log textual por workflow dentro del plan activo.

## Reglas de separacion

- Test Planner solo consume salida de Test Documentation.
- Test Prioritization es el unico agente que decide buckets de prioridad.
- Test Generator detalla casos; Test Automation implementa automatizacion.
- Ningun agente implementado asume responsabilidades de capas futuras.
- Test Planner y Test Generator no priorizan ni clasifican.
- Test Prioritization tiene precedencia para sobrescribir prioridad/clasificacion preasignada por otros agentes, con rationale.

## Regla de documentacion por plan activo

- Test Documentation genera entregables por funcionalidad dentro de `./tests/planN/documentation/<feature_slug>/`.
- Debe mantener un indice en la raiz del plan activo con la ubicacion de cada funcionalidad.
- El artefacto documental debe incluir dependencias entre funcionalidades.
