import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Invoice.css';

export default function Invoice() {
  const { id } = useParams();
  const { orders } = useApp();
  const navigate = useNavigate();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="page">
        <div className="container" style={{textAlign:'center', paddingTop: 80}}>
          <h2>Invoice not found</h2>
          <Link to="/orders"><button className="btn-gold" style={{marginTop:24}}>View All Orders</button></Link>
        </div>
      </div>
    );
  }

  const date = new Date(order.date);

  const handlePrint = () => window.print();

  return (
    <div className="page">
      <div className="container">
        <div className="invoice-actions no-print">
          <button className="btn-ghost" onClick={() => navigate('/orders')}>← Back to Orders</button>
          <button className="btn-gold" onClick={handlePrint}>🖨 Print / Save PDF</button>
        </div>

        <div className="invoice-paper">
          {/* Header */}
          <div className="inv-header">
            <div className="inv-brand">
              <span className="inv-brand-icon">◆</span>
              <div>
                <div className="inv-brand-name">LUXEMART</div>
                <div className="inv-brand-tagline">Premium Retail Store</div>
              </div>
            </div>
            <div className="inv-meta">
              <h1>INVOICE</h1>
              <table className="inv-meta-table">
                <tbody>
                  <tr><td>Invoice No.</td><td><strong>{order.id}</strong></td></tr>
                  <tr><td>Date</td><td>{date.toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' })}</td></tr>
                  <tr><td>Status</td><td><span className="inv-status">{order.status}</span></td></tr>
                  <tr><td>Payment</td><td style={{textTransform:'capitalize'}}>{order.paymentMethod || 'Online'}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="inv-divider" />

          {/* Parties */}
          <div className="inv-parties">
            <div className="inv-party">
              <div className="inv-party-label">From</div>
              <strong>LuxeMart Retail Pvt. Ltd.</strong>
              <p>Plot 42, Hitech City, Madhapur</p>
              <p>Hyderabad, Telangana - 500081</p>
              <p>GST: 36AABCL1234F1ZS</p>
              <p>support@luxemart.com</p>
            </div>
            <div className="inv-party">
              <div className="inv-party-label">Bill To</div>
              <strong>{order.customer?.name || 'Customer'}</strong>
              <p>{order.customer?.email}</p>
              {order.customer?.phone && <p>{order.customer.phone}</p>}
              <p style={{marginTop:8}}>{order.address}</p>
            </div>
          </div>

          <div className="inv-divider" />

          {/* Items Table */}
          <table className="inv-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.category}</td>
                  <td>₹{item.price.toLocaleString()}</td>
                  <td>{item.qty}</td>
                  <td>₹{(item.price * item.qty).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="inv-totals">
            <div className="inv-total-rows">
              <div className="inv-total-row"><span>Subtotal</span><span>₹{order.subtotal?.toLocaleString()}</span></div>
              <div className="inv-total-row"><span>GST (18%)</span><span>₹{order.tax?.toLocaleString()}</span></div>
              <div className="inv-total-row"><span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span></div>
              <div className="inv-total-row grand"><span>Grand Total</span><span>₹{order.total?.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="inv-divider" />

          {/* Footer */}
          <div className="inv-footer">
            <div className="inv-footer-left">
              <p>Thank you for shopping with <strong>LuxeMart</strong>!</p>
              <p>For any queries, reach us at support@luxemart.com</p>
              <p style={{marginTop:8,fontSize:11,color:'#999'}}>This is a computer-generated invoice and does not require a signature.</p>
            </div>
            <div className="inv-seal">◆</div>
          </div>
        </div>
      </div>
    </div>
  );
}
