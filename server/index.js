import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ruta de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validar que se proporcionen credenciales
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Usuario y contraseña son requeridos' 
    });
  }

  // Buscar usuario en la base de datos
  db.get(
    'SELECT id, username, name FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Error en el servidor' 
        });
      }

      if (row) {
        // Credenciales correctas
        res.json({
          success: true,
          message: 'Autenticación exitosa',
          user: {
            id: row.id,
            username: row.username,
            name: row.name
          }
        });
      } else {
        // Credenciales incorrectas
        res.status(401).json({
          success: false,
          message: 'Usuario o contraseña incorrectos'
        });
      }
    }
  );
});

// Ruta de verificación (opcional)
app.get('/api/verify', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor de autenticación ejecutándose en http://localhost:${PORT}`);
});
