import { useEffect, useState } from 'react';
import axios from 'axios';
import { ORDERS_ENDPOINT } from '../utils/endpoint';

export default function Admin(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async () => {
      try {
        const adminSecret = window.prompt('Enter admin secret (dev only):') || '';
        const headers = adminSecret ? { 'x-admin-secret': adminSecret } : {};
        const res = await axios.get(ORDERS_ENDPOINT, { headers });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch orders. If you set ADMIN_SECRET, provide it when prompted.');
      } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="p-8">Loading orders…</div>;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders (Admin)</h1>
      {orders.length === 0 ? <p>No orders yet</p> : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id || o.recordId} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">Order ID: <span className="font-mono">{o.id || o.recordId}</span></div>
                  <div className="text-sm text-gray-600">Name: {o.name || o.fields?.Name}</div>
                  <div className="text-sm text-gray-600">Phone: {o.phone || o.fields?.Phone}</div>
                  <div className="text-sm text-gray-600">Address: {o.address || o.fields?.Address}</div>
                </div>
                <div className="text-right">
                  <div>{o.status || o.fields?.Status}</div>
                  <div className="text-xs text-gray-500">{o.createdAt || o.fields?.CreatedAt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
