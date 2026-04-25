import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rs_user')) || null; } catch { return null; }
  });
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rs_cart')) || []; } catch { return []; }
  });
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rs_orders')) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('rs_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('rs_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('rs_user', JSON.stringify(user)); }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => { setUser(null); setCart([]); };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (orderData) => {
    const order = {
      id: 'INV-' + Date.now(),
      date: new Date().toISOString(),
      items: [...cart],
      ...orderData,
      status: 'Confirmed'
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount, orders, placeOrder }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
