export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pink-50 px-8 py-16">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-pink-700 mb-8">
          About Velora ✨
        </h1>

        <p className="text-lg text-gray-700 leading-8">
          Velora is a modern beauty and skincare e-commerce platform
          dedicated to providing premium skincare, haircare, body care,
          and beauty products. Our mission is to help customers discover
          high-quality self-care essentials that enhance confidence and
          promote healthy lifestyles.
        </p>

        <p className="text-lg text-gray-700 leading-8 mt-6">
          This application was developed using Next.js, Tailwind CSS,
          Clerk Authentication, and modern web development practices,
          featuring secure authentication, shopping cart management,
          wishlist functionality, product categorization, and order tracking.
        </p>

        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            Why Choose Velora?
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Premium beauty and skincare products</li>
            <li>Easy and secure shopping experience</li>
            <li>Wishlist and cart management</li>
            <li>Order tracking and history</li>
            <li>Modern and responsive design</li>
          </ul>
        </div>

      </div>
    </div>
  );
}