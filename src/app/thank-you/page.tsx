export default function ThankYouPage() {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-white">
        <div className="rounded-full bg-green-100 p-6 mb-6">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-600 text-center max-w-md">
          Thank you for shopping with us. Your order has been successfully placed and a confirmation email has been sent.
        </p>
      </div>
    );
  }
  