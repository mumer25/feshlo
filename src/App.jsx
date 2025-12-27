import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import OrderSuccess from './pages/OrderSuccess';
import Admin from './pages/Admin';
import CollectionPage from './pages/CollectionPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage'; // ⬅️ Import
import Checkout from './pages/Checkout';
import DeliveryProcess from './components/DeliveryProcess';
import ReturnPolicy from './components/ReturnPolicy';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Announcement */}
      <AnnouncementBar />

      {/* Navigation Bar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/admin" element={<Admin />} />

          {/* Dynamic Pages */}
          <Route path="/collection/:slug" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Cart Page */}
          <Route path="/cart" element={<CartPage />} />

          {/* CheckOut Page */}
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/delivery-process" element={<DeliveryProcess />} />
<Route path="/return-policy" element={<ReturnPolicy />} />
        </Routes>
      </main>
      
     
      {/* Footer */}
      <Footer />
    </div>
  );
}
