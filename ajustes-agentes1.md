ajusta los siguente en los agentes:

- En caso de que un agente falle por cualquier motivo, nunca realices procesos manualmente. Registralo en un log de errores e intenta usar el agente de nuevo. Si no funciona aborta la orden e indica en el log los problemas encontrados.

- El agente Test Planner no debe priorizar.
- El agente Test Generator no debe priorizar ni clasificar.
- El agente Test Priorization tiene preferencia a la hora de clasificar y priorizar en caso de que algún test ya tenga esos valores.
- El agente Priorization accede a las carpetas de documentación relacionadas con la funcionalidad que está priorizando para poder priorizar y clasificar.

- El agente Test Documentation debe generar la documentación en distintas carpetas dentro de la carpeta ../Documentation, estas carpetas estarán separadas por funcionalidad, también guardará distintos archivos según su funcionalidad.
- Dónde se encuentra cada descripción de la funcionalidad se mostrará en un archivo en la carpeta raiz de la Documentación
- El agente documentador debe añadir un campo en el JSON que indique la dependencia entre funcionalidades.