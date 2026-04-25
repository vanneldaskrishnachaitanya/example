import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  { icon: '◈', title: 'Curated Selection', desc: 'Hand-picked premium products across every category.' },
  { icon: '◉', title: 'Secure Checkout', desc: 'End-to-end encrypted payment processing.' },
  { icon: '◇', title: 'Instant Invoices', desc: 'Professional invoices generated automatically.' },
  { icon: '◎', title: 'Easy Returns', desc: '30-day hassle-free return policy.' },
];

const categories = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'];

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
        </div>
        <div className="hero-content">
          <span className="tag">New Collection 2025</span>
          <h1 className="hero-title">
            Discover <em>Premium</em><br />Products, Curated<br />for You
          </h1>
          <p className="hero-desc">Shop from thousands of handpicked items across every category. Quality guaranteed, delivered to your door.</p>
          <div className="hero-cta">
            <Link to="/catalogue"><button className="btn-gold">Explore Catalogue</button></Link>
            <Link to="/register"><button className="btn-outline">Create Account</button></Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><span>12K+</span><label>Products</label></div>
          <div className="stat"><span>50K+</span><label>Customers</label></div>
          <div className="stat"><span>4.9★</span><label>Rating</label></div>
        </div>
      </section>

      {/* Categories */}
      <section className="home-section container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="divider" />
        <div className="cat-grid">
          {categories.map(c => (
            <Link key={c} to={`/catalogue?cat=${c}`} className="cat-card">
              <span>{c}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="home-section container">
        <h2 className="section-title">Why LuxeMart?</h2>
        <div className="divider" />
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner container">
        <div className="cta-inner">
          <h2>Ready to start shopping?</h2>
          <p>Join thousands of happy customers today.</p>
          <Link to="/register"><button className="btn-gold">Get Started — It's Free</button></Link>
        </div>
      </section>

      <footer className="home-footer">
        <span>◆ LUXEMART</span>
        <span>© 2025 All rights reserved</span>
        <div className="footer-links">
          <Link to="/contact">Contact</Link>
          <Link to="/catalogue">Shop</Link>
        </div>
      </footer>
    </div>
  );
}
