"use client";
import React, { useEffect, useState } from "react";

// Type for a product
interface Product {
  productName: string;
  description: string;
  price: string;
  category: string;
  imageUrl?: string; // base64 string
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  // Load products from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("products");
      if (stored) setProducts(JSON.parse(stored));
    }
  }, []);

  // Filter products by name
  const filtered = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">All Products</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((product, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-2 px-4">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="w-16 h-16 object-cover rounded shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 font-semibold">{product.productName}</td>
                  <td className="py-2 px-4">{product.description}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4">{product.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
