import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'users.db');

const db = new sqlite3.Database(dbPath);

// Crear tabla de usuarios si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insertar usuarios de ejemplo si la tabla está vacía
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) {
      console.error('Error checking users:', err);
      return;
    }
    
    if (row.count === 0) {
      db.run(`
        INSERT INTO users (username, password, name) VALUES 
        ('admin', 'admin123', 'Administrador'),
        ('usuario1', 'pass123', 'Juan Pérez'),
        ('usuario2', 'pass456', 'María García')
      `, (err) => {
        if (err) {
          console.error('Error inserting default users:', err);
        } else {
          console.log('Usuarios de ejemplo insertados correctamente');
        }
      });
    }
  });
});

export default db;
