# Planning Handoff Summary (Plan 1)

- artifact_type: test_plan.pb
- schema: .github/spec/qa_workflow.proto#PlanningHandoff
- workflow_id: wf-plan1-20260707-001
- produced_by: Test Planner
- plan_name: Plan 1 - Cobertura UI y API de registro y gestion de usuarios

## Test Plan

- Nombre: Plan 1 - Cobertura UI y API de registro y gestion de usuarios
- Alcance: Flujos UI de formulario, navegacion y listado de usuarios; endpoints API de registro y gestion por id
- Criterios de entrada:
  - documentation.pb decodifica correctamente contra qa_workflow.proto
  - Entorno Node.js y servidor local disponible
  - Endpoints /api/register y /api/users operativos
- Criterios de salida:
  - Todos los requirements documentados tienen al menos un caso asociado
  - Casos definidos con precondiciones y resultado esperado resumido
  - Artifact test_plan.pb generado y validado por decode protobuf

## Suites

### SUI-UI-FORM
- Objetivo: Validar comportamiento funcional y validaciones del formulario de registro en UI.

### SUI-UI-NAV-USERS
- Objetivo: Validar navegacion entre vistas y comportamiento del listado de usuarios en UI.

### SUI-API-REGISTER
- Objetivo: Validar contrato y validaciones del endpoint POST /api/register.

### SUI-API-USERS-BY-ID
- Objetivo: Validar operaciones GET/PUT/DELETE por id y manejo de errores asociados.

## Cases

### PLN-UI-001
- suite_id: SUI-UI-FORM
- Titulo: Bloquear envio cuando faltan campos obligatorios en el formulario
- requirement_ids: REQ-UI-001
- Precondiciones:
  - Usuario en la pagina de registro (/)
  - Formulario visible con campos name, email y phone
- Objetivo: Confirmar que name y email son obligatorios antes de enviar.
- Expected outcome: El submit es bloqueado por validacion y no se muestra exito.

### PLN-UI-002
- suite_id: SUI-UI-FORM
- Titulo: Rechazar email con formato invalido en UI
- requirement_ids: REQ-UI-002
- Precondiciones:
  - Usuario en la pagina de registro con campo name completo
  - Email ingresado con formato invalido
- Objetivo: Verificar validacion de formato de email en cliente.
- Expected outcome: El envio no se ejecuta y no aparece feedback de exito.

### PLN-UI-003
- suite_id: SUI-UI-FORM
- Titulo: Mostrar feedback de registro exitoso y limpiar formulario
- requirement_ids: REQ-UI-003
- Precondiciones:
  - Usuario completa name y email validos
  - API responde 2xx con success=true
- Objetivo: Confirmar feedback y post-condiciones del submit exitoso.
- Expected outcome: Se muestra mensaje de exito, se limpia el formulario y el mensaje se oculta luego de 3s.

### PLN-NAV-001
- suite_id: SUI-UI-NAV-USERS
- Titulo: Navegar entre vistas Registro y Usuarios con estado activo correcto
- requirement_ids: REQ-NAV-001
- Precondiciones:
  - Usuario en cualquiera de las vistas publicas
  - Enlaces de navegacion visibles
- Objetivo: Validar navegacion bidireccional y estado visual del menu.
- Expected outcome: La ruta destino carga correctamente y el enlace activo coincide con la vista actual.

### PLN-UI-004
- suite_id: SUI-UI-NAV-USERS
- Titulo: Cargar y operar listado de usuarios (render, editar y eliminar)
- requirement_ids: REQ-UI-004
- Precondiciones:
  - Usuario en /users
  - API /api/users disponible
- Objetivo: Verificar flujo UI de tabla con acciones de editar y eliminar.
- Expected outcome: Se renderiza la lista; editar dispara PUT y eliminar confirma y dispara DELETE.

### PLN-API-REG-001
- suite_id: SUI-API-REGISTER
- Titulo: Crear usuario exitosamente con POST /api/register
- requirement_ids: REQ-API-001
- Precondiciones:
  - Endpoint POST /api/register disponible
  - Request JSON con name y email no vacios
- Objetivo: Validar alta exitosa y estructura de respuesta.
- Expected outcome: Responde 200 con application/json, incluye user con id y registeredAt y persiste en memoria.

### PLN-API-REG-002
- suite_id: SUI-API-REGISTER
- Titulo: Rechazar payload sin campos requeridos en POST /api/register
- requirement_ids: REQ-API-002
- Precondiciones:
  - Endpoint POST /api/register disponible
  - Request sin name o sin email
- Objetivo: Validar regla de requeridos para creacion.
- Expected outcome: Responde 400 con mensaje de error Name and email are required.

### PLN-API-USR-001
- suite_id: SUI-API-USERS-BY-ID
- Titulo: Consultar usuario por id existente e inexistente
- requirement_ids: REQ-API-003
- Precondiciones:
  - Existe al menos un usuario registrado
  - Se dispone de id valido e id inexistente
- Objetivo: Validar comportamiento GET /api/users/:id en exito y no encontrado.
- Expected outcome: Retorna 200 con usuario para id valido y 404 para id inexistente.

### PLN-API-USR-002
- suite_id: SUI-API-USERS-BY-ID
- Titulo: Actualizar usuario por id con validacion y manejo de 404
- requirement_ids: REQ-API-002, REQ-API-003
- Precondiciones:
  - Existe al menos un usuario registrado
  - Endpoint PUT /api/users/:id disponible
- Objetivo: Validar actualizacion positiva, validacion de requeridos y 404.
- Expected outcome: Retorna success=true en update valido, 400 cuando faltan requeridos y 404 para id inexistente.

### PLN-API-USR-003
- suite_id: SUI-API-USERS-BY-ID
- Titulo: Eliminar usuario por id existente e inexistente
- requirement_ids: REQ-API-003
- Precondiciones:
  - Existe al menos un usuario para eliminar
  - Endpoint DELETE /api/users/:id disponible
- Objetivo: Validar eliminacion y manejo de recurso inexistente.
- Expected outcome: Retorna success=true al eliminar y 404 cuando el id no existe.

## Coverage Matrix (Requirement -> Cases)

- REQ-UI-001 -> PLN-UI-001
- REQ-UI-002 -> PLN-UI-002
- REQ-UI-003 -> PLN-UI-003
- REQ-NAV-001 -> PLN-NAV-001
- REQ-UI-004 -> PLN-UI-004
- REQ-API-001 -> PLN-API-REG-001
- REQ-API-002 -> PLN-API-REG-002, PLN-API-USR-002
- REQ-API-003 -> PLN-API-USR-001, PLN-API-USR-002, PLN-API-USR-003
