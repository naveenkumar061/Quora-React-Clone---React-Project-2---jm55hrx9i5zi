function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-12">
      <div className="bg-white border border-gray-100 rounded-md p-12 max-w-screen-lg mx-auto text-center">
        <h1 className="text-3xl font-semibold mb-6">Something went wrong</h1>
        <p className="font-serif text-gray-500 mb-12">{error.message}</p>
        <button
          className="px-8 py-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          onClick={resetErrorBoundary}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallBack;
