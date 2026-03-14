# Sistema de Autenticación con React + Express + SQLite

## Descripción
Este proyecto implementa un sistema de autenticación completo que incluye:
- **Frontend**: React con Vite y TypeScript
- **Backend**: Express.js con SQLite
- **Funcionalidades**: Login, validación de credenciales y página de bienvenida

## Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

## Instalación

### 1. Instalar dependencias del Frontend
```bash
npm install
```

### 2. Instalar dependencias del Backend
```bash
cd server
npm install
```

## Ejecución

### Opción 1: Ejecutar ambos servidores por separado

**Terminal 1 - Servidor Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend con Vite:**
```bash
npm run dev
```

### Opción 2: Ejecutar ambos simultáneamente
```bash
npm run dev:all
```
(Requiere tener `concurrently` instalado)

## Credenciales de Prueba

Usa cualquiera de estas credenciales para probar:

| Usuario | Contraseña |
|---------|-----------|
| admin | admin123 |
| usuario1 | pass123 |
| usuario2 | pass456 |

## Estructura del Proyecto

```
tarea1/
├── server/
│   ├── package.json
│   ├── index.js          (Servidor Express)
│   ├── db.js             (Configuración SQLite)
│   └── users.db          (Base de datos SQLite)
├── src/
│   ├── components/
│   │   ├── Login.tsx      (Componente de login)
│   │   ├── Login.css
│   │   ├── Welcome.tsx    (Página de bienvenida)
│   │   └── Welcome.css
│   ├── App.tsx            (Componente principal)
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## Puertos
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:5000 (Express API)

## Funcionalidades

### Login
- Validación de usuario y contraseña
- Mensajes de error claros
- Guarda el usuario en localStorage para mantener la sesión

### Página de Bienvenida
- Muestra el nombre completo del usuario autenticado
- Botón para cerrar sesión
- Elimina la sesión del localStorage al cerrar sesión

## Notas Importantes
- La base de datos SQLite se crea automáticamente en `server/users.db`
- Las contraseñas están guardadas en texto plano (en producción usar bcrypt o similar)
- Los datos persisten en la base de datos SQLite
- La sesión se mantiene en localStorage del navegador

## Próximos Pasos (Opcional)
Para mejorar la seguridad en producción:
1. Encriptar contraseñas con bcrypt
2. Implementar JWT tokens en lugar de localStorage
3. Agregar validación de entrada más robusta
4. Usar variables de entorno para configuración sensible
5. Implementar HTTPS
