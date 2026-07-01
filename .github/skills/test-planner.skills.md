# Skills de Test Planner

## Skill 1: Modelado de cobertura

- Traducir requisitos a cobertura de pruebas.
- Evitar huecos y duplicidades.

## Skill 2: Diseno de suites

- Organizar suites por flujos funcionales coherentes.
- Mantener granularidad adecuada para mantenimiento.

## Skill 3: Trazabilidad estructural

- Conectar cases con `requirement_ids` de origen.
- Mantener IDs estables para etapas posteriores.

## Skill 4: Definicion de precondiciones

- Incluir contexto minimo para ejecutar cada case.
- Preparar salida util para priorizacion.

## Skill 5: Limite de responsabilidad

- Test Planner no decide prioridad ni clasificacion.
- Si existen campos de prioridad en entrada, preservarlos sin cambios.
- Delegar toda decision de bucket/prioridad a Test Prioritization.