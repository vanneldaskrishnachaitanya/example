import { useState } from 'react';
import './Contact.css';

const faqs = [
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy on all products. Items must be unused and in original packaging.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available at checkout.' },
  { q: 'Do you offer EMI options?', a: 'Yes! We offer no-cost EMI on all orders above ₹3,000 via major credit cards.' },
  { q: 'How do I track my order?', a: 'Once shipped, you will receive a tracking link via email and SMS to monitor your delivery in real time.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(null);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        <div className="divider" />

        <div className="contact-layout">
          {/* Left info */}
          <div className="contact-info">
            <div className="contact-info-card card">
              <h3>Contact Information</h3>
              <div className="contact-details">
                {[
                  { icon: '📍', label: 'Address', value: 'Plot 42, Hitech City, Madhapur, Hyderabad — 500081' },
                  { icon: '📞', label: 'Phone', value: '+91 40 6789 0123' },
                  { icon: '✉️', label: 'Email', value: 'support@luxemart.com' },
                  { icon: '⏰', label: 'Hours', value: 'Mon–Sat, 9AM–7PM IST' },
                ].map(item => (
                  <div key={item.label} className="contact-detail">
                    <span className="contact-icon">{item.icon}</span>
                    <div>
                      <div className="contact-label">{item.label}</div>
                      <div className="contact-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 style={{fontFamily:'Cormorant Garamond,serif', fontSize:'1.3rem', marginBottom:20}}>Frequently Asked Questions</h3>
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                    {faq.q}
                    <span className="faq-arrow">{open === i ? '−' : '+'}</span>
                  </button>
                  {open === i && <p className="faq-a">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap card">
            <h3>Send us a Message</h3>
            {sent && <div className="alert-success">✓ Message sent! We'll get back to you within 24 hours.</div>}
            <form onSubmit={submit} className="contact-form">
              <div className="field-row-2">
                <div className="field-group">
                  <label>Your Name *</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Full name" required />
                </div>
                <div className="field-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@email.com" required />
                </div>
              </div>
              <div className="field-group">
                <label>Subject</label>
                <select name="subject" value={form.subject} onChange={handle}>
                  <option value="">Select a topic</option>
                  <option>Order Issue</option>
                  <option>Return / Refund</option>
                  <option>Product Query</option>
                  <option>Payment Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field-group">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="Describe your query in detail…" rows={5} required style={{resize:'vertical'}} />
              </div>
              <button type="submit" className="btn-gold">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
