import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, cartCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span className="brand-icon">◆</span>
        <span>LUXE<em>MART</em></span>
      </Link>

      <div className="nav-links">
        <Link to="/catalogue" className={isActive('/catalogue')}>Catalogue</Link>
        <Link to="/contact" className={isActive('/contact')}>Contact</Link>
        {user && <Link to="/orders" className={isActive('/orders')}>Orders</Link>}
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="nav-user">Hello, {user.name.split(' ')[0]}</span>
            <Link to="/cart" className={`nav-cart ${isActive('/cart')}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button className="btn-ghost nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-ghost nav-btn">Login</button></Link>
            <Link to="/register"><button className="btn-gold nav-btn">Register</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}
