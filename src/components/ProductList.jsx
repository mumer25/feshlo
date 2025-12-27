// src/components/ProductList.jsx
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import OrderModal from "./OrderModal";
import Review from "./Review"; // Import Review component

export default function ProductList({
  showTitle = true,
  searchQuery = "",
  collection = "",
  category = "",
}) {
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products per page

  // ✅ Filter products based on search query, collections, and categories
  const filteredProducts = products.filter((p) => {
  const matchesSearch = p.name
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  // ✅ Handle collection (array OR string)
  const matchesCollection = collection
    ? Array.isArray(p.collections)
      ? p.collections.some((c) => c.toLowerCase() === collection.toLowerCase())
      : p.collection &&
        p.collection.toLowerCase() === collection.toLowerCase()
    : true;

  // ✅ Handle category (array OR string)
  const matchesCategory = category
    ? Array.isArray(p.categories)
      ? p.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
      : p.category &&
        p.category.toLowerCase() === category.toLowerCase()
    : true;

  return matchesSearch && matchesCollection && matchesCategory;
});


  // ✅ Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="max-w-6xl mx-auto px-4 my-12">
      {showTitle && (
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          All Products
        </h2>
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <>
          {/* ✅ Show paginated products */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((p) => (
              <ProductCard key={p.id} product={p} onOrder={setSelected} />
            ))}
          </div>

          {/* ✅ Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1 cursor-pointer border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 cursor-pointer border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {selected && (
        <OrderModal product={selected} onClose={() => setSelected(null)} />
      )}

      {/* ✅ Reviews Section */}
      <div className="mt-20">
        <Review />
      </div>
    </section>
  );
}



// // src/components/ProductList.jsx
// import { useState } from "react";
// import { products } from "../data/products";
// import ProductCard from "./ProductCard";
// import OrderModal from "./OrderModal";
// import Review from "./Review"; // Import Review component

// export default function ProductList({
//   showTitle = true,
//   searchQuery = "",
//   collection = "",
//   category = "",
// }) {
//   const [selected, setSelected] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 12; // Number of products per page

//   // ✅ Filter products based on search query, collection, and category
//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesCollection = collection
//       ? p.collection.toLowerCase() === collection.toLowerCase()
//       : true;
//     const matchesCategory = category
//       ? p.category.toLowerCase() === category.toLowerCase()
//       : true;

//     return matchesSearch && matchesCollection && matchesCategory;
//   });

//   // ✅ Pagination logic
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   return (
//     <section className="max-w-6xl mx-auto px-4 my-12">
//       {showTitle && (
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//           All Products
//         </h2>
//       )}

//       {filteredProducts.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <>
//           {/* ✅ Show paginated products */}
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentProducts.map((p) => (
//               <ProductCard key={p.id} product={p} onOrder={setSelected} />
//             ))}
//           </div>

//           {/* ✅ Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-8 space-x-2">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((prev) => prev - 1)}
//                 className="px-3 py-1 cursor-pointer border rounded disabled:opacity-50"
//               >
//                 Prev
//               </button>

//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 border rounded ${
//                     currentPage === i + 1
//                       ? "bg-gray-800 text-white"
//                       : "bg-white text-gray-700"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((prev) => prev + 1)}
//                 className="px-3 py-1 cursor-pointer border rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {selected && (
//         <OrderModal product={selected} onClose={() => setSelected(null)} />
//       )}

//       {/* ✅ Reviews Section */}
//       <div className="mt-20">
//         <Review />
//       </div>
//     </section>
//   );
// }


// // ProductList.jsx
// import { useState } from "react";
// import { products } from "../data/products";
// import ProductCard from "./ProductCard";
// import OrderModal from "./OrderModal";
// import Review from "./Review"; // Import Review component

// export default function ProductList({
//   showTitle = true,
//   searchQuery = "",
//   collection = "",
//   category = "",
// }) {
//   const [selected, setSelected] = useState(null);

//   // Filter products based on search query, collection, and category
//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesCollection = collection
//       ? p.collection.toLowerCase() === collection.toLowerCase()
//       : true;
//     const matchesCategory = category
//       ? p.category.toLowerCase() === category.toLowerCase()
//       : true;

//     return matchesSearch && matchesCollection && matchesCategory;
//   });

//   return (
//     <section className="max-w-6xl mx-auto px-4 my-12">
//       {showTitle && (
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Products</h2>
//       )}

//       {filteredProducts.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProducts.map((p) => (
//             <ProductCard key={p.id} product={p} onOrder={setSelected} />
//           ))}
//         </div>
//       )}

//       {selected && <OrderModal product={selected} onClose={() => setSelected(null)} />}

//       {/* Reviews Section */}
//       <div className="mt-20">
//         <Review />
//       </div>
//     </section>
//   );
// }


