# Skills de Orquestador QA

## Principio rector

- El orquestador no produce artefactos de especialistas; solo coordina flujo, contexto y estado.
- Siempre inicia con bootstrap de contexto antes de routing.
- Siempre enruta al agente propietario de la etapa hasta alcanzar la etapa solicitada.

## Skill 1: Bootstrap de contexto compartido

- Construir `contexto_compartido` valido cuando solo llega `solicitud_qa`.
- Inicializar etapas y artifacts faltantes con defaults seguros.
- Completar `updated_by` en todos los artifacts.
- Ejecutar bootstrap en toda invocacion del orquestador, incluso cuando llega contexto parcial.

## Skill 2: Validacion previa al routing

- Bloquear decisiones de routing sobre contexto invalido o incompleto.
- Devolver `estado_validacion: blocked` cuando falten precondiciones.

## Skill 3: Enrutamiento por estado de artefactos

- Determinar la siguiente etapa usando el estado actual de `stages` y `artifacts`.
- Generar `siguiente_agente` y `razon_de_routing` trazables.
- Soportar `target_stage` y detener el flujo al completar la etapa solicitada.
- Si no se define `target_stage`, usar flujo completo hasta Automation.

## Skill 4: Sincronizacion de contexto inter-agente

- Asegurar consistencia de `workflow_id`, estado y ownership.
- Sincronizar estado de etapa con estado del artifact asociado.
- Verificar que cada artefacto especializado tenga `updated_by` igual al agente propietario.

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
- Prohibido marcar artefactos especializados como `ready` por intervencion del orquestador.
- Si falla una etapa tras agotar intentos, su artefacto debe quedar `missing` o `failed`.

## Skill 8: Guardrails de dominio y auditoria

- Validar en cada etapa que el orquestador no escriba artefactos fuera de su dominio.
- Rechazar salidas con `updated_by: orchestrator` en artefactos especializados.
- Exigir evidencia de invocacion del agente propietario por etapa antes de cerrar como completed.
- Si se detecta intento de sustitucion manual, forzar `status_global: blocked` y registrar incidencia en error_log.