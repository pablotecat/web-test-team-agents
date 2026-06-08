# Web Test Application

Aplicación web simple para pruebas manuales y automatizadas de un formulario de registro y listado de usuarios.

## Características

- **Página de Registro**: Formulario sencillo con campos para nombre, email y teléfono
- **Página de Usuarios**: Tabla que lista todos los usuarios registrados
- **API REST**: Endpoints para registrar usuarios y obtener el listado
- **Sin dependencias externas**: Solo utiliza módulos built-in de Node.js

## Requisitos

- Node.js (versión 12 o superior)

## Instalación

No requiere instalación de dependencias. Simplemente clona o descarga el proyecto.

## Uso

1. Navega a la carpeta del proyecto:
```bash
cd web-test
```

2. Inicia el servidor:
```bash
npm start
```

3. Abre tu navegador y ve a:
```
http://localhost:3000
```

## Estructura del Proyecto

```
web-test/
├── server.js              # Servidor HTTP Node.js
├── package.json           # Información del proyecto
├── public/
│   ├── index.html        # Página de registro
│   ├── users.html        # Página de usuarios
│   ├── styles.css        # Estilos CSS
│   └── script.js         # JavaScript del cliente
├── README.md             # Este archivo
└── .github/
    └── copilot-instructions.md
```

## API Endpoints

### POST /api/register
Registra un nuevo usuario.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1234567890,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "registeredAt": "6/5/2026, 10:30:45 AM"
  }
}
```

### GET /api/users
Obtiene la lista de todos los usuarios registrados.

**Response (200):**
```json
[
  {
    "id": 1234567890,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "registeredAt": "6/5/2026, 10:30:45 AM"
  }
]
```

### GET /api/users/:id
Obtiene los datos de un usuario específico por ID.

**Response (200):**
```json
{
  "id": 1234567890,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "registeredAt": "6/5/2026, 10:30:45 AM"
}
```

**Response (404):**
```json
{
  "error": "User not found"
}
```

### PUT /api/users/:id
Actualiza los datos de un usuario existente.

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "555-5678"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "id": 1234567890,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-5678",
    "registeredAt": "6/5/2026, 10:30:45 AM"
  }
}
```

### DELETE /api/users/:id
Elimina un usuario del sistema.

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "user": {
    "id": 1234567890,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "registeredAt": "6/5/2026, 10:30:45 AM"
  }
}
```

**Response (404):**
```json
{
  "error": "User not found"
}
```

## Pruebas

La aplicación está diseñada para permitir:
- **Pruebas manuales**: Rellenar el formulario y verificar que se registren los usuarios
- **Pruebas automatizadas**: Usar los endpoints API para validar la funcionalidad
