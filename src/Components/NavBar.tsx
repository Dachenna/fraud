import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Crypto Fraud Detection</h1>
        <div>
          <Link to="/" className="px-4">Home</Link>
          <Link to="/detect" className="px-4">Detect Fraud</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
