"use client";

import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

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
];

export default function ProductPage() {
const { addToCart } = useCart();
const params = useParams();

const productId = Number(params.id);
const product = products[productId];

if (!product) {
return <div className="p-10">Product not found</div>;
}

return ( <div className="p-10"> <h1>{product.name}</h1> <p>₹{product.price}</p>

```
  <button
  onClick={() => {
    console.log("Button Clicked");

    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
    });

    alert("Added To Cart");
  }}
  className="w-full mt-4 bg-pink-500 text-white py-3 rounded-xl"
>
  Add To Cart 🛒
</button>
</div>

);
}
