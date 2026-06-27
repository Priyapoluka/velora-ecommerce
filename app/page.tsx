"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  

  const [cartItems, setCartItems] = useState<
    { name: string; quantity: number }[]
  >([]);

  const [addedCart, setAddedCart] = useState<string[]>([]);

const [wishlist, setWishlist] = useState<string[]>([]);
const [wishlistLoaded, setWishlistLoaded] = useState(false);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [cartOpen, setCartOpen] = useState(false);
const [cartLoaded, setCartLoaded] = useState(false);
const [showPayment, setShowPayment] = useState(false);
const [paymentMethod, setPaymentMethod] = useState("");
const [toast, setToast] = useState("");

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
  const product = products.find(
    (p) => p.name === item.name
  );

  return (
    total +
    (product?.price || 0) * item.quantity
  );
}, 0);

  useEffect(() => {
  const savedCart = localStorage.getItem("cartItems");

  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }

  setCartLoaded(true);
}, []);

  
  useEffect(() => {
  if (cartLoaded) {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }
}, [cartItems, cartLoaded]);

  const showToast = (message: string) => {
  setToast(message);

  setTimeout(() => {
    setToast("");
  }, 2000);
};

  const addToCart = (productName: string) => {
  if (!isSignedIn) {
    showToast("🔒 Please login first");
    return;
  }

  setCartItems((prev) => {
    const existing = prev.find(
      (item) => item.name === productName
    );

    if (existing) {
      return prev.map((item) =>
        item.name === productName
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...prev,
      {
        name: productName,
        quantity: 1,
      },
    ];
  });

  if (!addedCart.includes(productName)) {
    setAddedCart((prev) => [...prev, productName]);
  }
  showToast("🛒 Added to Cart");
};

const removeFromCart = (productName: string) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.name === productName
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const increaseQuantity = (productName: string) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.name === productName
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
};

