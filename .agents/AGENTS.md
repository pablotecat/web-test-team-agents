# QA Test Team Agents

Este documento define responsabilidades, entradas, salidas y limites de los agentes QA.

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
| Orquestador | 0 | Solicitud QA, contexto workflow | Routing, plan de ejecucion por etapas | Todos los implementados | No crea casos ni tests directamente |
| Test Documentation | 1 Planificacion | Documentacion funcional, API, UI, historias | documentation_artifact JSON | Orquestador | No define suites ni prioridades |
| Test Planner | 1 Planificacion | documentation_artifact JSON | test_plan_artifact JSON | Test Documentation | No clasifica Smoke/Regresion/Automatizacion |
| Test Prioritization | 1 Planificacion | test_plan_artifact JSON | priority_matrix_artifact JSON | Test Planner | No escribe codigo de tests |
| Test Generator | 2 Creacion | priority_matrix_artifact JSON | generated_test_cases_artifact JSON | Test Prioritization | No implementa pruebas Playwright |
| Test Automation | 2 Creacion | generated_test_cases_artifact JSON | automation_artifact JSON + specs | Test Generator | No replanifica ni reprioriza |

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

## Reglas de separacion

- Test Planner solo consume salida de Test Documentation.
- Test Prioritization es el unico agente que decide buckets de prioridad.
- Test Generator detalla casos; Test Automation implementa automatizacion.
- Ningun agente implementado asume responsabilidades de capas futuras.
