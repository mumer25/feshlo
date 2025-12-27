import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SHIPPING_FEE = 200;

  // Calculate product total
  const productTotal = cart.reduce((sum, item) => {
    const price = item.salePrice ?? item.price ?? 0;
    return sum + Number(price) * Number(item.quantity);
  }, 0);

  // Apply 5% discount for bank payment
  const discountedProductTotal =
    paymentMethod === "bank" ? productTotal * 0.95 : productTotal;

  const finalTotal = discountedProductTotal + SHIPPING_FEE;

  const handlePlaceOrder = async () => {
    const { name, phone, address, city, postalCode, country } = formData;
    if (!name || !phone || !address || !city || !postalCode || !country) {
      alert("Please fill in all required fields");
      return;
    }

    const orderData = {
      ...formData,
      cart, // ✅ cart already has { size } from ProductDetail.jsx
      shippingFee: SHIPPING_FEE,
      total: finalTotal,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    if (paymentMethod === "bank") {
      alert(
        `Please pay using JazzCash in advance to secure your order.\n5% discount applied!
        \n Account Number: 03229199459 \n Name: Muhammad Umer`
      );
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://feshlo-backend.netlify.app/.netlify/functions/createOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Order placed successfully!");
        clearCart();
        navigate("/success");
      } else {
        alert("❌ Error placing order: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Failed to place order:", err);
      alert("❌ Failed to place order, please try again");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Billing Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
            <textarea
              name="note"
              placeholder="Add a note (optional)"
              value={formData.note}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="border rounded p-4 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <div>
                  <span className="block font-medium">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="block text-sm text-gray-500">
                    Code: {item.code || item.id}
                  </span>
                  {item.size && (
                    <span className="block text-sm text-gray-500">
                      Size: {item.size}
                    </span>
                  )}
                </div>
                <span className="font-semibold">
                  Rs {(item.salePrice ?? item.price) * item.quantity}
                </span>
              </div>
            ))}

            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Shipping Fee:</span>
              <span>Rs {SHIPPING_FEE}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>Rs {finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              Bank Payment (5% discount)
            </label>
            {paymentMethod === "bank" && (
              <div className="mt-2 text-sm text-blue-700">
                Please pay using JazzCash to secure your order. <br />
                <b>5% Discount</b> applied! <br />
                <b className="text-green-800">Account Details:</b> <br />
                Name: Muhammad Umer <br />
                Account Number: 03229199459  <br/>

                <b>Note:</b>Share Paymemt ScreenShoot on WhatsApp for verification.
              </div>
            )}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-4 w-full bg-green-600 cursor-pointer text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}




// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "Pakistan",
//     note: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const SHIPPING_FEE = 200;

//   // Calculate product total
//   const productTotal = cart.reduce((sum, item) => {
//     const price = item.salePrice ?? item.price ?? 0;
//     return sum + Number(price) * Number(item.quantity);
//   }, 0);

//   // Apply 5% discount for bank payment
//   const discountedProductTotal =
//     paymentMethod === "bank" ? productTotal * 0.95 : productTotal;

//   const finalTotal = discountedProductTotal + SHIPPING_FEE;
// const handlePlaceOrder = async () => {
//   const { name, phone, address, city, postalCode, country } = formData;
//   if (!name || !phone || !address || !city || !postalCode || !country) {
//     alert("Please fill in all required fields");
//     return;
//   }

//   const orderData = {
//     ...formData,
//     cart,
//     shippingFee: SHIPPING_FEE,
//     total: finalTotal,
//     paymentMethod,
//     createdAt: new Date().toISOString(),
//   };

//   if (paymentMethod === "bank") {
//     alert(
//       `Please pay using JazzCash in advance to secure your order.\n5% discount applied!
//       \n Account Number: 03229199459 \n Name: Muhammad Umer`
//     );
//   }

//   try {
//     setLoading(true);
//     const res = await fetch("https://feshlo-backend.netlify.app/.netlify/functions/createOrder", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     });

//     const data = await res.json();

//     if (res.ok && data.success) {
//       alert("✅ Order placed successfully!");
//       clearCart();
//       navigate("/success");
//     } else {
//       alert("❌ Error placing order: " + (data.error || "Unknown error"));
//     }
//   } catch (err) {
//     console.error("❌ Failed to place order:", err);
//     alert("❌ Failed to place order, please try again");
//   } finally {
//     setLoading(false);
//   }
// };


