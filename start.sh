#!/bin/bash

# Script para ejecutar el frontend y backend simultáneamente
# Uso: ./start.sh

echo "🚀 Iniciando Sistema de Autenticación..."
echo ""

# Iniciar servidor backend
echo "📡 Iniciando servidor backend en puerto 5000..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Esperar a que el backend esté listo
sleep 2

# Iniciar frontend
echo "⚛️  Iniciando frontend en puerto 5173..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Sistema iniciado exitosamente!"
echo "📱 Frontend: http://localhost:5173"
echo "🔌 Backend:  http://localhost:5000"
echo ""
echo "Presiona Ctrl+C para detener ambos servidores"
echo ""

# Mantener los procesos ejecutándose
wait
