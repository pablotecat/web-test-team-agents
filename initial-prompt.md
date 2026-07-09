- Implementa unos agentes para un equipo de Testing. Los agentes estarán organizados en modo Orchestra, siendo uno de ellos el que tenga acceso a todos los agentes y seleccione el que usar según la tarea y el momento. Sólo el orquestador QA debe ser invocable por el usuario.

- Siempre que un agente tenga que guardar información que pueda necesitar otro agente lo hará en el formato que considere más adecuado a la tarea. 

- **HANDOFF SPECIFICATION:** Todos los handoffs inter-agente DEBEN seguir el formato híbrido especificado en `./agent-creation-files/HANDOFF_SPECIFICATION.md`. Este formato garantiza eficiencia de tokens, trazabilidad auditada y prevención de bucles infinitos. La validación de handoffs se realiza contra el schema definido en `./agent-creation-files/handoff-schema.json`. El routing de escaladas y feedback hooks está documentado en `./agent-creation-files/handoff-hooks-routing.md`.

- Los agentes se dividirán en capas (o áreas) que representan las fases del SDLC desde el punto de vista de QA. Cada Capa tiene sus handouts finales entregables y usables por el resto de Capas. Esta información debe ser trazable, por lo que además del formato que elija para otros agentes se escribirá un resumen en .md en un lenguaje comprensible por un humano. En este resumen, cada Agente indicará los cambios que ha realizado en el handout.

- Algunos no los implementaremos de momento, están marcados como tal (están aquí para que se tengan en cuenta y no se añadan sus funciones a los demás). De momento implementaremos los agentes de la capa Planificación, además del Orquestador.

- **AGENT TEMPLATES:** Se han preparado templates para los agentes de la capa Planificación en `./agent-creation-files/agent-templates/`. Cada template sigue la estructura requerida:
  - `documentation.agent.md` - Test Documentation Agent
  - `planner.agent.md` - Test Planner Agent
  - `priorization.agent.md` - Test Prioritization Agent

- Cada archivo .agent.md debe incluir: frontmatter (name, description, role, inputs, outputs, non_goals y/o owned_decisions), objetivo, pasos, formato minimo de salida, criterios de finalizacion y seccion Skills operativas consolidadas apuntando a su archivo .skills.md.

- En caso de que un agente falle por cualquier motivo, nunca realices procesos manualmente. Registralo en un log de errores e intenta usar el agente de nuevo. Si no funciona aborta la orden e indica en el log los problemas encontrados.

- El agente Test Documentation debe generar la documentación en distintas carpetas dentro de la carpeta ../Documentation, estas carpetas estarán separadas por funcionalidad, también guardará distintos archivos según su funcionalidad.

- Dónde se encuentra cada descripción de la funcionalidad se mostrará en un archivo en la carpeta raiz de la Documentación

Los agentes del Test Team de QA serán:

0. El Orquestador QA debe:
- aceptar como entrada minima solo solicitud_qa
- bootstrapear contexto si contexto_compartido no existe
- validar estructura antes de enrutar
- aplicar retry_policy max_attempts=3
- registrar errores por intento fallido
- abortar con status_global=blocked al agotar intentos
- NO generar manualmente artifacts especializados
- NO usar updated_by=orchestrator en artifacts especializados
- Skills:
    - Bootstrap de contexto compartido
    - Validacion previa al routing
    - Enrutamiento por estado de artefactos
    - Sincronizacion de contexto inter-agente
    - Resolucion de conflictos de responsabilidad
    - Replanificacion controlada
    - Manejo de fallos y reintentos
    - Guardrails de dominio y auditoria


1. Capa Planificación

- el Test Documentation debe: 
    - Extraccion de requisitos
    - Normalizacion de lenguaje en Gherkin
    - Trazabilidad a fuentes
    - Identificacion de huecos
    - Particionado por area
    - Mapeo de dependencias
    - NO debe crear Tests Cases, ni Test Planes, ni priorizar requisitos.


- Test Planner debe:
    - Modelado de cobertura
    - Diseno de suites
    - Trazabilidad estructural
    - Definicion de precondiciones
    - Limite de responsabilidad
    - NO debe priorizar.


- Test Priorization debe: 
    - Evaluacion de riesgo
    - Seleccion de automatizacion
    - Balance de cobertura
    - Justificacion auditable
    - Priorizacion basada en documentacion

2. Capa Creación (no la vamos a implementar de momento)

2.1 Test Generator: Crea los Test cases con la estructura generada previamente (No lo vamos a implementar de momento)
2.2 Test Automation: Implementa los Test Cases automaticos seleccionados previamente (No lo vamos a implementar de momento)
2.3 Test Load: Crea Tests de Carga (No lo vamos a implementar de momento)

3. Capa Ejecución (No la vamos a implementar de momento)

3.1 Test CI/CD (No lo vamos a implementar de momento)
3.2 Test A11y (No lo vamos a implementar de momento)
3.3 Test Security (No lo vamos a implementar de momento)

4. Capa Análisis (No la vamos a implementar de momento)

4.1 Test Results (No lo vamos a implementar de momento)
4.2 Test Logs (No lo vamos a implementar de momento)
4.3 Test Dashboard (No lo vamos a implementar de momento)