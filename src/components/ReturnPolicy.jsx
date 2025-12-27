export default function ReturnPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Return & Exchange Policy
      </h1>
      <p className="text-gray-600 mb-4">
        At <span className="font-semibold">Feshlo</span>, customer satisfaction is our top priority. If you are not fully satisfied with your purchase, we are here to help.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Eligibility for Returns</h2>
      <p className="text-gray-600 mb-4">
        You can return or exchange items within <span className="font-semibold">3 days</span> of delivery if they meet the following conditions:
      </p>
      <ul className="list-disc pl-6 text-gray-600 mb-4">
        <li>Item is unused, unworn, and in original condition.</li>
        <li>Item includes all original packaging and tags.</li>
        <li>Proof of purchase (order ID or receipt) is provided.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Non-Returnable Items</h2>
      <p className="text-gray-600 mb-4">
        For hygiene and safety reasons, certain items such as innerwear, accessories, and clearance sale items cannot be returned.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Return Process</h2>
      <p className="text-gray-600 mb-4">
        To initiate a return, please contact us at{" "}
        <a href="mailto:feshloofficial@gmail.com" className="text-blue-600 hover:underline">
          feshloofficial@gmail.com
        </a>{" "}
        or call us at{" "}
        <a href="tel:+923229199459" className="text-blue-600 hover:underline">
          +92 322 9199459
        </a>. Our support team will guide you through the process.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Refunds & Exchanges</h2>
      <p className="text-gray-600 mb-4">
        - Exchanges are subject to product availability. <br/>
        - Refunds will be issued via the original payment method or as store credit. <br />
        - Return shipping costs are the responsibility of the customer unless the return is due to our error.
      </p>

      <p className="text-gray-700 mt-6 font-medium">
        ✅ Shop with confidence – Feshlo ensures a worry-free return and exchange process.
      </p>
    </div>
  );
}
