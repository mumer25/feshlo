// src/components/FakeOrderPopup.jsx
import { useEffect, useState } from "react";
import { products } from "../data/products";

const buyers = [
  { name: "Hanif", city: "Faisalabad" },
  { name: "Ahmad", city: "Lahore" },
  { name: "Ali", city: "Karachi" },
  { name: "Sara", city: "Lahore" },
  { name: "Umer", city: "Islamabad" },
  { name: "Fatima", city: "Multan" },
  { name: "Zain", city: "Lahore" },
];

export default function FakeOrderPopup() {
  const [order, setOrder] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];

      setOrder({
        buyer: randomBuyer,
        product: randomProduct,
        time: Math.floor(Math.random() * 10) + 1, // minutes ago
      });

      // show popup
      setVisible(true);

      // hide after 6 sec
      setTimeout(() => setVisible(false), 6000);
    }, 15000); // every 15s

    return () => clearInterval(interval);
  }, []);

  if (!order) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 bg-white shadow-lg border rounded-lg p-4 flex items-center space-x-3 transition-all duration-500 transform
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      <img
        src={order.product.image}
        alt={order.product.name}
        className="w-12 h-12 rounded-md object-cover"
      />
      <div>
        <p className="text-sm text-gray-700 font-medium">
          {order.buyer.name} from {order.buyer.city}
        </p>
        <p className="text-sm text-gray-500">
          just bought{" "}
          <span className="font-semibold">{order.product.name}</span>
        </p>
        <span className="text-xs text-gray-400">
          {order.time} minutes ago
        </span>
      </div>
    </div>
  );
}
