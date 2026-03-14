# 🏗️ Arquitectura del Sistema de Autenticación

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVEGADOR                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              REACT FRONTEND (Puerto 5173)               │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  App.tsx ◄────────────────────────────────────────────┐ │  │
│  │    │                                                  │ │  │
│  │    ├─► Login.tsx ◄─────────────────── No Auth        │ │  │
│  │    │   - Formulario de usuario                       │ │  │
│  │    │   - Formulario de contraseña                    │ │  │
│  │    │   - Botón de envío                              │ │  │
│  │    │                                                  │ │  │
│  │    ├─► Welcome.tsx ◄─────────────────► Auth Exitosa │ │  │
│  │    │   - Nombre del usuario                          │ │  │
│  │    │   - Usuario                                     │ │  │
│  │    │   - Botón de logout                             │ │  │
│  │    │                                                  │ │  │
│  │    └─► localStorage                                  │ │  │
│  │        (Persiste sesión del usuario)                 │ │  │
│  │                                                      │ │  │
│  └──────────────────────────────────────────────────────┘ │  │
│          │                                                  │  │
│          │ HTTP POST /api/login                            │  │
│          ├──────────────────────────────────────────────────► │
│          │                                                  │  │
│          ◄──────────────────────────────────────────────────  │
│          JSON Response                                       │  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS BACKEND                            │
├─────────────────────────────────────────────────────────────────┤
│                      (Puerto 5000)                              │
│                                                                 │
│  index.js (Servidor Express)                                   │
│    │                                                           │
│    ├─► POST /api/login                                        │
│    │   ├─► Recibe: { username, password }                    │
│    │   ├─► Valida en db.sqlite                               │
│    │   └─► Responde: { success, user }                       │
│    │                                                           │
│    ├─► GET /api/verify                                       │
│    │   └─► Responde: { message }                             │
│    │                                                           │
│    └─► CORS habilitado                                        │
│                                                                 │
│  db.js (SQLite)                                                │
│    │                                                           │
│    └─► users.db                                               │
│        ├─► Tabla: users                                        │
│        │   ├─► id (INTEGER PRIMARY KEY)                      │
│        │   ├─► username (TEXT UNIQUE)                        │
│        │   ├─► password (TEXT)                               │
│        │   ├─► name (TEXT)                                   │
│        │   └─► created_at (DATETIME)                         │
│        │                                                      │
│        └─► Usuarios pre-cargados:                            │
│            ├─► admin / admin123 / Administrador              │
│            ├─► usuario1 / pass123 / Juan Pérez              │
│            └─► usuario2 / pass456 / María García            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Estructura de Carpetas

```
tarea1/
│
├── 📁 server/
│   ├── index.js              ← Servidor Express principal
│   ├── db.js                 ← Inicialización de SQLite
│   ├── package.json          ← Dependencias: express, sqlite3, cors
│   ├── users.db              ← Base de datos (creada automáticamente)
│   └── node_modules/         ← Librerías instaladas
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Login.tsx         ← Formulario de login
│   │   ├── Login.css         ← Estilos modernos del login
│   │   ├── Welcome.tsx       ← Página de bienvenida
│   │   └── Welcome.css       ← Estilos de bienvenida
│   │
│   ├── App.tsx               ← Componente principal con lógica de auth
│   ├── App.css               ← Estilos principales
│   ├── main.tsx              ← Punto de entrada de React
│   └── index.css             ← Estilos globales
│
├── 📦 package.json           ← Dependencias: react, axios, react-router-dom
├── 📄 vite.config.ts         ← Configuración de Vite
├── 📄 tsconfig.json          ← Configuración de TypeScript
│
├── 📄 RESUMEN.md             ← Resumen completo del proyecto
├── 📄 SETUP.md               ← Instrucciones de instalación
├── 📄 GUIA_RAPIDA.md         ← Guía paso a paso
└── 🎯 start.sh               ← Script para ejecutar todo
```

## 🔄 Flujo de Autenticación Detallado

### 1. **Carga Inicial**
```
Usuario abre http://localhost:5173
        ↓
React App carga
        ↓
App.tsx verifica localStorage
        ↓
├─► Si hay usuario guardado → Muestra Welcome
└─► Si no hay usuario        → Muestra Login
```

