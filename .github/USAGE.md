# Orquestador QA - Uso minimo

## Entrada recomendada

Enviar solo `solicitud_qa`.

Ejemplo:

solicitud_qa: Necesito cobertura QA end-to-end para registro y listado de usuarios, incluyendo API CRUD y priorizacion smoke/regresion/automatizacion.

## Comportamiento esperado

1. El Orquestador detecta que falta `contexto_compartido`.
2. Ejecuta bootstrap y construye `workflow_state.pb` segun `.github/spec/qa_workflow.proto`.
3. Normaliza y valida el contexto con el contrato protobuf (sin JSON).
4. Devuelve routing y estado actualizado.

## Salida obligatoria

- `plan_routing.pb`
  - `siguiente_agente`
  - `razon_de_routing`
  - `precondiciones_validadas`
  - `reglas_aplicadas`
- `estado_workflow_actualizado` (`workflow_state.pb`)
  - `status_global`
  - `stages`
  - `artifacts`
  - `traceability`

## Notas

- Si faltan datos para continuar, devolver `status_global: blocked` con `campos_faltantes` y `defaults_propuestos`.
- No crear test cases ni specs Playwright desde Orquestador.
