const Hero = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <header className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">Crypto Fraud Detection</h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
          AI-powered security to protect your crypto transactions in real-time.
        </p>
        <button className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {[
          { title: "Blockchain Analysis", desc: "Scan transactions in real-time for security threats." },
          { title: "AI-Powered Detection", desc: "Advanced machine learning to detect fraud instantly." },
          { title: "Fast & Secure", desc: "Check for fraudulent transactions with speed and accuracy." },
          { title: "Always up to date", des: "Always up to date with the latest analysis on all blockchain projects."}
        ].map((feature, index) => (
          <div key={index} className="p-8 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-600 hover:shadow-md duration-300">
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-indigo-700">
        <h2 className="text-4xl font-bold">Try Our Fraud Detection System</h2>
        <p className="mt-2 text-lg">Enter a wallet address to check for suspicious activity.</p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            className="px-4 py-2 text-black rounded-lg w-1/3"
            placeholder="Enter Wallet Address"
          />
          <button className="ml-2 px-6 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition">
            Check Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center">
          <p>&copy; 2025 Crypto Fraud Detection. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Hero;
