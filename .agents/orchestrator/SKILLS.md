# Skills del Orquestador QA

## Skill 1: Bootstrap de contexto compartido

Objetivo:
- Construir `contexto_compartido` valido cuando solo llega `solicitud_qa`.

Entradas:
- solicitud_qa
- contexto_compartido (opcional)

Salida:
- contexto_normalizado
- campos_faltantes (si aplica)

Reglas:
- Usar `shared/context-schema.json` como contrato fuente de verdad.
- Inicializar etapas y artifacts faltantes con defaults seguros.
- Completar `updated_by` en todos los artifacts.

## Skill 2: Validacion previa al routing

Objetivo:
- Bloquear decisiones de routing sobre contexto invalido o incompleto.

Entradas:
- contexto_normalizado

Salida:
- precondiciones_validadas
- estado_validacion (`ok` o `blocked`)

## Skill 3: Enrutamiento por estado de artefactos

Objetivo:
- Determinar la siguiente etapa usando el estado actual del contexto.

Entradas:
- stages
- artifacts

Salida:
- siguiente_agente
- razon_de_routing

## Skill 4: Sincronizacion de contexto inter-agente

Objetivo:
- Asegurar consistencia de workflow_id, estado y ownership.

Entradas:
- contexto previo
- output del especialista

Salida:
- contexto actualizado y validado

## Skill 5: Resolucion de conflictos de responsabilidad

Objetivo:
- Resolver solapamientos entre agentes y reforzar limites.

Regla clave:
- Prioritization decide prioridad, no Planner ni Generator.

## Skill 6: Replanificacion controlada

Objetivo:
- Invalidar solo etapas dependientes cuando cambian requisitos.

Salida:
- matriz de etapas a recalcular
- motivo de invalidacion
