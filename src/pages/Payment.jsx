import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Payment.css';

export default function Payment() {
  const { cart, cartTotal, user, placeOrder } = useApp();
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    address: '', city: '', pincode: '', state: '',
    cardName: '', cardNum: '', expiry: '', cvv: '',
    upiId: ''
  });

  const tax = Math.round(cartTotal * 0.18);
  const shipping = cartTotal > 2000 ? 0 : 99;
  const grand = cartTotal + tax + shipping;

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const formatCard = (val) => val.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExpiry = (val) => { const v = val.replace(/\D/g,'').slice(0,4); return v.length>2 ? v.slice(0,2)+'/'+v.slice(2) : v; };

  const submit = (e) => {
    e.preventDefault();
    if (!form.address || !form.city || !form.pincode) { alert('Please fill delivery address.'); return; }
    setProcessing(true);
    setTimeout(() => {
      const order = placeOrder({
        customer: user,
        address: `${form.address}, ${form.city} - ${form.pincode}, ${form.state}`,
        paymentMethod: method,
        subtotal: cartTotal, tax, shipping, total: grand
      });
      navigate('/invoice/' + order.id);
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/catalogue'); return null;
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">Checkout</h2>
        <div className="divider" />
        <form onSubmit={submit} className="payment-layout">
          <div className="payment-left">
            {/* Delivery */}
            <div className="pay-section card">
              <h3>Delivery Address</h3>
              <div className="pay-fields">
                <div className="field-group">
                  <label>Street Address</label>
                  <input name="address" value={form.address} onChange={handle} placeholder="Flat/House No, Street, Area" required />
                </div>
                <div className="field-row-3">
                  <div className="field-group">
                    <label>City</label>
                    <input name="city" value={form.city} onChange={handle} placeholder="City" required />
                  </div>
                  <div className="field-group">
                    <label>Pincode</label>
                    <input name="pincode" value={form.pincode} onChange={handle} placeholder="500001" maxLength={6} required />
                  </div>
                  <div className="field-group">
                    <label>State</label>
                    <input name="state" value={form.state} onChange={handle} placeholder="Telangana" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pay-section card">
              <h3>Payment Method</h3>
              <div className="method-tabs">
                {[{id:'card',label:'💳 Credit/Debit Card'},{id:'upi',label:'⚡ UPI'},{id:'cod',label:'💵 Cash on Delivery'}].map(m => (
                  <button key={m.id} type="button" className={`method-tab ${method===m.id?'active':''}`} onClick={() => setMethod(m.id)}>{m.label}</button>
                ))}
              </div>

              {method === 'card' && (
                <div className="pay-fields">
                  <div className="field-group">
                    <label>Name on Card</label>
                    <input name="cardName" value={form.cardName} onChange={handle} placeholder="As printed on card" />
                  </div>
                  <div className="field-group">
                    <label>Card Number</label>
                    <input name="cardNum" value={form.cardNum}
                      onChange={e => setForm(p=>({...p, cardNum: formatCard(e.target.value)}))}
                      placeholder="XXXX XXXX XXXX XXXX" maxLength={19} />
                  </div>
                  <div className="field-row-2">
                    <div className="field-group">
                      <label>Expiry</label>
                      <input name="expiry" value={form.expiry}
                        onChange={e => setForm(p=>({...p, expiry: formatExpiry(e.target.value)}))}
                        placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="field-group">
                      <label>CVV</label>
                      <input name="cvv" type="password" value={form.cvv}
                        onChange={e => setForm(p=>({...p, cvv: e.target.value.replace(/\D/g,'').slice(0,3)}))}
                        placeholder="•••" maxLength={3} />
                    </div>
                  </div>
                </div>
              )}

              {method === 'upi' && (
                <div className="pay-fields">
                  <div className="field-group">
                    <label>UPI ID</label>
                    <input name="upiId" value={form.upiId} onChange={handle} placeholder="yourname@upi" />
                  </div>
                </div>
              )}

              {method === 'cod' && (
                <div className="cod-info">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Pay with cash when your order is delivered. Additional ₹30 COD fee applies.
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="pay-summary">
            <div className="card">
              <h3>Order Summary</h3>
              <div className="pay-items">
                {cart.map(item => (
                  <div key={item.id} className="pay-item">
                    <div>
                      <p className="pay-item-name">{item.name}</p>
                      <p className="pay-item-qty">Qty: {item.qty}</p>
                    </div>
                    <span>₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="summary-lines">
                <div className="summary-line"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className="summary-line"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                <div className="summary-line"><span>Shipping</span><span>{shipping === 0 ? <em style={{color:'var(--success)'}}>FREE</em> : `₹${shipping}`}</span></div>
                {method === 'cod' && <div className="summary-line"><span>COD Fee</span><span>₹30</span></div>}
                <div className="summary-total"><span>Total Payable</span><span>₹{(grand + (method==='cod'?30:0)).toLocaleString()}</span></div>
              </div>
              <button type="submit" className="btn-gold" style={{width:'100%', justifyContent:'center'}} disabled={processing}>
                {processing ? 'Processing…' : `Pay ₹${(grand + (method==='cod'?30:0)).toLocaleString()}`}
              </button>
              <p className="secure-badge">🔒 Secured by 256-bit SSL encryption</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
