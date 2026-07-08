
wf-plan1-20260707-001Test Planner=Plan 1 - Cobertura UI y API de registro y gestion de usuarios"Á

PLN-UI-001SUI-UI-FORMABloquear envio cuando faltan campos obligatorios en el formulario"
REQ-UI-001*$Usuario en la pagina de registro (/)*1Formulario visible con campos name, email y phone"°

PLN-UI-002SUI-UI-FORM)Rechazar email con formato invalido en UI"
REQ-UI-002*8Usuario en la pagina de registro con campo name completo*$Email ingresado con formato invalido"ª

PLN-UI-003SUI-UI-FORM9Mostrar feedback de registro exitoso y limpiar formulario"
REQ-UI-003*%Usuario completa name y email validos*!API responde 2xx con success=true"¿
PLN-NAV-001SUI-UI-NAV-USERSCNavegar entre vistas Registro y Usuarios con estado activo correcto"REQ-NAV-001*,Usuario en cualquiera de las vistas publicas*Enlaces de navegacion visibles"™

PLN-UI-004SUI-UI-NAV-USERS?Cargar y operar listado de usuarios (render, editar y eliminar)"
REQ-UI-004*Usuario en /users*API /api/users disponible"´
PLN-API-REG-001SUI-API-REGISTER1Crear usuario exitosamente con POST /api/register"REQ-API-001*&Endpoint POST /api/register disponible*'Request JSON con name y email no vacios"´
PLN-API-REG-002SUI-API-REGISTER<Rechazar payload sin campos requeridos en POST /api/register"REQ-API-002*&Endpoint POST /api/register disponible*Request sin name o sin email"¶
PLN-API-USR-001SUI-API-USERS-BY-ID0Consultar usuario por id existente e inexistente"REQ-API-003*%Existe al menos un usuario registrado*(Se dispone de id valido e id inexistente"É
PLN-API-USR-002SUI-API-USERS-BY-ID8Actualizar usuario por id con validacion y manejo de 404"REQ-API-002"REQ-API-003*%Existe al menos un usuario registrado*&Endpoint PUT /api/users/:id disponible"¹
PLN-API-USR-003SUI-API-USERS-BY-ID/Eliminar usuario por id existente e inexistente"REQ-API-003*(Existe al menos un usuario para eliminar*)Endpoint DELETE /api/users/:id disponible