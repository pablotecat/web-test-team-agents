# Generated Test Cases (Plan 1)

- artifact_type: generated_test_cases.pb
- schema: .github/spec/qa_workflow.proto#GenerationHandoff
- workflow_id: wf-plan1-20260707-001
- produced_by: Test Generator

## Summary

- detailed_cases: 10
- automation_candidates: 10

## Test Cases

### PLN-UI-001 - Bloquear envio cuando faltan campos obligatorios en el formulario

- preconditions:
  - Aplicacion web disponible en / con formulario visible
  - Campos name y email marcados como obligatorios
- steps:
  1. Navegar a la pagina de registro (/).
  2. Dejar el campo name vacio.
  3. Completar email con valor valido (ejemplo: user@example.com).
  4. Hacer click en Registrarse.
  5. Repetir variando: completar name y dejar email vacio.
- expected_results:
  - El navegador bloquea el submit por validacion HTML5 en ambos intentos.
  - No se emite request POST a /api/register.
  - No se muestra mensaje de exito.

### PLN-UI-002 - Rechazar email con formato invalido en UI

- preconditions:
  - Aplicacion web disponible en /
  - Campo name completo con valor valido
- steps:
  1. Navegar a la pagina de registro (/).
  2. Completar name con texto valido.
  3. Ingresar email invalido (ejemplo: invalido@).
  4. Hacer click en Registrarse.
  5. Repetir con variante edge: email sin arroba (ejemplo: invalido.com).
- expected_results:
  - La validacion de tipo email impide el envio del formulario.
  - No se emite request POST a /api/register.
  - No se muestra mensaje de exito.

### PLN-UI-003 - Mostrar feedback de registro exitoso y limpiar formulario

- preconditions:
  - Aplicacion web disponible en /
  - API /api/register responde 2xx con success=true
- steps:
  1. Navegar a la pagina de registro (/).
  2. Completar name con valor valido.
  3. Completar email con valor valido.
  4. Completar phone con valor opcional (o dejarlo vacio).
  5. Hacer click en Registrarse.
  6. Esperar hasta 3 segundos para verificar limpieza de mensaje.
- expected_results:
  - Se ejecuta POST /api/register con payload JSON valido.
  - Se muestra feedback visible de registro exitoso.
  - El formulario se reinicia (campos vacios).
  - El mensaje de exito se oculta o vacia luego de ~3 segundos.

### PLN-NAV-001 - Navegar entre vistas Registro y Usuarios con estado activo correcto

- preconditions:
  - Aplicacion web disponible en / y /users
  - Links de navegacion visibles en ambas paginas
- steps:
  1. Abrir la pagina de registro (/).
  2. Verificar que el link de Registro este activo.
  3. Hacer click en link Usuarios.
  4. Verificar carga de /users y estado activo en link Usuarios.
  5. Hacer click en link Registro.
  6. Verificar retorno a / y estado activo en link Registro.
- expected_results:
  - La navegacion entre / y /users funciona sin errores.
  - El enlace activo refleja correctamente la vista actual en cada paso.

### PLN-UI-004 - Cargar y operar listado de usuarios (render, editar y eliminar)

- preconditions:
  - Aplicacion web disponible en /users
  - API /api/users operativa con al menos un usuario de prueba
- steps:
  1. Abrir /users.
  2. Verificar que se dispare carga inicial de la tabla (GET /api/users).
  3. Confirmar que se renderiza al menos una fila.
  4. Ejecutar accion Editar sobre un usuario y cambiar name o email.
  5. Confirmar guardado en modal.
  6. Ejecutar accion Eliminar sobre el mismo usuario y aceptar confirmacion.
- expected_results:
  - La tabla se renderiza con datos de API.
  - Editar dispara PUT /api/users/:id y actualiza la fila.
  - Eliminar solicita confirmacion y dispara DELETE /api/users/:id.
  - La tabla refleja los cambios luego de cada operacion.

### PLN-API-REG-001 - Crear usuario exitosamente con POST /api/register

- preconditions:
  - Servidor levantado y endpoint POST /api/register disponible
  - Request con Content-Type application/json
- steps:
  1. Enviar POST /api/register con body valido: name y email no vacios.
  2. Registrar status code y headers de la respuesta.
  3. Inspeccionar body JSON de respuesta.
  4. Consultar listado de usuarios para confirmar alta.
- expected_results:
  - Respuesta HTTP 200.
  - Header content-type incluye application/json.
  - Body incluye success=true y objeto user con id y registeredAt.
  - El usuario queda disponible para operaciones posteriores.

### PLN-API-REG-002 - Rechazar payload sin campos requeridos en POST /api/register

- preconditions:
  - Servidor levantado y endpoint POST /api/register disponible
  - Cliente capaz de enviar payloads JSON invalidos
- steps:
  1. Enviar POST /api/register sin name y con email valido.
  2. Enviar POST /api/register con name valido y sin email.
  3. Enviar POST /api/register con name y email vacios.
  4. Registrar status y body de cada intento.
- expected_results:
  - Cada request invalido retorna HTTP 400.
  - Body de error indica Name and email are required.
  - No se crean usuarios para payloads invalidos.

### PLN-API-USR-001 - Consultar usuario por id existente e inexistente

- preconditions:
  - Existe al menos un usuario creado previamente
  - Se dispone de un id valido y un id inexistente
- steps:
  1. Ejecutar GET /api/users/:id con id valido.
  2. Registrar status y body de respuesta exitosa.
  3. Ejecutar GET /api/users/:id con id inexistente.
  4. Registrar status y body de respuesta negativa.
- expected_results:
  - Con id valido, retorna HTTP 200 y objeto usuario.
  - Con id inexistente, retorna HTTP 404 con error de no encontrado.

### PLN-API-USR-002 - Actualizar usuario por id con validacion y manejo de 404

- preconditions:
  - Existe al menos un usuario creado previamente
  - Endpoint PUT /api/users/:id disponible
- steps:
  1. Enviar PUT /api/users/:id valido con name y email actualizados.
  2. Verificar status y body del update exitoso.
  3. Enviar PUT /api/users/:id con payload invalido (name o email faltante).
  4. Enviar PUT /api/users/:id con id inexistente y payload valido.
  5. Registrar status y body de los tres escenarios.
- expected_results:
  - Update valido retorna HTTP 200 con success=true.
  - Payload invalido retorna HTTP 400 con mensaje Name and email are required.
  - Id inexistente retorna HTTP 404 con error de no encontrado.

### PLN-API-USR-003 - Eliminar usuario por id existente e inexistente

- preconditions:
  - Existe al menos un usuario para eliminar
  - Endpoint DELETE /api/users/:id disponible
- steps:
  1. Ejecutar DELETE /api/users/:id con id existente.
  2. Verificar status y body de eliminacion exitosa.
  3. Repetir DELETE sobre el mismo id o uno inexistente.
  4. Registrar status y body de la respuesta negativa.
- expected_results:
  - Con id existente, retorna HTTP 200 con success=true.
  - Con id inexistente, retorna HTTP 404 con error de no encontrado.
  - El usuario eliminado ya no se recupera por GET /api/users/:id.

## Automation Candidates

- PLN-UI-001
- PLN-UI-002
- PLN-UI-003
- PLN-NAV-001
- PLN-UI-004
- PLN-API-REG-001
- PLN-API-REG-002
- PLN-API-USR-001
- PLN-API-USR-002
- PLN-API-USR-003