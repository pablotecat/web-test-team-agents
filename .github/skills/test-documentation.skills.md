# Skills de Test Documentation

## Skill 1: Extraccion de requisitos

- Leer requisitos funcionales en multiples formatos.
- Separar funcionalidad, validacion y reglas.

## Skill 2: Normalizacion de lenguaje

- Convertir texto ambiguo a definiciones claras para QA.
- Priorizar exactitud sobre completitud especulativa.

## Skill 3: Trazabilidad a fuentes

- Asociar cada `requirement_id` con su fuente.

## Skill 4: Identificacion de huecos

- Detectar informacion faltante que impacta pruebas.
- Emitir `open_questions` para resolver antes de automatizar.

## Skill 5: Particionado por funcionalidad

- Separar documentacion por funcionalidad en el plan activo (`./tests/planN`).
- Mantener estructura por `feature_slug` y archivos consistentes por funcionalidad.
- Publicar indice de ubicaciones en la raiz del plan activo.

## Skill 6: Mapeo de dependencias

- Identificar dependencias entre funcionalidades.
- Incluir `dependencies` en `documentation_artifact`.
- Aportar contexto para priorizacion basada en impacto cruzado.