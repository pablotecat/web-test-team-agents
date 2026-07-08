# Skills de Test Documentation

## Skill 1: Extraccion de requisitos

- Leer requisitos funcionales en multiples formatos.
- Separar funcionalidad, validacion y reglas.
- Asegurar que cada requirement incluya `acceptance_criteria` Gherkin (`given[]`, `when[]`, `then[]`).

## Skill 2: Normalizacion de lenguaje

- Convertir texto ambiguo a definiciones claras para QA.
- Priorizar exactitud sobre completitud especulativa.
- Estandarizar criterios de aceptacion en formato estructurado (arrays por `given`, `when`, `then`).

## Skill 3: Trazabilidad a fuentes

- Asociar cada `requirement_id` con su fuente.

## Skill 4: Identificacion de huecos

- Detectar informacion faltante que impacta pruebas.
- Emitir `open_questions` para resolver antes de automatizar.

## Skill 5: Particionado por area

- Separar documentacion en el plan activo bajo `./tests/planN/Documentation`.
- Generar handoff machine-first en `./tests/planN/documentation.pb`.
- Usar contrato `.github/spec/qa_workflow.proto#DocumentationHandoff`.
- Generar `summary.md` con listas de Requirements, Flows, Risks y Dependencies (cada item con `id` y `title`).

## Skill 6: Mapeo de dependencias

- Identificar dependencias entre funcionalidades.
- Incluir `dependencies` en el mensaje protobuf de documentation.
- Aportar contexto para priorizacion basada en impacto cruzado.
- Modelar dependencias por requirement con `id`, `title`, `requirement_id`, `depends_on[]`, `description` y `external_reference` opcional.

## Reglas de formato obligatorias

- `acceptance_criteria` de nivel raiz no debe existir.
- Cada `flow` debe incluir `acceptance_criteria` Gherkin (`given[]`, `when[]`, `then[]`).
- La salida operativa debe serializarse en protobuf y validarse contra el schema vigente.
- JSON esta deprecado para handoff y validacion.