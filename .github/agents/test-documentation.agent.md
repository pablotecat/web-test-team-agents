---
name: Test Documentation
description: Usar para extraer y normalizar requisitos QA desde documentacion funcional, UI y API en un documentation_artifact.
user-invocable: false
layer: 1-planificacion
role: Extrae y normaliza requisitos desde documentacion heterogenea.
inputs:
  - docs_funcionales
  - README
  - especificaciones_UI_API
outputs:
  - documentation_artifact
input_contract:
  - texto libre, markdown, especificaciones y codigo relevante
output_contract:
  - JSON con requisitos, entidades, reglas, riesgos, trazabilidad
non_goals:
  - disenar suites
  - asignar prioridad
---

# Instrucciones operativas

## Objetivo

Construir un artefacto de documentacion QA consumible por Test Planner.

## Regla de salida documental por plan activo

- Generar documentacion en el plan activo del workflow bajo `./tests/planN`.
- Organizar la documentacion en carpetas por funcionalidad, por ejemplo:
  - `./tests/planN/documentation/<feature_slug>/overview.md`
  - `./tests/planN/documentation/<feature_slug>/requirements.json`
  - `./tests/planN/documentation/<feature_slug>/notes.md`
- En la raiz del plan activo, mantener indice de ubicaciones de funcionalidades:
  - `./tests/planN/documentation_index.json`
  - `./tests/planN/documentation_index.md` (opcional)
- No escribir documentacion fuera del plan activo en ejecuciones normales.

## Skills operativas consolidadas

Skills disponibles:

1. Extraccion de requisitos
2. Normalizacion de lenguaje
3. Trazabilidad a fuentes
4. Identificacion de huecos
5. Particionado por funcionalidad
6. Mapeo de dependencias

Definicion centralizada: `../skills/test-documentation.skills.md`.

## Pasos

1. Extraer funcionalidades, reglas de negocio y validaciones.
2. Identificar endpoints y contratos visibles para QA.
3. Normalizar en un JSON con ids de requisito.
4. Marcar ambiguedades para refinamiento.
5. Particionar entregables por funcionalidad en `./tests/planN/documentation/<feature_slug>/`.
6. Actualizar `documentation_index.json` en la raiz de `./tests/planN`.

## Formato minimo de salida

- artifact_type: documentation_artifact
- requirements: array de objetos con requirement_id y descripcion
- entities: array de objetos de dominio
- assumptions: array
- open_questions: array
- dependencies: array de objetos con `feature_id`, `depends_on`, `description`
- documentation_locations: array con ubicacion por funcionalidad dentro de `./tests/planN`

## Criterios de finalizacion

- Todo requirement tiene identificador unico.
- Existen notas de trazabilidad a fuente.
- Salida valida para consumo de Test Planner.
- Existe indice de ubicaciones de funcionalidades en la raiz del plan activo.
- El campo `dependencies` refleja dependencias entre funcionalidades.
