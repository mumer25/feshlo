import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ORDERS_ENDPOINT } from '../utils/endpoint';

export default function OrderModal({ product, onClose }){
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '', quantity: 1, notes: '' });
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) return alert('Please fill required fields');
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        quantity: Number(form.quantity) || 1,
        notes: form.notes,
        productId: product.id,
        productSnapshot: { id: product.id, name: product.name, price: product.price },
      };
      const res = await axios.post(ORDERS_ENDPOINT, payload, { headers: { 'Content-Type': 'application/json' } });
      const orderId = res.data.orderId;
      onClose();
      navigate(`/success?orderId=${encodeURIComponent(orderId)}`);
    } catch (err) {
      console.error(err);
      alert('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Cash on Delivery — {product.name}</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl border" />
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-gray-600">Rs {product.price.toLocaleString()}</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="border rounded-lg px-3 py-2" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="border rounded-lg px-3 py-2" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input className="border rounded-lg px-3 py-2" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            <input type="number" min={1} className="border rounded-lg px-3 py-2" placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
          </div>
          <textarea className="border rounded-lg px-3 py-2 w-full" rows={3} placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <button disabled={loading} onClick={placeOrder} className="w-full rounded-lg bg-black text-white py-3 disabled:opacity-60">{loading ? 'Placing order…' : 'Confirm Order (COD)'}</button>
        </div>
      </div>
    </div>
  );
}
