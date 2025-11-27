// src/components/PolygonKitProvider.tsx
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// src/constants/chains.ts
var polygon = {
  id: 137,
  name: "Polygon",
  network: "matic",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"]
    },
    public: {
      http: ["https://polygon-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com"
    }
  }
};
var polygonMumbai = {
  id: 80001,
  name: "Polygon Mumbai",
  network: "maticmum",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-mumbai.maticvigil.com"]
    },
    public: {
      http: ["https://rpc-mumbai.maticvigil.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com"
    }
  }
};
var polygonAmoy = {
  id: 80002,
  name: "Polygon Amoy",
  network: "polygon-amoy",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-amoy.polygon.technology"]
    },
    public: {
      http: ["https://rpc-amoy.polygon.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://amoy.polygonscan.com"
    }
  }
};
var polygonZkEVM = {
  id: 1101,
  name: "Polygon zkEVM",
  network: "polygon-zkevm",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://zkevm-rpc.com"]
    },
    public: {
      http: ["https://zkevm-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://zkevm.polygonscan.com"
    }
  }
};
var defaultChains = [polygon, polygonAmoy, polygonZkEVM];

// src/components/PolygonKitProvider.tsx
import { jsx } from "react/jsx-runtime";
var queryClient = new QueryClient();
function PolygonKitProvider({
  children,
  config: userConfig
}) {
  const chains = userConfig?.chains || [polygon, polygonAmoy, polygonZkEVM];
  const config = createConfig({
    chains,
    connectors: [
      injected(),
      coinbaseWallet({ appName: "PolygonKit App" }),
      walletConnect({
        projectId: userConfig?.projectId || "YOUR_PROJECT_ID",
        showQrModal: true
      })
    ],
    transports: chains.reduce((acc, chain) => {
      acc[chain.id] = http(chain.rpcUrls.default.http[0]);
      return acc;
    }, {})
  });
  return /* @__PURE__ */ jsx(WagmiProvider, { config, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children }) });
}

// src/components/Wallet/Wallet.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Wallet({ children, className = "" }) {
  return /* @__PURE__ */ jsx2("div", { className: `inline-flex items-center gap-2 ${className}`, children });
}

// src/components/Wallet/ConnectWallet.tsx
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function ConnectWallet({
  children,
  className = "",
  onConnect,
  onDisconnect: onDisconnectCallback
}) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    }
  }, [isConnected, address, onConnect]);
  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === "injected");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };
  const handleDisconnect = () => {
    disconnect();
    if (onDisconnectCallback) {
      onDisconnectCallback();
    }
  };
  if (children) {
    return /* @__PURE__ */ jsx3("div", { className, onClick: isConnected ? handleDisconnect : handleConnect, children });
  }
  return /* @__PURE__ */ jsx3(
    "button",
    {
      className: `px-4 py-2 rounded-lg font-medium transition-colors ${isConnected ? "bg-red-500 hover:bg-red-600 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"} ${className}`,
      onClick: isConnected ? handleDisconnect : handleConnect,
      children: isConnected ? "Disconnect" : "Connect Wallet"
    }
  );
}

// src/components/Wallet/WalletDropdown.tsx
import { useState } from "react";
import { useAccount as useAccount2, useDisconnect as useDisconnect2, useBalance, useSwitchChain } from "wagmi";

