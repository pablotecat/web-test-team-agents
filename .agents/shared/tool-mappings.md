# Tool Mapping por Agente

## Reglas globales

- Lectura y analisis: file_search, grep_search, read_file, semantic_search.
- Edicion: apply_patch, create_file.
- Verificacion tecnica: get_errors, run_in_terminal.
- Contexto compartido: usar JSON segun shared/context-schema.json.

## Orquestador

Herramientas principales:
- semantic_search
- read_file
- memory

Uso:
- Elegir agente objetivo por tipo de solicitud.
- Sincronizar estado por etapas.
- Resolver conflictos de ownership.

## Test Documentation

Herramientas principales:
- read_file
- semantic_search
- grep_search

Uso:
- Extraer requisitos funcionales y tecnicos.
- Emitir documentation_artifact en JSON.

## Test Planner

Herramientas principales:
- read_file
- semantic_search

Uso:
- Transformar requisitos en Test Plan -> Suites -> Cases.

## Test Prioritization

Herramientas principales:
- read_file
- semantic_search

Uso:
- Clasificar por riesgo/criticidad en Regresion, Smoke, Automatizacion.

## Test Generator

Herramientas principales:
- read_file
- create_file
- apply_patch

Uso:
- Construir casos detallados listos para ejecucion.

## Test Automation

Herramientas principales:
- read_file
- semantic_search
- apply_patch
- get_errors
- run_in_terminal

Uso:
- Convertir casos automatizables en specs Playwright.
- Reutilizar POM y fixtures existentes.
