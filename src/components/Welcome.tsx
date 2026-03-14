import './Welcome.css';

interface User {
  id: number;
  username: string;
  name: string;
}

interface WelcomeProps {
  user: User;
  onLogout: () => void;
}

export default function Welcome({ user, onLogout }: WelcomeProps) {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>¡Bienvenido!</h1>
        <div className="user-info">
          <p className="greeting">Hola, <span className="user-name">{user.name}</span></p>
          <p className="username">Usuario: <strong>{user.username}</strong></p>
          <p className="user-id">ID: {user.id}</p>
        </div>
        
        <button onClick={onLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
