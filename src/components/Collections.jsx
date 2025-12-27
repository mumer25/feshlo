import { useEffect } from "react";
import { collections } from "../data/collections";
import { Link, useLocation } from "react-router-dom";

export default function Collections() {
  const { pathname } = useLocation();

  // 👇 Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="max-w-6xl mx-auto px-4 my-12">
      <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link
            key={col.id}
            to={`/collection/${col.slug}`}
            className="group relative rounded-2xl overflow-hidden border block"
          >
            <img
              src={col.image}
              alt={col.name}
              className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              {col.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}




// import { collections } from '../data/collections';
// import { Link } from 'react-router-dom';

// export default function Collections() {
//   return (
//     <section className="max-w-6xl mx-auto px-4 my-12">
//       <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {collections.map(col => (
//           <Link
//             key={col.id}
//             to={`/collection/${col.slug}`}
//             className="group relative rounded-2xl overflow-hidden border block"
//           >
//             <img
//               src={col.image}
//               alt={col.name}
//               className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//             <div className="absolute inset-0 bg-black/30" />
//             <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
//               {col.name}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }



// import { collections } from '../data/collections';
// import { Link } from 'react-router-dom';

// export default function Collections() {
//   return (
//     <section className="max-w-6xl mx-auto px-4 my-12">
//       <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
      
//       {/* Horizontal scroll wrapper */}
//       <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 custom-scroll">
//         {collections.map(col => (
//           <Link
//             key={col.id}
//             to={`/collection/${col.slug}`}
//             className="group relative min-w-[220px] sm:min-w-[280px] rounded-2xl overflow-hidden border flex-shrink-0"
//           >
//             <img
//               src={col.image}
//               alt={col.name}
//               className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//             <div className="absolute inset-0 bg-black/30" />
//             <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
//               {col.name}
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Internal CSS */}
//       <style>
//         {`
//           .custom-scroll::-webkit-scrollbar {
//             display: none;
//           }
//           .custom-scroll {
//             -ms-overflow-style: none;  /* IE and Edge */
//             scrollbar-width: none;     /* Firefox */
//           }
//         `}
//       </style>
//     </section>
//   );
// }

