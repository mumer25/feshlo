// src/context/CartProvider.jsx
import React, { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add product with custom quantity and size
  const addToCart = (product, quantity = 1, size = null) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  Number(product.stock) || Infinity
                ),
              }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity, size }];
      }
    });
  };

  // Update quantity directly
  const updateQuantity = (id, quantity, size = null) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock || Infinity)) }
          : item
      )
    );
  };

  // Increase quantity by 1
  const increaseQuantity = (id, size = null) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock || Infinity) }
          : item
      )
    );
  };

  // Decrease quantity by 1
  const decreaseQuantity = (id, size = null) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove a product (with specific size)
  const removeFromCart = (id, size = null) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Clear the entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};



// // src/context/CartProvider.jsx
// import React, { useState } from "react";
// import { CartContext } from "./CartContext";

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Add product with custom quantity
//   const addToCart = (product, quantity = 1) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item.id === product.id);

//       if (existingProduct) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? {
//                 ...item,
//                 quantity: Math.min(
//                   item.quantity + quantity,
//                   Number(product.stock) || Infinity
//                 ),
//               }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity }];
//       }
//     });
//   };

//   // Update quantity directly
//   const updateQuantity = (id, quantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock || Infinity)) }
//           : item
//       )
//     );
//   };

//   // Increase quantity by 1
//   const increaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.min(item.quantity + 1, item.stock || Infinity) }
//           : item
//       )
//     );
//   };

//   // Decrease quantity by 1
//   const decreaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   // Remove a product from cart
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Clear the entire cart
//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQuantity,
//         increaseQuantity,
//         decreaseQuantity,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
