import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Blog System</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/posts/new">New Post</Link>
            <span className="navbar-user">Hi, {user.username}</span>
            <button onClick={logout} className="link-button">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
