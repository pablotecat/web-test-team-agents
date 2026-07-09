# Especificación de Handoff Híbrido para QA

## Descripción General

El formato de handoff híbrido fue diseñado para transmitir información eficientemente entre agentes de la capa de Planificación, considerando:

- **Eficiencia de tokens:** Referencias a archivos + delta changes (no copias completas)
- **Trazabilidad auditada:** Cada handoff registro quién, qué, cuándo cambió
- **Evitar bucles:** Feedback hooks explícitos previenen retroalimentación circular
- **Retroalimentación controlada:** Cada agente sabe a qué agente volver en caso de problemas

## Estructura Base JSON

```json
{
  "handoff": {
    "metadata": {
      "from_agent": "string",
      "to_agent": "string",
      "session_id": "uuid",
      "timestamp": "ISO8601",
      "retry_count": 0,
      "correlation_id": "para rastrear retroalimentación"
    },
    "context": {
      "user_request_id": "solicitud_qa original",
      "phase": "planning_layer",
      "status": "ready_for_handoff|escalated|failed"
    },
    "executive_summary": {
      "state_snapshot": "descripción compacta del estado actual",
      "critical_findings": ["hallazgos que afectan al siguiente agente"],
      "recommendation": "qué debe enfatizar el siguiente agente"
    },
    "artifacts_references": {
      "path_pattern": "ruta donde buscar los archivos generados",
      "summary_md": "ruta al resumen .md con cambios",
      "raw_data": "ruta a archivos especializados",
      "version_hash": "checksum para validar integridad"
    },
    "delta_changes": {
      "added": ["items nuevos"],
      "modified": ["items actualizados"],
      "removed": ["items eliminados"],
      "updated_by": "nombre del agente",
      "rationale": "breve explicación de cambios"
    },
    "validation_checklist": {
      "status": "passed|warning|failed",
      "checks": {}
    },
    "next_agent_instructions": {
      "must_validate": ["lista de validaciones obligatorias"],
      "can_skip": ["qué NO necesita repetir"],
      "decision_points": ["dónde necesita tomar decisiones"]
    },
    "feedback_hooks": {
      "if_gaps_found": "escalate_to: agent_name",
      "if_coverage_impossible": "escalate_to: orchestrator",
      "if_conflict_detected": "conflict_resolution_strategy"
    }
  }
}
```

## Flujo de Información

### 1. Orquestador → Test Documentation
- **Entrada:** `solicitud_qa` con requisitos generales
- **Salida:** Handoff con lista de requisitos extraídos, gaps identificados, particionado por área
- **Resumen:** `Documentation/HANDOFF_Summary.md`

### 2. Test Documentation → Test Planner
- **Entrada:** Requisitos normalizados en Gherkin
- **Salida:** Handoff con suites diseñadas, cobertura modelada, precondiciones definidas
- **Resumen:** `Documentation/HANDOFF_Summary.md` (actualizado)
- **Validación:** Planner verifica que los gaps no impidan diseño de cobertura

### 3. Test Planner → Test Priorization
- **Entrada:** Suites diseñadas con escenarios modelados
- **Salida:** Handoff con matriz de riesgo, selección de automatización, justificación
- **Resumen:** `Documentation/HANDOFF_Summary.md` (actualizado)
- **Validación:** Priorization evalúa factibilidad de cobertura

### Retroalimentación (Feedback Loops)
- Si **Planner** encuentra gaps que bloquean diseño → escalate a **Test Documentation**
- Si **Priorization** identifica cobertura imposible → escalate a **Test Planner**
- Si hay conflictos irresolubles → escalate a **Orquestador**

## Guardrails contra Bucles Infinitos

1. **Cada feedback_hook especifica destino y estrategia**
   - `if_gaps_found: "escalate_to: test_documentation"`
   - Esto previene que agentes retroalimenten arbitrariamente

2. **Retry policy en Orquestador**
   - Max 3 intentos antes de abortar con `status_global=blocked`
   - Cada intento registra error en log

3. **Validation checklist prevé conflictos**
   - Antes de handoff, el agente valida sus salidas
   - Si hay warning/failed, incluye en executive_summary

## Resumen .md Trazable

Cada agente actualiza centralmente `Documentation/HANDOFF_Summary.md`:

```markdown
## Generado por: [Agent Name]
**Timestamp:** [ISO8601]
**Updated by:** [agent_name]
**Session ID:** [uuid]

### Cambios Realizados
- ✅ [logro 1]
- ✅ [logro 2]
- ⚠️ [warning con contexto]

### Decisiones Tomadas
- [decisión y justificación]

### Problemas/Conflictos Detectados
- [problema y estrategia de resolución]
```

## Criterios de Éxito

| Criterio | Descripción |
|----------|-------------|
| **Trazabilidad** | Cada cambio tiene `updated_by`, `timestamp`, `rationale` |
| **Eficiencia** | No hay duplicación de contenido entre handoffs |
| **No-bucles** | Feedback hooks explícitos; max 3 reintentos |
| **Claridad** | Executive summary permite decidir sin leer todos los files |
| **Auditabilidad** | Logs de error centralizados en caso de fallos |

## Estructura de Directorios Esperada

```
Documentation/
├── HANDOFF_Summary.md              # Resumen trazable (actualizado por cada agente)
├── requirements/
│   ├── extracted/                  # Output de Test Documentation
│   │   ├── by_area/
│   │   │   ├── auth.gherkin
│   │   │   ├── registration.gherkin
│   │   │   └── user_management.gherkin
│   │   ├── dependencies.json
│   │   └── gaps_identified.json
├── test_planning/
│   ├── suites/                     # Output de Test Planner
│   │   ├── auth_suite.json
│   │   ├── registration_suite.json
│   │   └── user_management_suite.json
│   └── coverage_model.json
├── prioritization/
│   ├── risk_matrix.json            # Output de Test Priorization
│   ├── automation_selection.json
│   └── justification.md
```
