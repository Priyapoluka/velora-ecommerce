"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const products: {
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}[] = [
  {
    name: "Vitamin C Serum",
    price: 799,
    image: "/products/serum.jpg",
    category: "Skincare",
    rating: 4.8,
  },
  {
    name: "Aloe Vera Gel",
    price: 349,
    image: "/products/aloe_vera_gel.jpg",
    category: "Skincare",
    rating: 4.6,
  },
  {
    name: "Niacinamide Serum",
    price: 699,
    image: "/products/niacinamide-serum.jpg",
    category: "Skincare",
    rating: 4.7,
  },
  {
    name: "Moisturizer",
    price: 549,
    image: "/products/moisturizer.jpg",
    category: "Skincare",
    rating: 4.5,
  },
  {
    name: "Hydrating Face Cream",
    price: 699,
    image: "/products/cream.jpg",
    category: "Face Care",
    rating: 4.9,
  },
  {
    name: "Lip Balm",
    price: 299,
    image: "/products/lipbalm.jpg",
    category: "Lip Care",
    rating: 4.4,
  },
  {
    name: "Tinted Lip Gloss",
    price: 399,
    image: "/products/tinted-lip-gloss.jpg",
    category: "Lip Care",
    rating: 4.7,
  },
  {
    name: "Sunscreen SPF 50",
    price: 499,
    image: "/products/sunscreen.jpg",
    category: "Sun Care",
    rating: 4.8,
  },
];

const totalPrice = cartItems.reduce((total, item) => {
  const product = products.find((p) => p.name === item);
  return total + (product?.price || 0);
}, 0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (productName: string) => {
    setCartItems([...cartItems, productName]);
  };

  const removeFromCart = (itemToRemove: string) => {
    setCartItems(
      cartItems.filter((item) => item !== itemToRemove)
    );
  };

  const addToWishlist = (productName: string) => {
    if (!wishlist.includes(productName)) {
      setWishlist([...wishlist, productName]);
    }
  };

  const removeFromWishlist = (productName: string) => {
    setWishlist(
      wishlist.filter((item) => item !== productName)
    );
  };

  const placeOrder = () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert(
    `Order placed successfully!\n\nItems: ${cartItems.length}\nTotal: ₹${totalPrice}`
  );

  setCartItems([]);
  localStorage.removeItem("cartItems");
};

  return (
    <main className="min-h-screen bg-pink-50">
      <nav className="bg-pink-500 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">Velora ✨</h1>

        <div className="bg-white text-pink-600 px-4 py-2 rounded-full font-bold">
          🛒 {cartItems.length}
        </div>
      </nav>

      <section className="text-center py-12">
        <h2 className="text-5xl font-bold text-pink-700 mb-4">
          Welcome to Velora ✨
        </h2>

        <p className="text-lg text-pink-800">
          Discover skincare, beauty & self-care essentials
        </p>
      </section>

      {/* Cart */}
      <div className="bg-white mx-8 mb-6 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          🛒 Cart ({cartItems.length})
        </h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item}</span>

                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Checkout */}
<div className="bg-white mx-8 mb-6 p-6 rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold mb-4">
    🧾 Checkout
  </h2>

  <p className="text-lg mb-2">
    Total Items: {cartItems.length}
  </p>

  <p className="text-xl font-bold text-pink-600 mb-4">
    Total Amount: ₹{totalPrice}
  </p>

  <button
    onClick={placeOrder}
    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
  >
    Place Order
  </button>
</div>

      {/* Wishlist */}
      <div className="bg-white mx-8 mb-6 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          ❤️ Wishlist ({wishlist.length})
        </h2>

        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul className="space-y-3">
            {wishlist.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item}</span>

                <button
                  onClick={() => removeFromWishlist(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search */}
      <div className="mx-8 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border rounded-xl"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mx-8 mb-8">
        <button
          onClick={() => setCategory("All")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          All
        </button>

        <button
          onClick={() => setCategory("Skincare")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Skincare
        </button>

        <button
          onClick={() => setCategory("Face Care")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Face Care
        </button>

        <button
          onClick={() => setCategory("Lip Care")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Lip Care
        </button>

        <button
          onClick={() => setCategory("Sun Care")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Sun Care
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          )
          .filter((product) =>
            category === "All"
              ? true
              : product.category === category
          )
          .map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold">
                {product.name}
              </h3>

              <p className="text-gray-500">
  {product.category}
</p>

<p className="text-yellow-500 font-semibold">
  ⭐ {product.rating}
</p>

<p className="text-pink-600 font-bold my-2">
  ₹{product.price}
</p>

              <button
                onClick={() => addToCart(product.name)}
                className="w-full bg-pink-500 text-white py-2 rounded-lg"
              >
                Add to Cart
              </button>

              <button
                onClick={() => addToWishlist(product.name)}
                className="w-full mt-2 bg-purple-500 text-white py-2 rounded-lg"
              >
                ❤️ Add to Wishlist
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}