### 2. **Proceso de Login**
```
Usuario ingresa credenciales
        ↓
Presiona "Iniciar Sesión"
        ↓
Frontend valida campos (no vacíos)
        ↓
Envía axios.post() a:
   http://localhost:5000/api/login
   Payload: { username: "xxx", password: "xxx" }
        ↓
Backend busca en SQLite
        ↓
├─► Encontró usuario y password → Responde success: true
│        ↓
│   Frontend guarda en localStorage
│        ↓
│   Renderiza Welcome.tsx
│
└─► No encontró → Responde success: false
         ↓
   Frontend muestra error
         ↓
   Usuario permanece en Login.tsx
```

### 3. **Logout**
```
Usuario presiona "Cerrar Sesión"
        ↓
Frontend limpia localStorage
        ↓
App.tsx re-renderiza
        ↓
Muestra Login.tsx nuevamente
```

## 🎯 Componentes React

### **App.tsx** (Orquestador Principal)
- Gestiona estado de autenticación
- Maneja localStorage
- Decide qué componente mostrar
- Proporciona callbacks de login/logout

### **Login.tsx** (Página de Entrada)
- Formulario con dos campos: usuario y contraseña
- Envía datos al backend
- Muestra errores al usuario
- Indicador de carga (loading)
- Credenciales de prueba visibles

### **Welcome.tsx** (Página Privada)
- Muestra nombre del usuario autenticado
- Muestra usuario
- Botón para cerrar sesión
- Animaciones de bienvenida

## 📡 API Endpoints

### **POST /api/login**
```javascript
// Entrada
{
  username: "admin",
  password: "admin123"
}

// Respuesta exitosa (200)
{
  success: true,
  message: "Autenticación exitosa",
  user: {
    id: 1,
    username: "admin",
    name: "Administrador"
  }
}

// Respuesta fallida (401)
{
  success: false,
  message: "Usuario o contraseña incorrectos"
}
```

### **GET /api/verify**
```javascript
// Uso: Verificar que el servidor está activo
// Respuesta (200)
{
  message: "Servidor funcionando correctamente"
}
```

## 💾 Base de Datos SQLite

### Tabla: `users`
```sql
CREATE TABLE users (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  username       TEXT UNIQUE NOT NULL,
  password       TEXT NOT NULL,
  name           TEXT NOT NULL,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Datos Iniciales
```sql
INSERT INTO users (username, password, name) VALUES
('admin', 'admin123', 'Administrador'),
('usuario1', 'pass123', 'Juan Pérez'),
('usuario2', 'pass456', 'María García');
```

## 🔐 Seguridad (Producción)

Configuración actual (Desarrollo):
- ✅ CORS habilitado para localhost
- ✅ Validación básica de entrada
- ⚠️ Contraseñas en texto plano
- ⚠️ Sin JWT token
- ⚠️ Sin rate limiting

Mejoras para Producción:
- [ ] Encriptar contraseñas con `bcrypt`
- [ ] Implementar JWT tokens
- [ ] HTTPS obligatorio
- [ ] Rate limiting en /api/login
- [ ] Variables de entorno (.env)
- [ ] Validación avanzada
- [ ] Logging y monitoreo

## 🚀 Puertos y URLs

| Componente | Puerto | URL |
|-----------|--------|-----|
| Frontend Vite | 5173 | http://localhost:5173 |
| Backend Express | 5000 | http://localhost:5000 |
| API Login | 5000 | http://localhost:5000/api/login |
| BD SQLite | N/A | `server/users.db` |

## 📊 Tecnologías Utilizadas

**Frontend:**
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.3.1
- Axios 1.6.0
- CSS3 con gradientes y animaciones

**Backend:**
- Express.js 4.18.2
- SQLite3 5.1.6
- CORS 2.8.5
- Node.js 18+

## ✅ Estado: Completado

✓ Autenticación funcional
✓ Base de datos SQLite
✓ Validación de credenciales
✓ Página de bienvenida
✓ Gestión de sesión
✓ Manejo de errores
✓ Interfaz moderna
✓ Documentación completa