// src/utils/format.ts
function shortenAddress(address, chars = 4) {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}
function formatBalance(balance, decimals = 18, displayDecimals = 4) {
  const divisor = BigInt(10 ** decimals);
  const integerPart = balance / divisor;
  const fractionalPart = balance % divisor;
  const fractionalString = fractionalPart.toString().padStart(decimals, "0");
  const trimmedFractional = fractionalString.substring(0, displayDecimals);
  return `${integerPart}.${trimmedFractional}`;
}
function parseTokenAmount(amount, decimals = 18) {
  const [integer, fraction = ""] = amount.split(".");
  const paddedFraction = fraction.padEnd(decimals, "0").substring(0, decimals);
  const combinedString = integer + paddedFraction;
  return BigInt(combinedString);
}
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// src/components/Wallet/WalletDropdown.tsx
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
function WalletDropdown({ children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected, chain } = useAccount2();
  const { disconnect } = useDisconnect2();
  const { data: balance } = useBalance({ address });
  const { switchChain } = useSwitchChain();
  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };
  const handleSwitchChain = (chainId) => {
    switchChain({ chainId });
    setIsOpen(false);
  };
  if (!isConnected || !address) {
    return null;
  }
  const supportedChains = [polygon, polygonAmoy, polygonZkEVM];
  return /* @__PURE__ */ jsxs("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ jsx4(
      "button",
      {
        className: "px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 font-medium transition-colors",
        onClick: () => setIsOpen(!isOpen),
        children: children || shortenAddress(address)
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 z-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx4("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Connected Account" }),
        /* @__PURE__ */ jsx4("div", { className: "font-medium mt-1", children: shortenAddress(address) }),
        balance && /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-300 mt-1", children: [
          formatBalance(balance.value),
          " ",
          balance.symbol
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsx4("div", { className: "text-xs text-gray-500 dark:text-gray-400 px-3 py-2", children: "Switch Network" }),
        supportedChains.map((supportedChain) => /* @__PURE__ */ jsx4(
          "button",
          {
            className: `w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${chain?.id === supportedChain.id ? "bg-purple-50 dark:bg-purple-900/20" : ""}`,
            onClick: () => handleSwitchChain(supportedChain.id),
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx4("span", { children: supportedChain.name }),
              chain?.id === supportedChain.id && /* @__PURE__ */ jsx4("span", { className: "text-purple-600 dark:text-purple-400", children: "\u2713" })
            ] })
          },
          supportedChain.id
        ))
      ] }),
      /* @__PURE__ */ jsx4("div", { className: "p-2 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx4(
        "button",
        {
          className: "w-full text-left px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors",
          onClick: handleDisconnect,
          children: "Disconnect"
        }
      ) })
    ] }),
    isOpen && /* @__PURE__ */ jsx4(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setIsOpen(false)
      }
    )
  ] });
}

// src/components/Identity/Identity.tsx
import { useBalance as useBalance2 } from "wagmi";

// src/components/Identity/Avatar.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Avatar({ address, className = "", size = 40 }) {
  const generateGradient = (addr) => {
    const colors = [
      "#8B5CF6",
      "#EC4899",
      "#10B981",
      "#F59E0B",
      "#3B82F6",
      "#EF4444",
      "#6366F1",
      "#14B8A6",
      "#F97316",
      "#06B6D4"
    ];
    const index1 = parseInt(addr.slice(2, 4), 16) % colors.length;
    const index2 = parseInt(addr.slice(4, 6), 16) % colors.length;
    return `linear-gradient(135deg, ${colors[index1]}, ${colors[index2]})`;
  };
  const getInitials = (addr) => {
    return addr.slice(2, 4).toUpperCase();
  };
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: `rounded-full flex items-center justify-center text-white font-bold ${className}`,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        background: generateGradient(address),
        fontSize: `${size / 2.5}px`
      },
      children: getInitials(address)
    }
  );
}

// src/components/Identity/Name.tsx
import { useEnsName } from "wagmi";
import { mainnet } from "viem/chains";
import { jsx as jsx6 } from "react/jsx-runtime";
function Name({ address, className = "" }) {
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id
  });
  return /* @__PURE__ */ jsx6("span", { className: `font-medium ${className}`, children: ensName || shortenAddress(address) });
}

// src/components/Identity/Identity.tsx
import { jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
function Identity({
  address,
  className = "",
  showAvatar = true,
  showAddress = true,
  showBalance = false
}) {
  const { data: balance } = useBalance2({ address });
  return /* @__PURE__ */ jsxs2("div", { className: `flex items-center gap-3 ${className}`, children: [
    showAvatar && /* @__PURE__ */ jsx7(Avatar, { address }),
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
      showAddress && /* @__PURE__ */ jsx7("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx7(Name, { address }) }),
      showBalance && balance && /* @__PURE__ */ jsxs2("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
        formatBalance(balance.value, 18, 4),
        " ",
        balance.symbol
      ] })
    ] })
  ] });
}

// src/components/Transaction/Transaction.tsx
import { useAccount as useAccount3 } from "wagmi";
import { jsx as jsx8 } from "react/jsx-runtime";
function Transaction({
  children,
  className = "",
  chainId
}) {
  const { chain } = useAccount3();
  if (chainId && chain?.id !== chainId) {
    return /* @__PURE__ */ jsx8("div", { className: `text-red-500 ${className}`, children: "Please switch to the correct network" });
  }
  return /* @__PURE__ */ jsx8("div", { className, children });
}

