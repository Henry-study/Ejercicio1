import { useState } from 'react';
import axios from 'axios';
import './Login.css';

interface LoginProps {
  onLoginSuccess: (user: { id: number; username: string; name: string }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      if (response.data.success) {
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error al conectar con el servidor');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Autenticando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Credenciales de Prueba:</h3>
          <p><strong>Usuario:</strong> admin | <strong>Contraseña:</strong> admin123</p>
          <p><strong>Usuario:</strong> usuario1 | <strong>Contraseña:</strong> pass123</p>
          <p><strong>Usuario:</strong> usuario2 | <strong>Contraseña:</strong> pass456</p>
        </div>
      </div>
    </div>
  );
}
