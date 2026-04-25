import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault(); setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill all required fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    // Simulate registration
    const users = JSON.parse(localStorage.getItem('rs_users') || '[]');
    if (users.find(u => u.email === form.email)) { setError('Email already registered.'); return; }
    const user = { id: Date.now(), name: form.name, email: form.email, phone: form.phone };
    users.push({ ...user, password: form.password });
    localStorage.setItem('rs_users', JSON.stringify(users));
    login(user);
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
          <h2>Create Account</h2>
          <div className="divider" style={{ margin: '12px 0 28px' }} />
          {error && <div className="alert-error">{error}</div>}
          <form onSubmit={submit} className="auth-form">
            <div className="field-group">
              <label>Full Name <span>*</span></label>
              <input name="name" value={form.name} onChange={handle} placeholder="Your full name" />
            </div>
            <div className="field-group">
              <label>Email Address <span>*</span></label>
              <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" />
            </div>
            <div className="field-group">
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Password <span>*</span></label>
                <input name="password" type="password" value={form.password} onChange={handle} placeholder="Min. 6 characters" />
              </div>
              <div className="field-group">
                <label>Confirm Password <span>*</span></label>
                <input name="confirm" type="password" value={form.confirm} onChange={handle} placeholder="Repeat password" />
              </div>
            </div>
            <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>Create Account</button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
