import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products, categories } from '../data/products';
import './Catalogue.css';

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? 'var(--gold)' : 'var(--border)' }}>★</span>
      ))}
      <span className="rating-num">{rating}</span>
    </div>
  );
}

export default function Catalogue() {
  const [searchParams] = useSearchParams();
  const initCat = searchParams.get('cat') || 'All';
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [toast, setToast] = useState('');
  const { addToCart, user } = useApp();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc') list = [...list].sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a,b) => b.rating - a.rating);
    return list;
  }, [activeCategory, search, sort]);

  const handleAdd = (product) => {
    if (!user) { navigate('/login'); return; }
    addToCart(product);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">Our Catalogue</h2>
        <div className="divider" />

        {/* Filters */}
        <div className="catalogue-controls">
          <div className="cat-filters">
            {categories.map(c => (
              <button key={c} className={`cat-pill ${activeCategory === c ? 'active' : ''}`} onClick={() => setActiveCategory(c)}>{c}</button>
            ))}
          </div>
          <div className="catalogue-right-controls">
            <input className="search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ width: 220 }} />
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ width: 170 }}>
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        <p className="result-count">{filtered.length} products found</p>

        {/* Grid */}
        <div className="product-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-img">
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {product.badge && <span className="tag product-badge">{product.badge}</span>}
              </div>
              <div className="product-info">
                <div className="product-cat">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <StarRating rating={product.rating} />
                <span className="review-count">({product.reviews} reviews)</span>
                <div className="product-footer">
                  <span className="product-price">₹{product.price.toLocaleString()}</span>
                  <button className="btn-gold product-add-btn" onClick={() => handleAdd(product)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <span>◎</span>
            <p>No products found. Try a different search or category.</p>
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
