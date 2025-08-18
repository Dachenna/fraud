import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export const Hero = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleAccounts = (accounts: string[]) => {
      if (accounts && accounts.length) {
        setAccount(accounts[0]);
        setConnected(true);
      } else {
        setAccount(null);
        setConnected(false);
      }
    };

    // detect injected provider
    const provider = (window as any).ethereum;
    if (provider && provider.request) {
      // get current accounts and listen for changes
      provider.request({ method: "eth_accounts" }).then(handleAccounts).catch(() => {});

      // --- NEW: prompt user to connect once on page load if no account is present ---
      // use a session flag so we don't repeatedly open the wallet prompt on every reload
      if (!sessionStorage.getItem("walletPrompted")) {
        provider.request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            if (!accounts || accounts.length === 0) {
              // This will open the wallet connect dialog (user interaction required)
              provider.request({ method: "eth_requestAccounts" })
                .then(handleAccounts)
                .catch(() => {});
              sessionStorage.setItem("walletPrompted", "1");
            }
          })
          .catch(() => {});
      }
      // --- END NEW ---

      provider.on?.("accountsChanged", handleAccounts);
      provider.on?.("chainChanged", () => window.location.reload());
    }

    return () => {
      provider?.removeListener?.("accountsChanged", handleAccounts);
    };
  }, []);

  const connectWallet = async () => {
    try {
      const win = window as any;
      if (!win.ethereum) {
        window.open("https://metamask.io/download/", "_blank");
        return;
      }
      const provider = new ethers.providers.Web3Provider(win.ethereum, "any");
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0] || null);
      const net = await provider.getNetwork();
      setNetwork(net.name || `${net.chainId}`);
      setConnected(true);
    } catch (err) {
      console.error("Wallet connect failed", err);
    }
  };


  const disconnect = () => {
    setAccount(null);
    setNetwork(null);
    setConnected(false);
  };

  const truncate = (addr: string | null) =>
    !addr ? "" : `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#060818] text-white">
      {/* decorative blurred orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -left-32 -bottom-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-2xl" />
      </div>

      <header className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Crypto Fraud Detection
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl">
              Real-time wallet checks, chain-aware UX and instant risk previews — built for Web3.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/detect"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-semibold shadow-lg hover:scale-[1.02] transition"
                aria-label="Go to detection"
              >
                Launch Detection
              </a>

              <button
                onClick={connectWallet}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                {connected ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L2 9h7z"/></svg>
                    <span>{truncate(account)}</span>
                  </>
                ) : (
                  <>Connect Wallet</>
                )}
              </button>

              {connected && (
                <button
                  onClick={disconnect}
                  className="px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition"
                >
                  Disconnect
                </button>
              )}
            </div>
          </div>

          {/* status card */}
          <div className="ml-auto min-w-[220px] bg-white/5 backdrop-blur rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Network</p>
                <p className="font-semibold mt-1">{network ? network : "Not connected"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Status</p>
                <p className="font-semibold mt-1">{connected ? "Connected" : "Offline"}</p>
              </div>
            </div>

            <div className="mt-4 border-t border-white/5 pt-3">
              <p className="text-xs text-gray-400">Quick Stats</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-sm text-gray-300">Checks</p>
                  <p className="font-bold">1.2k</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300">Avg Risk</p>
                  <p className="font-bold">37%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300">Uptime</p>
                  <p className="font-bold">99.9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* search / quick-check card */}
        <div className="mt-12 max-w-3xl mx-auto bg-white/3 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/5">
          <div className="flex items-center gap-3">
            <input
              aria-label="wallet address"
              placeholder="Paste wallet address (0x...) to preview risk"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 placeholder:text-gray-400 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) window.location.href = `/detect?address=${encodeURIComponent(val)}`;
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>('input[aria-label="wallet address"]');
                const val = input?.value.trim();
                if (val) window.location.href = `/detect?address=${encodeURIComponent(val)}`;
              }}
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold"
            >
              Quick Check
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-300">
            Quick checks are performed client-side: balance preview and a randomized risk score — use the detection page for full analysis.
          </p>
        </div>
      </header>
    </div>
  );
};
