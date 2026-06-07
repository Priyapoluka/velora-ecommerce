"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const products = [
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
  {
  name: "Hair Growth Serum",
  price: 599,
  image: "/products/hair-care.jpg",
  category: "Hair Care",
  rating: 4.7,
},

{
  name: "Vanilla Body Wash",
  price: 449,
  image: "/products/vanilla-bodywash.jpg",
  category: "Body Wash",
  rating: 4.8,
},

{
  name: "Rose Body Wash",
  price: 399,
  image: "/products/rose-bodywash.jpg",
  category: "Body Wash",
  rating: 4.7,
},

{
  name: "Rosemary Hair Growth Serum",
  price: 599,
  image: "/products/hairr-care.jpg",
  category: "Hair Care",
  rating: 4.9,
},

{
  name: "Onion Hair Oil",
  price: 499,
  image: "/products/onion-hair-oil.jpg",
  category: "Hair Care",
  rating: 4.8,
},

{
  name: "Strawberry Lip Balm",
  price: 249,
  image: "/products/strawberry-lipbalm.jpg",
  category: "Lip Care",
  rating: 4.8,
},

{
  name: "Cherry Lip Gloss",
  price: 349,
  image: "/products/cherry-lipgloss.jpg",
  category: "Lip Care",
  rating: 4.7,
},
{
  name: "Coffee Body Scrub",
  price: 549,
  image: "/products/coffee.jpg",
  category: "Body Wash",
  rating: 4.9,
},
{
  name: "Lip Care Combo",
  price: 599,
  image: "/products/lip-combo.jpg",
  category: "Combos",
  rating: 4.8,
},

{
  name: "Hair Growth Combo",
  price: 999,
  image: "/products/hair-combo.jpg",
  category: "Combos",
  rating: 4.9,
},

{
  name: "Body Care Combo",
  price: 1099,
  image: "/products/body-combo.jpg",
  category: "Combos",
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
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50">
      <nav className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">
  Velora ✨
</h1>

        <div className="flex items-center gap-6 text-2xl">

  <button className="relative">
    ❤️
    <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-2 rounded-full">
      {wishlist.length}
    </span>
  </button>

  <button className="relative">
    🛒
    <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-2 rounded-full">
      {cartItems.length}
    </span>
  </button>

</div>
      </nav>


{/* Hero Banner */}
<section className="bg-gradient-to-r from-pink-200 to-purple-200 py-16 text-center">
  <h2 className="text-6xl font-bold text-pink-700 mb-4">
    Glow Naturally ✨
  </h2>

  <p className="text-xl text-pink-800 mb-6">
    Premium Beauty & Skincare Products
  </p>

  <button className="bg-pink-500 text-white px-8 py-3 rounded-xl">
    Shop Now
  </button>
</section>



      <section className="text-center py-12">
        <h2 className="text-5xl font-bold text-pink-700 mb-4">
          Welcome to Velora ✨
        </h2>

        <p className="text-lg text-pink-800">
          Discover skincare, beauty & self-care essentials
        </p>
      </section>

      {/* Search */}
      <div className="mx-8 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 text-pink-800 placeholder-pink-500"
        />
      </div>

      <section className="px-8 py-12">
  <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">
  Shop By Category 💖
</h2>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6 my-10">

  {/* All Products */}
  <div
    onClick={() => setCategory("All")}
    className="text-center cursor-pointer hover:scale-105 transition"
  >
    <div className="h-48 rounded-3xl bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
      <span className="text-white text-3xl font-bold">
        All
      </span>
    </div>

    <h3 className="text-2xl font-bold text-pink-700 mt-3">
      All Products
    </h3>
  </div>
  
  {/* Skincare */}
  <div
  onClick={() => setCategory("Skincare")}
  className="text-center cursor-pointer hover:scale-105 transition"
>
    <img
      src="/products/skincare.jpg"
      alt="Skincare"
      className="w-full h-48 object-cover rounded-3xl"
    />
    <h3 className="text-2xl font-bold text-pink-700 mt-3">
      Skincare
    </h3>
  </div>

  {/* Lip Care */}
  <div
  onClick={() => setCategory("Lip Care")}
  className="text-center cursor-pointer hover:scale-105 transition"
>
    <img
      src="/products/lipcare.jpg"
      alt="Lip Care"
      className="w-full h-48 object-cover rounded-3xl"
    />
    <h3 className="text-2xl font-bold text-pink-700 mt-3">
      Lip Care
    </h3>
  </div>

  {/* Hair Care */}
  <div
  onClick={() => setCategory("Hair Care")}
  className="text-center cursor-pointer hover:scale-105 transition"
>
    <img
      src="/products/haircare.jpg"
      alt="Hair Care"
      className="w-full h-48 object-cover rounded-3xl"
    />
    <h3 className="text-2xl font-bold text-pink-700 mt-3">
      Hair Care
    </h3>
  </div>

  {/* Body Wash */}
  <div
  onClick={() => setCategory("Body Wash")}
  className="text-center cursor-pointer hover:scale-105 transition"
>
    <img
      src="/products/bodywash.jpg"
      alt="Body Wash"
      className="w-full h-48 object-cover rounded-3xl"
    />
    <h3 className="text-2xl font-bold text-pink-700 mt-3">
      Body Wash
    </h3>
  </div>

  {/* Combos */}
  <div
  onClick={() => setCategory("Combos")}
  className="text-center cursor-pointer hover:scale-105 transition"
>
    <img
      src="/products/combo.jpg"
      alt="Combos"
      className="w-full h-48 object-cover rounded-3xl"
    />
    <h3 className="text-2xl font-bold text-pink-700 mt-3">
      Combos
    </h3>
  </div>
</div>

</section>

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
              className="bg-pink-50 mb-6 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
            >
              <img
  src={product.image}
  alt={product.name}
  className="w-full h-48 object-cover rounded-lg mb-4"
/>

<span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs">
  🔥 Bestseller
</span>

<h3 className="text-xl font-bold text-pink-700 mt-3">
  {product.name}
</h3>

<p className="text-pink-500 font-medium">
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
                🛒 Add to Cart
              </button>

              <button
                onClick={() => addToWishlist(product.name)}
                className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90"
              >
                ❤️ Add to Wishlist
              </button>
            </div>
          ))}
              </div>

      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-8">
        <h2 className="text-2xl font-bold mb-3">
          Velora ✨
        </h2>

        <p>Beauty • Skincare • Self Care</p>

        <div className="mt-4 space-y-1">
          <p>Shop</p>
          <p>About</p>
          <p>Contact</p>
          <p>Privacy Policy</p>
        </div>

        <p className="mt-6">
          © 2026 Velora. All Rights Reserved.
        </p>
      </footer>

    </main>
  );
}