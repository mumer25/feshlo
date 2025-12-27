// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const unit = item.salePrice ?? item.price ?? 0;
    return sum + Number(unit) * Number(item.quantity);
  }, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <Link
          to="/shop"
          className="mt-4 inline-block px-6 py-2 bg-black text-white rounded"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Shopping Cart
      </h2>

      <div className="space-y-4">
        {cart.map((item) => {
          const unit = item.salePrice ?? item.price;
          const subtotal = Number(unit) * Number(item.quantity);

          return (
            <div
              key={`${item.id}-${item.size ?? "default"}`}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-4"
            >
              {/* Left Section */}
              <div className="flex items-start gap-4 text-left">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />

                <div>
                  <h3 className="font-semibold">{item.name}</h3>

                  {item.size && (
                    <p className="text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                  )}

                  <p className="text-gray-600">
                    Unit: Rs {Number(unit).toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500">
                    Subtotal: Rs {subtotal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3 sm:justify-end">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      Math.max(1, item.quantity - 1),
                      item.size
                    )
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span className="min-w-[24px] text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      Math.min(item.quantity + 1, item.stock ?? Infinity),
                      item.size
                    )
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="ml-2 text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Clear Cart
          </button>

          <Link
            to="/shop"
            className="px-4 py-2 bg-white border rounded text-center"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-lg sm:text-xl font-bold">
            Total: Rs {total.toLocaleString()}
          </div>

          <Link
            to="/checkout"
            className="inline-block mt-3 px-6 py-2 bg-green-600 text-white rounded w-full sm:w-auto text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}




// // src/pages/CartPage.jsx
// import React from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// export default function CartPage() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

//   const total = cart.reduce((sum, item) => {
//     const unit = item.salePrice ?? item.price ?? 0;
//     return sum + Number(unit) * Number(item.quantity);
//   }, 0);

//   if (!cart || cart.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-semibold">Your cart is empty</h2>
//         <Link
//           to="/shop"
//           className="mt-4 inline-block px-6 py-2 bg-black text-white rounded"
//         >
//           Shop now
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

//       <div className="space-y-4">
//         {cart.map((item) => {
//           const unit = item.salePrice ?? item.price;
//           const subtotal = Number(unit) * Number(item.quantity);

//           return (
//             <div
//               key={`${item.id}-${item.size ?? "default"}`}
//               className="flex items-center justify-between border-b pb-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{item.name}</h3>
//                   {item.size && (
//                     <p className="text-sm text-gray-500">Size: {item.size}</p>
//                   )}
//                   <p className="text-gray-600">
//                     Unit: Rs {Number(unit).toLocaleString()}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Subtotal: Rs {subtotal.toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() =>
//                     updateQuantity(
//                       item.id,
//                       Math.max(1, item.quantity - 1),
//                       item.size
//                     )
//                   }
//                   className="px-2 py-1 bg-gray-200 rounded"
//                 >
//                   -
//                 </button>

//                 <span>{item.quantity}</span>

//                 <button
//                   onClick={() =>
//                     updateQuantity(
//                       item.id,
//                       Math.min(item.quantity + 1, item.stock ?? Infinity),
//                       item.size
//                     )
//                   }
//                   className="px-2 py-1 bg-gray-200 rounded"
//                 >
//                   +
//                 </button>

//                 <button
//                   onClick={() => removeFromCart(item.id, item.size)}
//                   className="ml-4 text-red-500"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-8 flex justify-between items-center">
//         <div>
//           <button
//             onClick={clearCart}
//             className="px-4 py-2 bg-gray-300 rounded mr-3"
//           >
//             Clear Cart
//           </button>
//           <Link to="/shop" className="px-4 py-2 bg-white border rounded">
//             Continue Shopping
//           </Link>
//         </div>

//         <div>
//           <div className="text-xl font-bold">
//             Total: Rs {total.toLocaleString()}
//           </div>
//           <Link
//             to="/checkout"
//             className="inline-block mt-3 px-6 py-2 bg-green-600 text-white rounded"
//           >
//             Proceed to Checkout
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/CartPage.jsx
// import React from "react";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// export default function CartPage() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

//   const total = cart.reduce((sum, item) => {
//     const unit = item.salePrice ?? item.price ?? 0;
//     return sum + Number(unit) * Number(item.quantity);
//   }, 0);

//   if (!cart || cart.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-semibold">Your cart is empty</h2>
//         <Link
//           to="/shop"
//           className="mt-4 inline-block px-6 py-2 bg-black text-white rounded"
//         >
//           Shop now
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

//       <div className="space-y-4">
//         {cart.map((item) => {
//           const unit = item.salePrice ?? item.price;
//           const subtotal = Number(unit) * Number(item.quantity);
//           const stock = Number(item.stock ?? Infinity);

//           return (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border-b pb-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <p className="text-gray-600">
//                     Unit: Rs {Number(unit).toLocaleString()}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Subtotal: Rs {subtotal.toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() =>
//                     updateQuantity(item.id, Math.max(1, item.quantity - 1))
//                   }
//                   className="px-2 py-1 bg-gray-200 rounded"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() =>
//                     updateQuantity(item.id, Math.min(stock, item.quantity + 1))
//                   }
//                   className="px-2 py-1 bg-gray-200 rounded"
//                 >
//                   +
//                 </button>

//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="ml-4 text-red-500"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-8 flex justify-between items-center">
//         <div>
//           <button
//             onClick={clearCart}
//             className="px-4 py-2 bg-gray-300 rounded mr-3"
//           >
//             Clear Cart
//           </button>
//           <Link
//             to="/shop"
//             className="px-4 py-2 bg-white border rounded"
//           >
//             Continue Shopping
//           </Link>
//         </div>

//         <div>
//           <div className="text-xl font-bold">
//             Total: Rs {total.toLocaleString()}
//           </div>
//           <Link
//             to="/checkout"
//             className="inline-block mt-3 px-6 py-2 bg-green-600 text-white rounded"
//           >
//             Proceed to Checkout
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
