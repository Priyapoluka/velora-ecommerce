"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

export default function Home() {
  const [cartItems, setCartItems] = useState<string[]>([]);
const [wishlist, setWishlist] = useState<string[]>([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [cartOpen, setCartOpen] = useState(false);
const [wishlistOpen, setWishlistOpen] = useState(false);
const [showPayment, setShowPayment] = useState(false);
const [paymentMethod, setPaymentMethod] = useState("");

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

  const handlePayment = () => {
  if (!paymentMethod) {
    alert("Select a payment method");
    return;
  }

  const newOrder = {
  items: cartItems,
  total: totalPrice,
  payment: paymentMethod,
  date: new Date().toLocaleString(),
};

const existingOrders = JSON.parse(
  localStorage.getItem("orders") || "[]"
);

localStorage.setItem(
  "orders",
  JSON.stringify([...existingOrders, newOrder])
);
  alert(
    `🎉 Order Placed Successfully!\n\nPayment: ${paymentMethod}\nTotal: ₹${totalPrice}`
  );

  setCartItems([]);
  localStorage.removeItem("cartItems");

  setCartItems([]);
  localStorage.removeItem("cartItems");
  setPaymentMethod("");
  setShowPayment(false);
  setCartOpen(false);
 };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50">

 <nav className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-md flex justify-between items-center">

  <h1 className="text-3xl font-bold">
    Velora ✨
  </h1>

  <div className="flex items-center gap-6">
    
    <button
      onClick={() => setWishlistOpen(true)}
      className="relative text-3xl"
    >
      ❤️
      <span className="absolute -top-3 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
        {wishlist.length}
      </span>
    </button>

    <button
      onClick={() => setCartOpen(true)}
      className="relative text-3xl"
    >
      🛒
      <span className="absolute -top-3 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
        {cartItems.length}
      </span>
    </button>

    <UserButton />

<Link
  href="/about"
  className="text-lg hover:text-pink-200"
>
  About
</Link>

<Link
  href="/contact"
  className="text-lg hover:text-pink-200"
>
  Contact
</Link>
<Link
  href="/orders"
  className="text-lg hover:text-pink-200"
>
  Orders
</Link>
  </div>

</nav>


{/* Wishlist Drawer */}
{wishlistOpen && (
  <div className="fixed inset-0 bg-black/40 z-50">
    <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pink-700">
          Wishlist ❤️
        </h2>

        <button
          onClick={() => setWishlistOpen(false)}
          className="text-xl"
        >
          ✖
        </button>
      </div>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-b py-3"
          >
            <span>{item}</span>

            <button
              onClick={() => removeFromWishlist(item)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  </div>
)}
      
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
<Link
  href={`/products/${index}`}
  className="text-pink-500 underline"
>
  View Details
</Link>

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

{/* Cart Drawer */}
{cartOpen && (
  <div className="fixed inset-0 bg-black/40 z-50">
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pink-700">
          My Cart 🛒
        </h2>

        <button
          onClick={() => setCartOpen(false)}
          className="text-xl"
        >
          ✖
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-3"
            >
              <span>{item}</span>

              <button
                onClick={() => removeFromCart(item)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6">
  <p className="text-lg font-bold text-pink-700">
    Total: ₹{totalPrice}
  </p>

  <button
    onClick={() => setShowPayment(true)}
    className="w-full mt-4 bg-pink-500 text-white py-3 rounded-lg"
  >
    Proceed to Checkout 💳
  </button>
</div>

  </>
)}

{showPayment && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl w-96 shadow-xl">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">
        Payment Method 💳
      </h2>

      <div className="space-y-3">

        <label className="flex gap-2">
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          UPI
        </label>

        <label className="flex gap-2">
          <input
            type="radio"
            name="payment"
            value="Credit/Debit Card"
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Credit / Debit Card
        </label>

        <label className="flex gap-2">
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          />
          Cash on Delivery
        </label>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => setShowPayment(false)}
          className="flex-1 border border-pink-500 text-pink-500 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handlePayment}
          className="flex-1 bg-pink-500 text-white py-2 rounded-lg"
        >
          Pay Now
        </button>

      </div>
    </div>
  </div>
)}
    </div>
  </div>
)}
      
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