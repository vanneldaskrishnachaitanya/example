import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Orders.css';

export default function Orders() {
  const { orders } = useApp();

  if (orders.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h2 className="section-title">My Orders</h2>
          <div className="divider" />
          <div style={{textAlign:'center', padding:'80px 0'}}>
            <span style={{fontSize:'3rem', color:'var(--text-dim)', display:'block', marginBottom:20}}>◎</span>
            <h3 style={{fontFamily:'Cormorant Garamond,serif', fontSize:'1.6rem', marginBottom:12}}>No orders yet</h3>
            <p style={{color:'var(--text-muted)', marginBottom:32}}>Start shopping to see your orders here.</p>
            <Link to="/catalogue"><button className="btn-gold">Shop Now</button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">My Orders</h2>
        <div className="divider" />
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{new Date(order.date).toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'})}</span>
                </div>
                <div className="order-header-right">
                  <span className="order-status">{order.status}</span>
                  <span className="order-total">₹{order.total?.toLocaleString()}</span>
                </div>
              </div>
              <div className="order-items-preview">
                {order.items.slice(0,3).map(item => (
                  <div key={item.id} className="order-item-chip">
                    <span>{item.name}</span>
                    <span>×{item.qty}</span>
                  </div>
                ))}
                {order.items.length > 3 && <span className="order-more">+{order.items.length - 3} more</span>}
              </div>
              <div className="order-footer">
                <span className="order-addr">📍 {order.address}</span>
                <Link to={`/invoice/${order.id}`}>
                  <button className="btn-outline" style={{padding:'8px 20px', fontSize:'12px'}}>View Invoice</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
