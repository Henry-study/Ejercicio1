# 📋 Guía Rápida: Cómo Usar Tu Sistema de Autenticación

## ⚡ Inicio Rápido (3 Pasos)

### Paso 1: Abre una terminal en la carpeta del proyecto
```bash
cd ~/Workspace/react/tarea1
```

### Paso 2: Inicia el servidor backend
```bash
cd server && npm start
```
Verás este mensaje: `Servidor de autenticación ejecutándose en http://localhost:5000`

### Paso 3: En otra terminal, inicia el frontend
```bash
npm run dev
```
Verás este mensaje: `Local:    http://localhost:5173/`

Luego abre en tu navegador: **http://localhost:5173**

---

## 🔑 Prueba con Estas Credenciales

| Usuario | Contraseña | Nombre |
|---------|-----------|--------|
| admin | admin123 | Administrador |
| usuario1 | pass123 | Juan Pérez |
| usuario2 | pass456 | María García |

---

## 📱 Lo que Pasará

1. **Página de Login** (http://localhost:5173)
   - Ingresa un usuario y contraseña del cuadro arriba
   - Presiona "Iniciar Sesión"

2. **Si las credenciales son correctas:**
   - ✅ Te lleva a la página de **Bienvenida**
   - 👋 Muestra: "¡Bienvenido, [Nombre del Usuario]!"
   - 📌 Muestra tu nombre y usuario
   - Aparece botón "Cerrar Sesión"

3. **Si las credenciales son incorrectas:**
   - ❌ Muestra error: "Usuario o contraseña incorrectos"
   - Permaneces en la página de login

4. **Al presionar "Cerrar Sesión":**
   - Se borra tu sesión
   - Regresaste al login
   - Puedes login con otro usuario

---

## 🗄️ Base de Datos

La base de datos SQLite se crea automáticamente en:
```
tarea1/server/users.db
```

Contiene una tabla `users` con los 3 usuarios de prueba ya pre-cargados.

### Agregar más usuarios (opcional):

Puedes editar `server/db.js` y agregar más usuarios en esta sección:

```javascript
db.run(`
  INSERT INTO users (username, password, name) VALUES 
  ('admin', 'admin123', 'Administrador'),
  ('usuario1', 'pass123', 'Juan Pérez'),
  ('usuario2', 'pass456', 'María García'),
  ('nuevoUsuario', 'miPassword', 'Mi Nombre')  // ← Agrega aquí
`
```

Luego elimina el archivo `server/users.db` y reinicia el servidor.

---

## 🛑 Para Detener los Servidores

- Presiona **Ctrl + C** en ambas terminales

---

## 🔌 Información Técnica

**Frontend:**
- Framework: React 19 con Vite
- Lenguaje: TypeScript
- Puerto: 5173

**Backend:**
- Framework: Express.js
- Base de datos: SQLite3
- Puerto: 5000
- CORS: Habilitado

**Comunicación:**
- Frontend hace POST a `http://localhost:5000/api/login`
- Envía: `{ username: string, password: string }`
- Recibe: `{ success: boolean, message: string, user?: { id, username, name } }`

---

## 🐛 Si Algo No Funciona

**Error de puerto en uso:**
```bash
# Encuentra qué proceso usa el puerto 5000
lsof -i :5000
# Mata el proceso
kill -9 <PID>
```

**No se conecta al backend:**
- Verifica que el backend esté corriendo en puerto 5000
- Verifica que CORS esté habilitado (ya está configurado)
- Abre la consola del navegador (F12) para ver errores

**Base de datos corrupta:**
```bash
rm server/users.db
# Reinicia el servidor - se recreará automáticamente
```

---

## 📚 Archivos Importantes

- `src/components/Login.tsx` - Componente de login
- `src/components/Welcome.tsx` - Página de bienvenida
- `src/App.tsx` - Lógica de autenticación principal
- `server/index.js` - Servidor Express
- `server/db.js` - Configuración de SQLite

---

¡Listo! Tu sistema de autenticación está completamente funcional. 🎉
