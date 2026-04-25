import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault(); setError('');
    const users = JSON.parse(localStorage.getItem('rs_users') || '[]');
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (!user) { setError('Invalid email or password.'); return; }
    login({ id: user.id, name: user.name, email: user.email, phone: user.phone });
    navigate('/catalogue');
  };

  // Demo login
  const demoLogin = () => {
    const demo = { id: 'demo', name: 'Demo User', email: 'demo@luxemart.com', phone: '+91 98765 43210' };
    login(demo);
    navigate('/catalogue');
  };

  return (
    <div className="auth-page">
      <div className="auth-deco">
        <div className="auth-orb" />
        <div className="auth-brand">◆ LUXEMART</div>
        <p className="auth-tagline">Premium shopping, redefined.</p>
      </div>
      <div className="auth-form-wrap">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <div className="divider" style={{ margin: '12px 0 28px' }} />
          {error && <div className="alert-error">{error}</div>}
          <form onSubmit={submit} className="auth-form">
            <div className="field-group">
              <label>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" />
            </div>
            <div className="field-group">
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handle} placeholder="Your password" />
            </div>
            <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Sign In</button>
          </form>
          <div className="auth-or"><span>or</span></div>
          <button className="btn-ghost" style={{ width: '100%' }} onClick={demoLogin}>Continue as Demo User</button>
          <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}
