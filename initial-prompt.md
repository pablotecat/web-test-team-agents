Quiero implementar unos agentes para un qeuipo de Testing. Los agentes estarán organizados en modo Orchestra, siendo uno de ellos el que tenga acceso a todos los agentes y seleccione el que usar según la tarea y el momento. 

Siempre que un agente tenga que guardar información que pueda necesitar otr agente lo hará en formato JSON u otro más adecuado a la tarea.

Los agentes se dividirán en capas (o áreas) que representan las fases del SDLC desde el punto de vista de QA.

Los agentes necesitan skills, que no se han añadido porque quiero sugerencias al respecto para cada uno.

Algunos no los implementaremos de momento, están marcados como tal (están aquí para que los tengas en cuenta y no se añadan sus funciones a los demás). De momento implemetaremos los agentes de las capas Planificación y Creación, además del Orquestador.

Los agentes del Test Team de QA serán:

0. Orquestador: Central agent coordinating the full QA workflow. Routes tasks, syncs context across specialists, and resolves conflicts.

1. Capa Planificación

1.1 Test Documentation: Lee la documentación en distintos formatos y
escribe definiciones en JSON.

1.2 Test Planner: Lee la descripción de las funcionalidades y plantea una estructura de Test Plan, Test Suites, Test Cases.

1.3 Test Priorization: Lee la descripción de las funcionalidades y la estructura de Plan-Suite-Cases y los subagrupa en Regresión, Smoke y Automatización

2. Capa Creación 

2.1 Test Generator: Crea los Test cases con la estructura generada previamente

2.2 Test Automation: Implementa los Test Cases automaticos seleccionados previamente

2.3 Test Load: Crea Tests de Carga (No lo vamos a implementar de momento)

3. Capa Ejecución (No la vamos a implementar de momento)

3.1 Test CI/CD (No lo vamos a implementar de momento)
3.2 Test A11y (No lo vamos a implementar de momento)
3.3 Test Security (No lo vamos a implementar de momento)

4. Capa Análisis (No la vamos a implementar de momento)

4.1 Test Results (No lo vamos a implementar de momento)
4.2 Test Logs (No lo vamos a implementar de momento)
4.3 Test Dashboard (No lo vamos a implementar de momento)