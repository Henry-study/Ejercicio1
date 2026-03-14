# 🎯 COMIENZA AQUÍ - Sistema de Autenticación

## ⚡ En 3 Minutos

### Terminal 1: Backend
```bash
cd ~/Workspace/react/tarea1/server
npm start
```
✅ Verás: `Servidor de autenticación ejecutándose en http://localhost:5000`

### Terminal 2: Frontend  
```bash
cd ~/Workspace/react/tarea1
npm run dev
```
✅ Verás: `Local:    http://localhost:5173/`

### Navegador
Abre: **http://localhost:5173**

---

## 🔑 Credenciales (Elige una):

```
admin       →   admin123
usuario1    →   pass123
usuario2    →   pass456
```

---

## 📋 Lo que Pasará

```
1. ves formulario de login
   ↓
2. ingresas credenciales
   ↓
3. presionas "Iniciar Sesión"
   ↓
4. ✓ ves página de bienvenida con tu nombre
   ✓ puedes cerrar sesión
   ✓ datos guardados en SQLite
```

---

## 📁 Estructura Creada

```
✨ Nuevos Componentes:
src/components/
  ├── Login.tsx (formulario)
  ├── Login.css (estilos)
  ├── Welcome.tsx (bienvenida)
  └── Welcome.css (estilos)

✨ Backend Nuevo:
server/
  ├── index.js (Express)
  ├── db.js (SQLite)
  ├── package.json
  └── users.db (BD automáticamente creada)

✨ Archivos Modificados:
src/App.tsx (ahora maneja autenticación)
src/App.css
package.json (nuevas dependencias)

✨ Documentación:
SETUP.md (instalación)
GUIA_RAPIDA.md (pasos)
RESUMEN.md (funcionalidades)
ARQUITECTURA.md (técnico)
CHECKLIST.md (checklist)
```

---

## 🔧 Si Algo Falla

**Backend no inicia (puerto 5000 en uso):**
```bash
# Termina otros procesos
lsof -i :5000
kill -9 <PID>
```

**Frontend no conecta con backend:**
- Verifica que backend esté en puerto 5000
- Abre consola (F12) → pestaña Network
- Revisa si hay errores de CORS

---

## 📚 Documentación Disponible

| Archivo | Propósito |
|---------|-----------|
| GUIA_RAPIDA.md | ← **COMIENZA AQUÍ** |
| SETUP.md | Instalación detallada |
| RESUMEN.md | Funcionalidades completas |
| ARQUITECTURA.md | Diagrama técnico |
| CHECKLIST.md | Lista de implementación |

---

## ✅ Ya Está Completado

- ✓ Frontend con React + TypeScript
- ✓ Backend con Express + SQLite
- ✓ Validación de credenciales
- ✓ Página de bienvenida
- ✓ Base de datos con usuarios
- ✓ Gestión de sesión
- ✓ Interfaz moderna
- ✓ Documentación completa

---

## 🚀 Pasos para Começar

1. Abre 2 terminales en tu Mac
2. En Terminal 1: `cd ~/Workspace/react/tarea1/server && npm start`
3. En Terminal 2: `cd ~/Workspace/react/tarea1 && npm run dev`
4. Abre: http://localhost:5173
5. Usa credenciales arriba ↑

¡Listo! 🎉

---

**Preguntas?** Ver los archivos .md en la carpeta raíz del proyecto
