# Flujo De Trabajo QA Multiagente

Este diagrama muestra el flujo canonical y las reglas de control del Orquestador QA.

```mermaid
flowchart TD
    A[Solicitud QA] --> B[Orquestador QA: Bootstrap Contexto]
    B --> C{Contexto valido?}
    C -- No --> C1[Marcar blocked + campos faltantes]
    C -- Si --> D[Routing por estado de artifacts]

    D --> E[Test Documentation]
    E --> E1[documentation.pb + Documentation/summary.md]
    E1 --> F[Test Planner]
    F --> F1[test_plan.pb]
    F1 --> G[Test Prioritization]
    G --> G1[priority_matrix.pb]
    G1 --> H[Test Generator]
    H --> H1[generated_test_cases.pb]
    H1 --> I[Test Automation]
    I --> I1[automation.pb + specs]
    I1 --> J[Orquestador valida completitud]

    J --> K{Target stage alcanzada?}
    K -- Si --> L[workflow_state.pb completed]
    K -- No --> D

    subgraph Guardrails
      R1[No sustitucion manual de artifacts especializados]
      R2[Retry policy: max_attempts=3]
      R3[Secuencia fallo: log -> retry -> abort]
      R4[Sincronizar stage.status y artifact.status]
    end

    D -. aplica .-> R1
    D -. aplica .-> R2
    D -. aplica .-> R3
    D -. aplica .-> R4

    subgraph Ownership por etapa
      O1[Documentation -> Test Documentation]
      O2[Planning -> Test Planner]
      O3[Prioritization -> Test Prioritization]
      O4[Generation -> Test Generator]
      O5[Automation -> Test Automation]
    end

    E -. owner .-> O1
    F -. owner .-> O2
    G -. owner .-> O3
    H -. owner .-> O4
    I -. owner .-> O5
```

## Secuencia resumida

1. El Orquestador recibe solicitud_qa y normaliza contexto.
2. Ejecuta routing secuencial por artifacts faltantes o incompletos.
3. Cada etapa produce su artifact protobuf y actualiza estado.
4. Ante fallo: log, reintento hasta 3 intentos, luego abort.
5. Se finaliza al completar target_stage o Automation por default.

## Skills minimas por agente

- Orquestador QA: bootstrap, validacion routing, sincronizacion, replanificacion, retries, guardrails.
- Test Documentation: extraccion, normalizacion, trazabilidad, huecos, dependencias.
- Test Planner: cobertura, suites, trazabilidad estructural, precondiciones.
- Test Prioritization: riesgo, buckets, automatizacion, rationale auditable.
- Test Generator: expansion detallada, datos de prueba, claridad operativa.
- Test Automation: implementacion Playwright, reutilizacion POM, trazabilidad tecnica.