// src/components/Transaction/TransactionButton.tsx
import { useState as useState2 } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { jsx as jsx9 } from "react/jsx-runtime";
function TransactionButton({
  text = "Send Transaction",
  className = "",
  disabled = false,
  calls = [],
  onSuccess,
  onError
}) {
  const [isPending, setIsPending] = useState2(false);
  const { sendTransaction, data: hash } = useSendTransaction();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash
  });
  const handleTransaction = async () => {
    if (calls.length === 0) {
      onError?.(new Error("No transaction calls provided"));
      return;
    }
    setIsPending(true);
    try {
      const call = calls[0];
      sendTransaction(
        {
          to: call.to,
          data: call.data,
          value: call.value
        },
        {
          onSuccess: (hash2) => {
            setIsPending(false);
            onSuccess?.(hash2);
          },
          onError: (error) => {
            setIsPending(false);
            onError?.(error);
          }
        }
      );
    } catch (error) {
      setIsPending(false);
      onError?.(error);
    }
  };
  const isLoading = isPending || isConfirming;
  return /* @__PURE__ */ jsx9(
    "button",
    {
      className: `px-4 py-2 rounded-lg font-medium transition-colors ${disabled || isLoading ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"} ${className}`,
      onClick: handleTransaction,
      disabled: disabled || isLoading,
      children: isLoading ? "Processing..." : text
    }
  );
}

// src/components/Transaction/TransactionStatus.tsx
import { useWaitForTransactionReceipt as useWaitForTransactionReceipt2 } from "wagmi";
import { jsx as jsx10, jsxs as jsxs3 } from "react/jsx-runtime";
function TransactionStatus({ hash, className = "" }) {
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt2({
    hash
  });
  return /* @__PURE__ */ jsxs3("div", { className: `flex items-center gap-2 ${className}`, children: [
    isLoading && /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 text-yellow-600 dark:text-yellow-400", children: [
      /* @__PURE__ */ jsx10("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" }),
      /* @__PURE__ */ jsx10("span", { children: "Confirming..." })
    ] }),
    isSuccess && /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 text-green-600 dark:text-green-400", children: [
      /* @__PURE__ */ jsx10("span", { children: "\u2713" }),
      /* @__PURE__ */ jsx10("span", { children: "Transaction confirmed" })
    ] }),
    isError && /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 text-red-600 dark:text-red-400", children: [
      /* @__PURE__ */ jsx10("span", { children: "\u2717" }),
      /* @__PURE__ */ jsx10("span", { children: "Transaction failed" })
    ] })
  ] });
}

