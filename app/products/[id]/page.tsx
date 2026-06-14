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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products[Number(id)];

  if (!product) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md">

        <img
          src="/products/serum.jpg"
          alt={product.name}
          className="w-full h-72 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold text-pink-700 mt-4">
          {product.name}
        </h1>

        <p className="text-pink-500 mt-2">
          {product.category}
        </p>

        <p className="text-yellow-500 font-semibold">
          ⭐ {product.rating}
        </p>

        <p className="text-2xl font-bold text-pink-600 mt-3">
          ₹{product.price}
        </p>

        <button className="w-full mt-4 bg-pink-500 text-white py-3 rounded-xl">
          Add to Cart 🛒
        </button>
        

      </div>
    </div>
  );
}