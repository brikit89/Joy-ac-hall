
const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">

      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
        Coming Soon!
      </h1>

      <p className="text-gray-500 text-lg mb-8">
        We're working on something exciting. Stay tuned!
      </p>

      <a
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90"
      >
        Back to Home
      </a>

    </div>
  );
};

export default ComingSoon;
