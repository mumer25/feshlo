// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import Review from "../components/Review";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  // ✅ Hover state for related product cards
  const [hoveredId, setHoveredId] = useState(null);

  // ✅ Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!product) return <p className="text-center mt-10">❌ Product not found</p>;

  const stock = Number(product.quantity ?? product.stock ?? Infinity);

  const onQtyChange = (val) => {
    const n = Math.max(1, Number(val) || 1);
    setQuantity(Math.min(n, stock));
  };

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product, quantity, selectedSize);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (product.sizes?.length && !selectedSize) {
      alert("Please select a size before buying.");
      return;
    }
    clearCart();
    addToCart(product, quantity, selectedSize);
    navigate("/checkout");
  };

  const discount =
    product.salePrice && product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const images = product.images || [product.image];

  const prevImage = () =>
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) nextImage();
    if (touchEndX - touchStartX > 50) prevImage();
  };

  // ✅ Get related products (same category, excluding current)
  const relatedProducts = products
    .filter(
      (p) => p.category === product.category && String(p.id) !== String(product.id)
    )
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE SLIDER */}
        <div className="relative">
          <div className="relative w-full h-[500px] rounded-lg shadow-md">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg transition-all duration-500"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />

            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <button
                  onClick={prevImage}
                  className="bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
                >
                  {"<"}
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
                >
                  {">"}
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex mt-4 space-x-3 overflow-x-auto">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
                  index === activeImage ? "border-black" : "border-transparent"
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 text-sm mt-1">
            Product Code:{" "}
            <span className="font-mono">{product.code || product.id}</span>
          </p>

          {product.salePrice ? (
            <div className="mt-4">
              <span className="text-2xl font-bold text-green-700">
                Rs {product.salePrice.toLocaleString()}
              </span>
              <span className="line-through text-gray-500 ml-3">
                Rs {product.price.toLocaleString()}
              </span>
              <span className="text-sm text-red-600 ml-3">{discount}% OFF</span>
            </div>
          ) : (
            <div className="mt-4 text-2xl font-bold">
              Rs {product.price.toLocaleString()}
            </div>
          )}

          <p
            className={`mt-3 font-semibold ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <label className="text-gray-700 font-medium block mb-2">
                Select Size:
              </label>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stock > 0 && (
            <div className="mt-4 flex items-center space-x-3">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                max={stock}
                value={quantity}
                onChange={(e) => onQtyChange(e.target.value)}
                className="w-20 border rounded px-2 py-1"
              />
            </div>
          )}

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`px-6 py-2 rounded cursor-pointer transition ${
                stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={stock <= 0}
              className={`px-6 py-2 rounded cursor-pointer transition ${
                stock > 0
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Product Description</h2>
            {Array.isArray(product.description) ? (
              product.description.map((section, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-md font-semibold text-gray-800">
                    {section.heading}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 mt-1">
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="mt-2 text-gray-600">
                {product.description || "No description available."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ RELATED PRODUCTS SECTION (Updated to match ProductCard.jsx) */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map((related) => {
              const discount =
                related.salePrice && related.price
                  ? Math.round(
                      ((related.price - related.salePrice) / related.price) * 100
                    )
                  : 0;
              const isOutOfStock = related.quantity === 0;

              return (
                <div
                  key={related.id}
                  onClick={() => navigate(`/product/${related.id}`)}
                  onMouseEnter={() => setHoveredId(related.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onTouchStart={() =>
                    setHoveredId(hoveredId === related.id ? null : related.id)
                  }
                  className="block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={
                        hoveredId === related.id && related.hoverImage
                          ? related.hoverImage
                          : related.image
                      }
                      alt={related.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {isOutOfStock && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    )}

                    {related.salePrice && !isOutOfStock && (
                      <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg truncate">
                      {related.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {related.salePrice ? (
                        <>
                          <span className="text-green-600 font-bold text-sm sm:text-base">
                            {new Intl.NumberFormat("en-PK", {
                              style: "currency",
                              currency: "PKR",
                              minimumFractionDigits: 0,
                            }).format(related.salePrice)}
                          </span>
                          <span className="line-through text-gray-500 text-xs sm:text-sm">
                            {new Intl.NumberFormat("en-PK", {
                              style: "currency",
                              currency: "PKR",
                              minimumFractionDigits: 0,
                            }).format(related.price)}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-gray-800 text-sm sm:text-base">
                          {new Intl.NumberFormat("en-PK", {
                            style: "currency",
                            currency: "PKR",
                            minimumFractionDigits: 0,
                          }).format(related.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ✅ REVIEWS SECTION */}
      <div className="mt-12">
        <Review productId={product.id} />
      </div>
    </div>
  );
}






// // src/pages/ProductDetail.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { products } from "../data/products";
// import { useCart } from "../context/CartContext";
// import Review from "../components/Review"; // ✅ Import Review component

// export default function ProductDetail() {
//   const { id } = useParams();
//   const product = products.find((p) => String(p.id) === String(id));
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("");
//   const { addToCart, clearCart } = useCart();
//   const navigate = useNavigate();
//   const [activeImage, setActiveImage] = useState(0);

//     // ✅ Scroll to top when page loads
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   if (!product) return <p className="text-center mt-10">❌ Product not found</p>;

//   const stock = Number(product.quantity ?? product.stock ?? Infinity);

//   const onQtyChange = (val) => {
//     const n = Math.max(1, Number(val) || 1);
//     setQuantity(Math.min(n, stock));
//   };

//   const handleAddToCart = () => {
//     if (product.sizes?.length && !selectedSize) {
//       alert("Please select a size before adding to cart.");
//       return;
//     }
//     addToCart(product, quantity, selectedSize);
//     navigate("/cart");
//   };

//   const handleBuyNow = () => {
//     if (product.sizes?.length && !selectedSize) {
//       alert("Please select a size before buying.");
//       return;
//     }
//     clearCart();
//     addToCart(product, quantity, selectedSize);
//     navigate("/checkout");
//   };

//   const discount =
//     product.salePrice && product.price
//       ? Math.round(((product.price - product.salePrice) / product.price) * 100)
//       : 0;

//   const images = product.images || [product.image];

//   const prevImage = () =>
//     setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   const nextImage = () =>
//     setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

//   let touchStartX = 0;
//   let touchEndX = 0;

//   const handleTouchStart = (e) => {
//     touchStartX = e.changedTouches[0].screenX;
//   };
//   const handleTouchEnd = (e) => {
//     touchEndX = e.changedTouches[0].screenX;
//     if (touchStartX - touchEndX > 50) nextImage();
//     if (touchEndX - touchStartX > 50) prevImage();
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* IMAGE SLIDER */}
//         <div className="relative">
//           <div className="relative w-full h-[500px] rounded-lg shadow-md">
//             <img
//               src={images[activeImage]}
//               alt={product.name}
//               className="w-full h-full object-cover rounded-lg transition-all duration-500"
//               onTouchStart={handleTouchStart}
//               onTouchEnd={handleTouchEnd}
//             />

//             {images.length > 1 && (
//               <div className="absolute inset-0 flex items-center justify-between px-2">
//                 <button
//                   onClick={prevImage}
//                   className="bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
//                 >
//                   {"<"}
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
//                 >
//                   {">"}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Thumbnails */}
//           <div className="flex mt-4 space-x-3 overflow-x-auto">
//             {images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`thumb-${index}`}
//                 className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
//                   index === activeImage ? "border-black" : "border-transparent"
//                 }`}
//                 onClick={() => setActiveImage(index)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* PRODUCT INFO */}
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>

//           <p className="text-gray-500 text-sm mt-1">
//             Product Code:{" "}
//             <span className="font-mono">{product.code || product.id}</span>
//           </p>

//           {product.salePrice ? (
//             <div className="mt-4">
//               <span className="text-2xl font-bold text-green-700">
//                 Rs {product.salePrice.toLocaleString()}
//               </span>
//               <span className="line-through text-gray-500 ml-3">
//                 Rs {product.price.toLocaleString()}
//               </span>
//               <span className="text-sm text-red-600 ml-3">{discount}% OFF</span>
//             </div>
//           ) : (
//             <div className="mt-4 text-2xl font-bold">
//               Rs {product.price.toLocaleString()}
//             </div>
//           )}

//           {/* <p className="mt-3 text-blue-600 font-semibold">
//             Available Quantity: {stock}
//           </p> */}
//           <p
//   className={`mt-3 font-semibold ${
//     stock > 0 ? "text-green-600" : "text-red-600"
//   }`}
// >
//   {stock > 0 ? "In Stock" : "Out of Stock"}
// </p>


//           {product.sizes && product.sizes.length > 0 && (
//             <div className="mt-4">
//               <label className="text-gray-700 font-medium block mb-2">
//                 Select Size:
//               </label>
//               <div className="flex space-x-3">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 py-2 border rounded ${
//                       selectedSize === size
//                         ? "bg-black text-white"
//                         : "bg-white text-black border-gray-400"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {stock > 0 && (
//             <div className="mt-4 flex items-center space-x-3">
//               <label className="text-gray-700 font-medium">Quantity:</label>
//               <input
//                 type="number"
//                 min="1"
//                 max={stock}
//                 value={quantity}
//                 onChange={(e) => onQtyChange(e.target.value)}
//                 className="w-20 border rounded px-2 py-1"
//               />
//             </div>
//           )}

//           {/* <div className="mt-6 flex space-x-4">
//             <button
//               onClick={handleAddToCart}
//               className="px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="px-6 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition"
//             >
//               Buy Now
//             </button>
//           </div> */}
//           <div className="mt-6 flex space-x-4">
//   <button
//     onClick={handleAddToCart}
//     disabled={stock <= 0}
//     className={`px-6 py-2 rounded cursor-pointer transition ${
//       stock > 0
//         ? "bg-blue-600 text-white hover:bg-blue-700"
//         : "bg-gray-400 text-gray-200 cursor-not-allowed"
//     }`}
//   >
//     Add to Cart
//   </button>
//   <button
//     onClick={handleBuyNow}
//     disabled={stock <= 0}
//     className={`px-6 py-2 rounded cursor-pointer transition ${
//       stock > 0
//         ? "bg-green-600 text-white hover:bg-green-700"
//         : "bg-gray-400 text-gray-200 cursor-not-allowed"
//     }`}
//   >
//     Buy Now
//   </button>
// </div>


//           <div className="mt-6">
//             <h2 className="text-lg font-semibold">Product Description</h2>
//             {Array.isArray(product.description) ? (
//               product.description.map((section, index) => (
//                 <div key={index} className="mt-4">
//                   <h3 className="text-md font-semibold text-gray-800">
//                     {section.heading}
//                   </h3>
//                   <ul className="list-disc list-inside text-gray-600 space-y-1 mt-1">
//                     {section.points.map((point, i) => (
//                       <li key={i}>{point}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))
//             ) : (
//               <p className="mt-2 text-gray-600">
//                 {product.description || "No description available."}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ✅ REVIEWS SECTION */}
//       <div className="mt-12">
//         <Review productId={product.id} />
//       </div>
//     </div>
//   );
// }







