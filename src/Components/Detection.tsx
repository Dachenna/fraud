import { useState } from "react";

const FraudDetection = () => {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [riskScore, setRiskScore] = useState(null);

  const fetchWalletData = () => {
    if (!wallet) {
      setError(prompt("Please enter a wallet address."));
      return;
    }
    setLoading(true);
    setError(null);
    
    // Generate random balance and risk score
    const randomBalance = (Math.random() * 10).toFixed(4); // Random ETH balance
    const randomRiskScore = Math.floor(Math.random() * 101); // Risk score between 0-100
    
    setTimeout(() => {
      setBalance(randomBalance);
      setRiskScore(randomRiskScore);
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  return (
    <div className="container mx-auto py-10 px-6 text-center">
      <h2 className="text-3xl font-bold">Fraud Detection System</h2>
      <p className="mt-2 text-lg">Enter a wallet address to check for fraudulent transactions.</p>
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          className="px-4 py-2 text-black rounded-lg w-1/3 border border-gray-400"
          placeholder="Enter Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <button
          className="ml-2 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          onClick={fetchWalletData}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Now"}
        </button>
      </div>
      {error && <p className="mt-4 text-red-500" aria-live="polite">{error}</p>}
      {balance !== null && riskScore !== null && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold">Wallet Information</h3>
          <table className="mt-4 w-full border border-gray-700 text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3">Wallet Address</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-600">
                <td className="p-3 text-yellow-300">{wallet}</td>
                <td className="p-3 text-green-500">{balance} ETH</td>
                <td className={`p-3 font-bold ${riskScore > 70 ? 'text-red-500' : riskScore > 40 ? 'text-yellow-500' : 'text-green-500'}`}>{riskScore}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FraudDetection;