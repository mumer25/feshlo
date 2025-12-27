// src/pages/Shop.jsx
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";

export default function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchQuery = queryParams.get("search") || "";
  const category = queryParams.get("category") || ""; // ✅ get category from URL
  const collection = queryParams.get("collection") || "";

  return <ProductList showTitle={false} searchQuery={searchQuery} collection={collection} category={category}   />;
}



// // Shop.jsx
// import { useLocation } from "react-router-dom";
// import ProductList from "../components/ProductList";

// export default function Shop() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("search") || "";

//   return <ProductList showTitle={false} searchQuery={searchQuery} />;
// }

// import ProductList from '../components/ProductList';
// export default function Shop(){ return <ProductList showTitle={false} />; }
