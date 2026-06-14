export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pink-50 px-8 py-16">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-pink-700 mb-8">
          Contact Us 📞
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          We'd love to hear from you! Reach out for any questions,
          feedback, or support.
        </p>

        <div className="bg-white p-8 rounded-xl shadow-lg text-gray-700">
          <p className="mb-4">
            <strong>Email:</strong> support@velora.com
          </p>

          <p className="mb-4 text-gray-700">
            <strong>Phone:</strong> +91 98765 43210
          </p>

          <p>
            <strong>Address:</strong> Guntur, Andhra Pradesh, India
          </p>
        </div>

      </div>
    </div>
  );
}