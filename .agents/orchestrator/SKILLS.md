# Skills del Orquestador QA

## Skill 1: Enrutamiento por estado de artefactos

Objetivo:
- Determinar la siguiente etapa usando el estado actual del contexto.

Entradas:
- stages
- artifacts

Salida:
- siguiente_agente
- razon_de_routing

## Skill 2: Sincronizacion de contexto inter-agente

Objetivo:
- Asegurar consistencia de workflow_id, estado y ownership.

Entradas:
- contexto previo
- output del especialista

Salida:
- contexto actualizado y validado

## Skill 3: Resolucion de conflictos de responsabilidad

Objetivo:
- Resolver solapamientos entre agentes y reforzar limites.

Regla clave:
- Prioritization decide prioridad, no Planner ni Generator.

## Skill 4: Replanificacion controlada

Objetivo:
- Invalidar solo etapas dependientes cuando cambian requisitos.

Salida:
- matriz de etapas a recalcular
- motivo de invalidacion