// src/components/Token/Token.tsx
import { jsx as jsx11, jsxs as jsxs4 } from "react/jsx-runtime";
function Token({ amount, symbol, className = "" }) {
  const displayAmount = amount ? parseFloat(amount).toFixed(4) : "0.0000";
  return /* @__PURE__ */ jsxs4("div", { className: `flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsx11("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm", children: symbol ? symbol.charAt(0) : "?" }),
    /* @__PURE__ */ jsxs4("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx11("span", { className: "font-medium", children: symbol || "Unknown" }),
      amount && /* @__PURE__ */ jsx11("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: displayAmount })
    ] })
  ] });
}

// src/components/Token/TokenBalance.tsx
import { useBalance as useBalance3 } from "wagmi";
import { jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";
function TokenBalance({ address, token, className = "" }) {
  const { data: balance, isLoading } = useBalance3({
    address,
    token
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx12("div", { className: `animate-pulse ${className}`, children: /* @__PURE__ */ jsx12("div", { className: "h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" }) });
  }
  if (!balance) {
    return /* @__PURE__ */ jsx12("div", { className, children: "-" });
  }
  return /* @__PURE__ */ jsxs5("div", { className: `font-medium ${className}`, children: [
    formatBalance(balance.value),
    " ",
    balance.symbol
  ] });
}

// src/components/Swap/Swap.tsx
import { useState as useState3 } from "react";
import { jsx as jsx13, jsxs as jsxs6 } from "react/jsx-runtime";
function Swap({ className = "", onSuccess, onError }) {
  const [fromAmount, setFromAmount] = useState3("");
  const [toAmount, setToAmount] = useState3("");
  const [isLoading, setIsLoading] = useState3(false);
  const handleSwap = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      onSuccess?.("0x...");
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs6("div", { className: `bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`, children: [
    /* @__PURE__ */ jsx13("h3", { className: "text-lg font-bold mb-4", children: "Swap Tokens" }),
    /* @__PURE__ */ jsxs6("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs6("div", { className: "bg-gray-50 dark:bg-gray-800 rounded-lg p-3", children: [
        /* @__PURE__ */ jsx13("label", { className: "text-sm text-gray-600 dark:text-gray-400", children: "From" }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsx13(
            "input",
            {
              type: "number",
              value: fromAmount,
              onChange: (e) => setFromAmount(e.target.value),
              placeholder: "0.0",
              className: "flex-1 bg-transparent text-2xl font-medium outline-none"
            }
          ),
          /* @__PURE__ */ jsx13("button", { className: "px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium", children: "MATIC" })
        ] })
      ] }),
      /* @__PURE__ */ jsx13("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx13("button", { className: "p-2 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors", children: "\u2193" }) }),
      /* @__PURE__ */ jsxs6("div", { className: "bg-gray-50 dark:bg-gray-800 rounded-lg p-3", children: [
        /* @__PURE__ */ jsx13("label", { className: "text-sm text-gray-600 dark:text-gray-400", children: "To" }),
        /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsx13(
            "input",
            {
              type: "number",
              value: toAmount,
              onChange: (e) => setToAmount(e.target.value),
              placeholder: "0.0",
              className: "flex-1 bg-transparent text-2xl font-medium outline-none"
            }
          ),
          /* @__PURE__ */ jsx13("button", { className: "px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium", children: "USDC" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx13(
      "button",
      {
        onClick: handleSwap,
        disabled: isLoading || !fromAmount,
        className: `w-full mt-4 px-4 py-3 rounded-lg font-medium transition-colors ${isLoading || !fromAmount ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`,
        children: isLoading ? "Swapping..." : "Swap"
      }
    ),
    /* @__PURE__ */ jsx13("div", { className: "mt-3 text-xs text-gray-500 dark:text-gray-400 text-center", children: "Powered by Polygon DEX Aggregators" })
  ] });
}

// src/hooks/usePolygonKit.ts
import { useAccount as useAccount4, useBalance as useBalance4, useConnect as useConnect2, useDisconnect as useDisconnect3 } from "wagmi";
function usePolygonKit() {
  const { address, isConnected, chain } = useAccount4();
  const { connect, connectors } = useConnect2();
  const { disconnect } = useDisconnect3();
  const { data: balance } = useBalance4({ address });
  const connectWallet = () => {
    const injectedConnector = connectors.find((c) => c.id === "injected");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };
  return {
    address,
    isConnected,
    chain,
    balance,
    connect: connectWallet,
    disconnect,
    connectors
  };
}

// src/hooks/usePolygonBalance.ts
import { useBalance as useBalance5 } from "wagmi";
function usePolygonBalance(address, token) {
  const { data, isLoading, isError, refetch } = useBalance5({
    address,
    token
  });
  const formattedBalance = data ? formatBalance(data.value, data.decimals) : "0";
  return {
    balance: data?.value,
    formatted: formattedBalance,
    symbol: data?.symbol,
    decimals: data?.decimals,
    isLoading,
    isError,
    refetch
  };
}

// src/hooks/usePolygonTransaction.ts
import { useSendTransaction as useSendTransaction2, useWaitForTransactionReceipt as useWaitForTransactionReceipt3 } from "wagmi";
function usePolygonTransaction() {
  const { sendTransaction, data: hash, isPending, isError, error } = useSendTransaction2();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt3({
    hash
  });
  const send = (to, value, data) => {
    sendTransaction({
      to,
      value,
      data
    });
  };
  return {
    send,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error
  };
}
export {
  Avatar,
  ConnectWallet,
  Identity,
  Name,
  PolygonKitProvider,
  Swap,
  Token,
  TokenBalance,
  Transaction,
  TransactionButton,
  TransactionStatus,
  Wallet,
  WalletDropdown,
  defaultChains,
  formatBalance,
  parseTokenAmount,
  polygon,
  polygonAmoy,
  polygonMumbai,
  polygonZkEVM,
  shortenAddress,
  truncateText,
  usePolygonBalance,
  usePolygonKit,
  usePolygonTransaction
};