//   if (!cart || cart.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-semibold">Your cart is empty</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Checkout</h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Billing Form */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
//           <div className="flex flex-col space-y-3">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             {/* Optional note */}
//             <textarea
//               name="note"
//               placeholder="Add a note (optional)"
//               value={formData.note}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
//           <div className="border rounded p-4 space-y-3">
//             {/* {cart.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>
//                   {item.name} x {item.quantity}
//                 </span>
//                 <span>
//                   Rs {(item.salePrice ?? item.price) * item.quantity}
//                 </span>
//               </div>
//             ))} */}
//             {cart.map((item) => (
//   <div key={item.id} className="flex justify-between mb-2">
//     <div>
//       <span className="block font-medium">
//         {item.name} x {item.quantity}
//       </span>
//       <span className="block text-sm text-gray-500">
//         Code: {item.code || item.id}
//       </span>
//     </div>
//     <span className="font-semibold">
//       Rs {(item.salePrice ?? item.price) * item.quantity}
//     </span>
//   </div>
// ))}

//             <hr className="my-2" />
//             <div className="flex justify-between font-semibold">
//               <span>Shipping Fee:</span>
//               <span>Rs {SHIPPING_FEE}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg mt-2">
//               <span>Total:</span>
//               <span>Rs {finalTotal.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="mt-4 space-y-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="cod"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//               />
//               Cash on Delivery
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="bank"
//                 checked={paymentMethod === "bank"}
//                 onChange={() => setPaymentMethod("bank")}
//               />
//               Bank Payment (5% discount)
//             </label>
//             {paymentMethod === "bank" && (
//               <div className="mt-2 text-sm text-blue-700">
//                 Please pay using JazzCash to secure
//                 your order.<br/> <b>5% Discount</b> applied! <br/>
//                 <b className="text-green-800">Account Details:</b> <br/>
//                 Name: Muhammad Umer <br/>
//                 Account Number: 03229199459 
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={loading}
//             className="mt-4 w-full bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
//           >
//             {loading ? "Placing Order..." : "Place Order"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const { cart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     note: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const SHIPPING_FEE = 200;

//   // Calculate product total
//   const productTotal = cart.reduce((sum, item) => {
//     const price = item.salePrice ?? item.price ?? 0;
//     return sum + Number(price) * Number(item.quantity);
//   }, 0);

//   // Apply 5% discount for bank payment
//   const discountedProductTotal =
//     paymentMethod === "bank" ? productTotal * 0.95 : productTotal;

//   const finalTotal = discountedProductTotal + SHIPPING_FEE;

//   const handlePlaceOrder = () => {
//     const { name, phone, address, city, postalCode, country } = formData;
//     if (!name || !phone || !address || !city || !postalCode || !country) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const orderData = {
//       ...formData,
//       cart,
//       shippingFee: SHIPPING_FEE,
//       total: finalTotal,
//       paymentMethod,
//     };

//     if (paymentMethod === "bank") {
//       alert(
//         `Please pay using JazzCash number 03229199459 in advance to secure your order.\n5% discount applied!`
//       );
//     }

//     console.log("Order placed:", orderData);
//     clearCart();
//     navigate("/success");
//   };

//   if (!cart || cart.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-semibold">Your cart is empty</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Checkout</h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Billing Form */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
//           <div className="flex flex-col space-y-3">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//             {/* Optional note */}
//             <textarea
//               name="note"
//               placeholder="Add a note (optional)"
//               value={formData.note}
//               onChange={handleChange}
//               className="border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
//           <div className="border rounded p-4 space-y-3">
//             {cart.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>
//                   {item.name} x {item.quantity}
//                 </span>
//                 <span>
//                   Rs {(item.salePrice ?? item.price) * item.quantity}
//                 </span>
//               </div>
//             ))}
//             <hr className="my-2" />
//             <div className="flex justify-between font-semibold">
//               <span>Shipping Fee:</span>
//               {/* <span>Rs {SHIPPING_FEE}</span> */}
//               <span>Rs {SHIPPING_FEE}</span>

//             </div>
//             <div className="flex justify-between font-bold text-lg mt-2">
//               <span>Total:</span>
//               <span>Rs {finalTotal.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="mt-4 space-y-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="cod"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//               />
//               Cash on Delivery
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="bank"
//                 checked={paymentMethod === "bank"}
//                 onChange={() => setPaymentMethod("bank")}
//               />
//               Bank Payment (5% discount)
//             </label>
//             {paymentMethod === "bank" && (
//               <div className="mt-2 text-sm text-blue-700">
//                 Please pay using JazzCash number <b>03229199459</b> to secure
//                 your order. 5% discount applied!
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             className="mt-4 w-full bg-green-600 text-white px-6 py-2 rounded"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
