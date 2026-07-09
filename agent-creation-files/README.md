# Agent Creation Files - Guía de Implementación

Este directorio contiene la especificación completa para crear los agentes de la capa de Planificación de QA.

## Archivos Principales

### 1. **HANDOFF_SPECIFICATION.md**
Especificación del formato híbrido de handoff que todos los agentes DEBEN usar.

**Contiene:**
- Estructura JSON base del handoff
- Flujo de información: Doc → Planner → Priorization
- Guardrails contra bucles infinitos
- Resumen .md trazable
- Estructura de directorios esperada

**Cuándo usarlo:**
- Al implementar la lógica de creación/validación de handoffs
- Como referencia para desarrolladores de agentes
- Para entender qué datos pasa cada agente al siguiente

---

### 2. **handoff-schema.json**
Schema JSON para validación de handoffs.

**Contiene:**
- Definición formal de la estructura del handoff
- Validaciones de tipos, enumeraciones, required fields
- Patrones para UUIDs, timestamps, etc.

**Cuándo usarlo:**
- Para validar JSON generado por agentes
- En pipelines CI/CD: `ajv validate -s schema.json -d handoff.json`
- Como referencia de tipos para IDEs/LSPs

---

### 3. **handoff-hooks-routing.md**
Guía de routing de feedback hooks y escaladas.

**Contiene:**
- Matriz de escaladas por agente
- Guardrails contra bucles (retry_count max 3)
- Ejemplos de flujos con retroalimentación
- Registro de escaladas
- Criterios de éxito

**Cuándo usarlo:**
- Al implementar lógica de escaladas en agentes
- Para entender cuándo escalar a qué agente
- Para debugging si hay bucles en ejecución

---

## Templates de Agentes

Ubicados en `./agent-templates/`

### **documentation.agent.md**
Template completo para Test Documentation Agent.

**Contiene:**
- Frontmatter con metadata
- Objetivo, fases de ejecución, formato de salida
- Criterios de finalización
- Guardrails operativos
- Manejo de retroalimentación
- Skills consolidadas

**Instrucciones de uso:**
1. Copiar como base para crear `.agent.md` real
2. Reemplazar secciones placeholder
3. Añadir lógica específica de skills
4. Validar que outputs match handoff schema

---

### **planner.agent.md**
Template completo para Test Planner Agent.

**Contiene:**
- Same structure as documentation.agent.md
- Fases específicas: Análisis → Diseño → Cobertura → Precondiciones → Trazabilidad → Handoff
- Criterios de finalización para designer de suites
- Manejo de escaladas a Documentation

---

### **priorization.agent.md**
Template completo para Test Prioritization Agent.

**Contiene:**
- Same structure
- Fases específicas: Riesgo → Automatización → Balance → Justificación → Handoff
- Output structures: risk_matrix.json, automation_selection.json, justification.md
- Manejo de conflictos y trade-offs

---

## Flujo de Implementación Recomendado

### Paso 1: Crear Orquestador QA
1. Implementar bootstrap de contexto compartido
2. Implementar validación previa al routing
3. Implementar retry_policy (max_attempts=3)
4. Implementar manejo de errores y logging

### Paso 2: Crear Test Documentation Agent
1. Basarse en `documentation.agent.md`
2. Implementar Skills de extracción y normalización
3. Validar outputs contra `handoff-schema.json`
4. Crear `Documentation/HANDOFF_Summary.md` al finalizar

### Paso 3: Crear Test Planner Agent
1. Basarse en `planner.agent.md`
2. Recibir handoff de Documentation
3. Validar usando schema
4. Implementar lógica de suite design
5. Crear suites JSON y coverage_model.json
6. Generar handoff para Priorization

### Paso 4: Crear Test Prioritization Agent
1. Basarse en `priorization.agent.md`
2. Recibir handoff de Planner
3. Implementar risk scoring
4. Implementar automation feasibility
5. Crear risk_matrix.json y automation_selection.json
6. Generar handoff para siguiente capa (o Orquestador)

### Paso 5: Validación End-to-End
1. Ejecutar flujo completo: Doc → Planner → Priorization
2. Validar cada handoff contra schema
3. Verificar no hay bucles infinitos
4. Revisar `Documentation/HANDOFF_Summary.md` tiene todas las actualizaciones

---

## Checklist de Implementación

### Por Agente
- [ ] Archivo `.agent.md` creado con frontmatter correcto
- [ ] Objetivo y fases documentadas
- [ ] Formato mínimo de salida especificado
- [ ] Criterios de finalización claros
- [ ] Guardrails operativos implementados
- [ ] Skills consolidadas referenciadas
- [ ] Lógica de handoff generación y validación

### Sistema Completo
- [ ] Estructura de `Documentation/` creada
- [ ] Schema handoff disponible en runtime
- [ ] Retry policy implementada en Orquestador
- [ ] Logging centralizado (escalation_log.md)
- [ ] Validación de handoffs en cada transición
- [ ] Test end-to-end ejecutado exitosamente

---

## Archivos de Salida Esperados

Al ejecutar el flujo completo, esperamos:

```
Documentation/
├── HANDOFF_Summary.md              # Actualizado por cada agente
├── escalation_log.md               # Registra todas las escaladas
├── requirements/
│   ├── extracted/
│   │   ├── by_area/
│   │   │   ├── auth.gherkin
│   │   │   ├── registration.gherkin
│   │   │   └── user_management.gherkin
│   │   ├── dependencies.json
│   │   └── gaps_identified.json
├── test_planning/
│   ├── suites/
│   │   ├── auth_suite.json
│   │   ├── registration_suite.json
│   │   └── user_management_suite.json
│   ├── coverage_model.json
│   └── preconditions.md
├── prioritization/
│   ├── risk_matrix.json
│   ├── automation_selection.json
│   └── justification.md
└── handoffs/                       # Histórico de handoffs
    ├── doc_to_planner_001.json
    ├── planner_to_prior_001.json
    └── ...
```

---

## Validación de Schemas

Para validar un handoff antes de procesarlo:

```bash
# Usando ajv-cli (si disponible)
ajv validate -s handoff-schema.json -d handoff.json

# O programáticamente (pseudocódigo)
const handoff = JSON.parse(fs.readFileSync('handoff.json'));
const valid = ajv.validate(handoffSchema, handoff);
if (!valid) {
  throw new Error(`Invalid handoff: ${ajv.errorsText()}`);
}
```

---

## Preguntas Frecuentes

**P: ¿Qué pasa si un agente genera un handoff inválido?**
R: El Orquestador DEBE validarlo contra schema antes de pasar al siguiente agente. Si es inválido:
1. Registrar error en `escalation_log.md`
2. Incrementar `retry_count`
3. Si `retry_count >= 3`, abortar con `status_global=blocked`

**P: ¿Cómo evito bucles infinitos?**
R: Implementa guardrails del `handoff-hooks-routing.md`:
1. Cada feedback_hook especifica destino claro
2. `retry_count` máximo 3
3. Escalation log centralizado (auditabilidad)

**P: ¿Puedo extender/modificar el formato?**
R: Solo si es documentado:
1. Actualiza `HANDOFF_SPECIFICATION.md`
2. Actualiza `handoff-schema.json`
3. Justifica cambio en código
4. Ejecuta validación end-to-end nuevamente

---

## Recursos Relacionados

- `./HANDOFF_SPECIFICATION.md` - Especificación completa
- `./handoff-schema.json` - Validación formal
- `./handoff-hooks-routing.md` - Routing de escaladas
- `./agent-templates/` - Templates por agente