const addToWishlist = (productName: string) => {
  if (!isSignedIn) {
    router.push("/sign-in");
    return;
  }

  if (wishlist.includes(productName)) {
    const updatedWishlist = wishlist.filter(
      (item) => item !== productName
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    showToast("💔 Removed from Wishlist");
  } else {
    const updatedWishlist = [...wishlist, productName];

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    showToast("❤️ Added to Wishlist");
  }
};
 useEffect(() => {
  const savedWishlist = localStorage.getItem("wishlist");

  if (savedWishlist) {
    setWishlist(JSON.parse(savedWishlist));
  }

  setWishlistLoaded(true);
}, []);

useEffect(() => {
  if (wishlistLoaded) {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }
}, [wishlist, wishlistLoaded]);

  const handlePayment = () => {
  if (!paymentMethod) {
showToast("⚠️ Select a payment method");    return;
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
  showToast("🎉 Order Placed Successfully");
  router.push("/success");
  setCartItems([]);
  localStorage.removeItem("cartItems");

 
  setPaymentMethod("");
  setShowPayment(false);
  setCartOpen(false);
 };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50">

      {toast && (
  <div
  className="
  fixed
  top-6
  right-6
  z-[9999]
  bg-gradient-to-r
  from-pink-500
  to-purple-500
  text-white
  px-6
  py-4
  rounded-2xl
  shadow-2xl
  animate-bounce
  font-semibold
"
>
    {toast}
  </div>
)}

<nav className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-md">
  <div className="flex justify-between items-center">
    <h1 className="text-2xl md:text-3xl font-bold">
      Velora ✨
    </h1>

    <div className="flex items-center gap-4">
      <button
        onClick={() => setCartOpen(true)}
        className="relative text-3xl"
      >
        🛒
        <span className="absolute -top-3 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
          {cartItems.length}
        </span>
      </button>

      {isSignedIn ? (
        <Link
          href="/profile"
          className="text-base md:text-lg hover:text-pink-200"
        >
          👤 Profile
        </Link>
      ) : (
        <div className="flex gap-2">
          <SignInButton mode="modal">
            <button className="bg-white text-pink-600 px-3 md:px-4 py-2 rounded-lg font-semibold text-sm md:text-base">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-pink-700 text-white px-3 md:px-4 py-2 rounded-lg font-semibold text-sm md:text-base">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      )}
    </div>
  </div>
</nav>

      
{/* Hero Banner */}


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
          className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 text-pink-800 placeholder-pink-500"
        />
      </div>

{search.trim() === "" && (
  <section className="px-4 md:px-8 py-12">
    <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">
      Shop By Category 💖
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 my-10">
      {/* All Products */}
      <div
        onClick={() => setCategory("All")}
        className="text-center cursor-pointer hover:scale-105 hover:-translate-y-2 transition"
      >
        <div className="h-48 rounded-3xl bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">
            All
          </span>
        </div>

        <h3 className="text-lg md:text-2xl font-bold text-pink-700 mt-3">
          All Products
        </h3>
      </div>

      {/* Skincare */}
      <div
        onClick={() => setCategory("Skincare")}
        className="text-center cursor-pointer hover:scale-105 hover:-translate-y-2 transition"
      >
        <img
          src="/products/skincare.jpg"
          alt="Skincare"
          className="w-full h-36 md:h-48 object-cover rounded-3xl"
        />
        <h3 className="text-lg md:text-2xl font-bold text-pink-700 mt-3">
          Skincare
        </h3>
      </div>

      {/* Lip Care */}
      <div
        onClick={() => setCategory("Lip Care")}
        className="text-center cursor-pointer hover:scale-105 hover:-translate-y-2 transition"
      >
        <img
          src="/products/lipcare.jpg"
          alt="Lip Care"
          className="w-full h-36 md:h-48 object-cover rounded-3xl"
        />
        <h3 className="text-lg md:text-2xl font-bold text-pink-700 mt-3">
          Lip Care
        </h3>
      </div>

      {/* Hair Care */}
      <div
        onClick={() => setCategory("Hair Care")}
        className="text-center cursor-pointer hover:scale-105 hover:-translate-y-2 transition"
      >
        <img
          src="/products/haircare.jpg"
          alt="Hair Care"
          className="w-full h-36 md:h-48 object-cover rounded-3xl"
        />
        <h3 className="text-lg md:text-2xl font-bold text-pink-700 mt-3">
          Hair Care
        </h3>
      </div>

      {/* Body Wash */}
      <div
        onClick={() => setCategory("Body Wash")}
        className="text-center cursor-pointer hover:scale-105 hover:-translate-y-2 transition"
      >
        <img
          src="/products/bodywash.jpg"
          alt="Body Wash"
          className="w-full h-36 md:h-48 object-cover rounded-3xl"
        />
        <h3 className="text-lg md:text-2xl font-bold text-pink-700 mt-3">
          Body Wash
        </h3>
      </div>

      {/* Combos */}
      <div
        onClick={() => setCategory("Combos")}
        className="text-center cursor-pointer hover:scale-105 hover:-translate-y-2 transition"
      >
        <img
          src="/products/combo.jpg"
          alt="Combos"
          className="w-full h-36 md:h-48 object-cover rounded-3xl"
        />
        <h3 className="text-lg md:text-2xl font-bold text-pink-700 mt-3">
          Combos
        </h3>
      </div>
    </div>
  </section>
)}

{/* Products */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-8">
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
        key={index}className="bg-pink-50 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out"
        
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover rounded-lg mb-4"
        />

        {search.trim() !== "" && (
  <div className="px-4 md:px-8 mt-6 mb-2">
    <h2 className="text-3xl font-bold text-pink-700">
      🔍 Search Results for "{search}"
    </h2>

    <p className="text-gray-500 mt-2">
      {
        products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(search.toLowerCase())
        ).length
      } products found
    </p>
  </div>
)}

      
        <h3 className="text-lg md:text-xl font-bold text-pink-700 mt-3">
          {product.name}
        </h3>

        <p className="text-pink-500 font-medium">
          {product.category}
        </p>

        <p className="text-yellow-500 font-semibold">
          ⭐ {product.rating}
        </p>

        <p className="text-lg md:text-xl text-pink-600 font-bold my-2">
          ₹{product.price}
        </p>

        {cartItems.find((item) => item.name === product.name) ? (
  <div className="w-full flex items-center justify-between bg-pink-100 rounded-lg mt-2">
    <button
      onClick={() => removeFromCart(product.name)}
      className="px-4 py-2 text-pink-700 font-bold"
    >
      -
    </button>

    <span className="font-bold text-pink-700">
      {
        cartItems.find((item) => item.name === product.name)
          ?.quantity
      }
    </span>

    <button
      onClick={() => increaseQuantity(product.name)}
      className="px-4 py-2 text-pink-700 font-bold"
    >
      +
    </button>
  </div>
) : (
  <button
    onClick={() => addToCart(product.name)}
    className="w-full py-2 rounded-lg bg-pink-500 text-white"
  >
     Add to Cart 🛒
  </button>
)}

        <button
          onClick={() => addToWishlist(product.name)}
          className={`w-full mt-2 py-2 rounded-lg text-white transition ${
            wishlist.includes(product.name)
              ? "bg-red-500"
              : "bg-gradient-to-r from-pink-500 to-purple-500"
          }`}
        >
          {wishlist.includes(product.name)
            ? "❤️ Wishlisted"
            : "🤍 Add to Wishlist"}
        </button>
      </div>
    ))}
</div>



{/* Cart Drawer */}
{cartOpen && (
  <div className="fixed inset-0 bg-black/40 z-50">
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl p-6 overflow-y-auto">
      
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
  <div className="text-center py-10">
    <div className="text-6xl mb-4">🛒</div>

    <h3 className="text-xl font-bold text-pink-700">
      Your Cart is Empty
    </h3>

    <p className="text-gray-500 mt-2">
      Looks like you haven't added anything yet.
    </p>

    <button
      onClick={() => setCartOpen(false)}
      className="mt-5 bg-pink-500 text-white px-5 py-2 rounded-xl"
    >
      Continue Shopping
    </button>
  </div>
) : (
        <>

        {cartItems.map((item, index) => {
  const product = products.find(
    (p) => p.name === item.name
  );

  return (
    <div
      key={index}
      className="flex gap-4 border-b py-4 items-center"
    >
      <img
        src={product?.image}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-bold text-pink-700">
          {item.name}
        </h3>

        <p className="text-pink-500">
          ₹{product?.price}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => removeFromCart(item.name)}
            className="bg-pink-200 px-3 rounded"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item.name)}
            className="bg-pink-500 text-white px-3 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
})}

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
    <div className="bg-white p-5 md:p-8 rounded-xl w-[90%] max-w-md shadow-xl">
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