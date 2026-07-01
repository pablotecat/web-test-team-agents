# Skills de Orquestador QA

## Skill 1: Bootstrap de contexto compartido

- Construir `contexto_compartido` valido cuando solo llega `solicitud_qa`.
- Inicializar etapas y artifacts faltantes con defaults seguros.
- Completar `updated_by` en todos los artifacts.

## Skill 2: Validacion previa al routing

- Bloquear decisiones de routing sobre contexto invalido o incompleto.
- Devolver `estado_validacion: blocked` cuando falten precondiciones.

## Skill 3: Enrutamiento por estado de artefactos

- Determinar la siguiente etapa usando el estado actual de `stages` y `artifacts`.
- Generar `siguiente_agente` y `razon_de_routing` trazables.

## Skill 4: Sincronizacion de contexto inter-agente

- Asegurar consistencia de `workflow_id`, estado y ownership.
- Sincronizar estado de etapa con estado del artifact asociado.

## Skill 5: Resolucion de conflictos de responsabilidad

- Resolver solapamientos entre agentes y reforzar limites.
- Regla clave: Test Prioritization decide prioridad, no Planner ni Generator.

## Skill 6: Replanificacion controlada

- Invalidar solo etapas dependientes cuando cambian requisitos.
- Conservar artifacts previos como referencia draft cuando aplique.

## Skill 7: Manejo de fallos y reintentos

- Nunca completar manualmente la salida de un agente fallido.
- Politica default: `max_attempts=3` (2 reintentos).
- Registrar cada fallo en logs del plan activo y abortar con `status_global: blocked` si se agotan intentos.