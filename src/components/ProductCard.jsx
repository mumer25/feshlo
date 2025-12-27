import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const discount =
    product.salePrice && product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const isOutOfStock = product.quantity === 0;

  // toggle hover state on touch (mobile)
  const handleTouch = (e) => {
    e.preventDefault(); // prevent click triggering immediately
    setHovered(!hovered);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={handleTouch} // mobile tap
    >
      {/* Image wrapper - always square */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={hovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {isOutOfStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}

        {product.salePrice && !isOutOfStock && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Product details */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mt-1">
          {product.salePrice ? (
            <>
              <span className="text-green-600 font-bold text-sm sm:text-base">
                {new Intl.NumberFormat("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  minimumFractionDigits: 0,
                }).format(product.salePrice)}
              </span>
              <span className="line-through text-gray-500 text-xs sm:text-sm">
                {new Intl.NumberFormat("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  minimumFractionDigits: 0,
                }).format(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold text-sm sm:text-base">
              {new Intl.NumberFormat("en-PK", {
                style: "currency",
                currency: "PKR",
                minimumFractionDigits: 0,
              }).format(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}



// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function ProductCard({ product }) {
//   const [hovered, setHovered] = useState(false);

//   const discount =
//     product.salePrice && product.price
//       ? Math.round(((product.price - product.salePrice) / product.price) * 100)
//       : 0;

//   const isOutOfStock = product.quantity === 0;

//   // toggle hover state on touch (mobile)
//   const handleTouch = (e) => {
//     e.preventDefault(); // prevent click triggering immediately
//     setHovered(!hovered);
//   };

//   return (
//     <Link
//       to={`/product/${product.id}`}
//       className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onTouchStart={handleTouch} // mobile tap
//     >
//      <div className="relative aspect-square">
//   <img
//     src={hovered && product.hoverImage ? product.hoverImage : product.image}
//     alt={product.name}
//     className="w-full h-full object-cover transition-all duration-300"
//   />

//   {isOutOfStock && (
//     <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
//       Out of Stock
//     </span>
//   )}

//   {product.salePrice && !isOutOfStock && (
//     <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
//       {discount}% OFF
//     </span>
//   )}
// </div>


//       <div className="p-4">
//         <h3 className="font-semibold text-lg">{product.name}</h3>
//         <div className="flex items-center space-x-2">
//           {product.salePrice ? (
//             <>
//               <span className="text-green-600 font-bold">
//                 {new Intl.NumberFormat("en-PK", {
//                   style: "currency",
//                   currency: "PKR",
//                   minimumFractionDigits: 0,
//                 }).format(product.salePrice)}
//               </span>
//               <span className="line-through text-gray-500">
//                 {new Intl.NumberFormat("en-PK", {
//                   style: "currency",
//                   currency: "PKR",
//                   minimumFractionDigits: 0,
//                 }).format(product.price)}
//               </span>
//             </>
//           ) : (
//             <span className="font-bold">
//               {new Intl.NumberFormat("en-PK", {
//                 style: "currency",
//                 currency: "PKR",
//                 minimumFractionDigits: 0,
//               }).format(product.price)}
//             </span>
//           )}
//           {/* {product.salePrice ? (
//             <>
//               <span className="text-red-600 font-bold">
//                 Rs.{(product.salePrice / 100).toFixed(2)}
//               </span>
//               <span className="line-through text-gray-500">
//                 Rs{(product.price / 100).toFixed(2)}
//               </span>
//             </>
//           ) : (
//             <span className="font-bold">
//               Rs.{(product.price / 100).toFixed(2)}
//             </span>
//           )} */}
//         </div>
//       </div>
//     </Link>
//   );
// }



// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function ProductCard({ product }) {
//   const [hovered, setHovered] = useState(false);

//   const discount =
//     product.salePrice && product.price
//       ? Math.round(((product.price - product.salePrice) / product.price) * 100)
//       : 0;

//   const isOutOfStock = product.quantity === 0;

//   // toggle hover state on touch (mobile)
//   const handleTouch = (e) => {
//     e.preventDefault(); // prevent click triggering immediately
//     setHovered(!hovered);
//   };

//   return (
//     <Link
//       to={`/product/${product.id}`}
//       className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onTouchStart={handleTouch} // mobile tap
//     >
//       <div className="relative">
//         <img
//           src={
//             hovered && product.hoverImage ? product.hoverImage : product.image
//           }
//           alt={product.name}
//           className="w-full h-64 object-cover transition-all duration-300"
//         />

//         {isOutOfStock && (
//           <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
//             Out of Stock
//           </span>
//         )}

//         {product.salePrice && !isOutOfStock && (
//           <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       <div className="p-4">
//         <h3 className="font-semibold text-lg">{product.name}</h3>
//         <div className="flex items-center space-x-2">
//           {product.salePrice ? (
//             <>
//               <span className="text-green-600 font-bold">
//                 {new Intl.NumberFormat("en-PK", {
//                   style: "currency",
//                   currency: "PKR",
//                   minimumFractionDigits: 0,
//                 }).format(product.salePrice)}
//               </span>
//               <span className="line-through text-gray-500">
//                 {new Intl.NumberFormat("en-PK", {
//                   style: "currency",
//                   currency: "PKR",
//                   minimumFractionDigits: 0,
//                 }).format(product.price)}
//               </span>
//             </>
//           ) : (
//             <span className="font-bold">
//               {new Intl.NumberFormat("en-PK", {
//                 style: "currency",
//                 currency: "PKR",
//                 minimumFractionDigits: 0,
//               }).format(product.price)}
//             </span>
//           )}
//           {/* {product.salePrice ? (
//             <>
//               <span className="text-red-600 font-bold">
//                 Rs.{(product.salePrice / 100).toFixed(2)}
//               </span>
//               <span className="line-through text-gray-500">
//                 Rs{(product.price / 100).toFixed(2)}
//               </span>
//             </>
//           ) : (
//             <span className="font-bold">
//               Rs.{(product.price / 100).toFixed(2)}
//             </span>
//           )} */}
//         </div>
//       </div>
//     </Link>
//   );
// }
