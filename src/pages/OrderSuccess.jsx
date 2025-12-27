import { useSearchParams, Link } from 'react-router-dom';

export default function OrderSuccess(){
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  return (
    <div className="max-w-2xl mx-auto px-4 my-20 text-center">
      <h1 className="text-3xl font-semibold mb-2">Thank you! 🎉</h1>
      <p className="text-gray-700 mb-6">Your Order has been placed successfully.</p>
      {orderId && <p className="text-gray-600 mb-6">Order ID: <span className="font-mono">{orderId}</span></p>}
      <Link to="/shop" className="inline-block rounded-lg bg-black text-white px-5 py-3 hover:bg-gray-900">Continue Shopping</Link>
    </div>
  );
}
