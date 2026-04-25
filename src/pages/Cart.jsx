import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h2 className="section-title">Your Cart</h2>
          <div className="divider" />
          <div className="empty-cart">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </div>
            <h3>Your cart is empty</h3>
            <p>Add items from our catalogue to get started.</p>
            <Link to="/catalogue"><button className="btn-gold">Browse Catalogue</button></Link>
          </div>
        </div>
      </div>
    );
  }

  const tax = Math.round(cartTotal * 0.18);
  const shipping = cartTotal > 2000 ? 0 : 99;
  const grandTotal = cartTotal + tax + shipping;

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">Your Cart</h2>
        <div className="divider" />
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">{item.name.charAt(0)}</div>
                <div className="cart-item-info">
                  <span className="cart-item-cat">{item.category}</span>
                  <h4 className="cart-item-name">{item.name}</h4>
                  <span className="cart-item-price">₹{item.price.toLocaleString()} each</span>
                </div>
                <div className="cart-item-actions">
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <span className="cart-item-total">₹{(item.price * item.qty).toLocaleString()}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h3>Order Summary</h3>
            <div className="summary-lines">
              <div className="summary-line"><span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="summary-line"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
              <div className="summary-line"><span>Shipping</span><span>{shipping === 0 ? <em className="free">FREE</em> : `₹${shipping}`}</span></div>
              {shipping > 0 && <p className="free-shipping-hint">Add ₹{(2000 - cartTotal).toLocaleString()} more for free shipping</p>}
              <div className="summary-total"><span>Grand Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
            </div>
            <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/payment')}>
              Proceed to Payment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <Link to="/catalogue"><button className="btn-ghost" style={{ width: '100%', marginTop: 12 }}>Continue Shopping</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
