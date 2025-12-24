"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Avatar: () => Avatar,
  ConnectWallet: () => ConnectWallet,
  Identity: () => Identity,
  Name: () => Name,
  PolygonKitProvider: () => PolygonKitProvider,
  Swap: () => Swap,
  Token: () => Token,
  TokenBalance: () => TokenBalance,
  TokenIcon: () => TokenIcon,
  Transaction: () => Transaction,
  TransactionButton: () => TransactionButton,
  TransactionStatus: () => TransactionStatus,
  Wallet: () => Wallet,
  WalletDropdown: () => WalletDropdown,
  defaultChains: () => defaultChains,
  formatBalance: () => formatBalance,
  parseTokenAmount: () => parseTokenAmount,
  polygon: () => polygon,
  polygonAmoy: () => polygonAmoy,
  polygonMumbai: () => polygonMumbai,
  polygonZkEVM: () => polygonZkEVM,
  shortenAddress: () => shortenAddress,
  truncateText: () => truncateText,
  usePolygonBalance: () => usePolygonBalance,
  usePolygonKit: () => usePolygonKit,
  usePolygonTransaction: () => usePolygonTransaction
});
module.exports = __toCommonJS(index_exports);

// src/components/PolygonKitProvider.tsx
var import_wagmi = require("wagmi");
var import_react_query = require("@tanstack/react-query");
var import_react = require("@reown/appkit/react");
var import_appkit_adapter_wagmi = require("@reown/appkit-adapter-wagmi");

// src/constants/chains.ts
var polygon = {
  id: 137,
  name: "Polygon PoS",
  network: "matic",
  nativeCurrency: {
    name: "POL",
    symbol: "POL",
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
  name: "Amoy Testnet",
  network: "polygon-amoy",
  nativeCurrency: {
    name: "POL",
    symbol: "POL",
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
var import_jsx_runtime = require("react/jsx-runtime");
var queryClient = new import_react_query.QueryClient();
var projectId = process.env.VITE_PROJECT_ID || "f6bd6e2911b56f5ac3bc8b2d0e2d7ad5";
function PolygonKitProvider({
  children,
  config: userConfig
}) {
  const chains = userConfig?.chains || [polygon, polygonAmoy, polygonZkEVM];
  const metadata = {
    name: userConfig?.appName || "PolygonKit App",
    description: userConfig?.appDescription || "Your Polygon App",
    url: userConfig?.appUrl || "https://polygon.technology",
    icons: userConfig?.appIcons || ["https://avatars.githubusercontent.com/u/21101868"]
  };
  const wagmiAdapter = new import_appkit_adapter_wagmi.WagmiAdapter({
    networks: chains,
    projectId: userConfig?.projectId || projectId
  });
  (0, import_react.createAppKit)({
    adapters: [wagmiAdapter],
    networks: chains,
    projectId: userConfig?.projectId || projectId,
    metadata,
    features: {
      analytics: true
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_wagmi.WagmiProvider, { config: wagmiAdapter.wagmiConfig, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_query.QueryClientProvider, { client: queryClient, children }) });
}

// src/components/Wallet/Wallet.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Wallet({ children, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `inline-flex items-center gap-2 ${className}`, children });
}

// src/components/Wallet/ConnectWallet.tsx
var import_wagmi2 = require("wagmi");
var import_react2 = require("@reown/appkit/react");
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function ConnectWallet({
  children,
  className = "",
  onConnect,
  onDisconnect: onDisconnectCallback
}) {
  const { address, isConnected } = (0, import_wagmi2.useAccount)();
  const { disconnect } = (0, import_wagmi2.useDisconnect)();
  const { open } = (0, import_react2.useAppKit)();
  (0, import_react3.useEffect)(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    }
  }, [isConnected, address, onConnect]);
  const handleConnect = () => {
    open();
  };
  const handleDisconnect = () => {
    disconnect();
    if (onDisconnectCallback) {
      onDisconnectCallback();
    }
  };
  if (children) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className, onClick: isConnected ? handleDisconnect : handleConnect, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "button",
    {
      className: `px-4 py-2 rounded-lg font-medium transition-colors ${isConnected ? "bg-red-500 hover:bg-red-600 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"} ${className}`,
      onClick: isConnected ? handleDisconnect : handleConnect,
      children: isConnected ? "Disconnect" : "Connect Wallet"
    }
  );
}

// src/components/Wallet/WalletDropdown.tsx
var import_react4 = require("react");
var import_wagmi3 = require("wagmi");

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
var import_jsx_runtime4 = require("react/jsx-runtime");
function WalletDropdown({ children, className = "" }) {
  const [isOpen, setIsOpen] = (0, import_react4.useState)(false);
  const { address, isConnected, chain } = (0, import_wagmi3.useAccount)();
  const { disconnect } = (0, import_wagmi3.useDisconnect)();
  const { data: balance } = (0, import_wagmi3.useBalance)({ address });
  const { switchChain } = (0, import_wagmi3.useSwitchChain)();
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        className: "px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 font-medium transition-colors",
        onClick: () => setIsOpen(!isOpen),
        children: children || shortenAddress(address)
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 z-50", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Connected Account" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "font-medium mt-1", children: shortenAddress(address) }),
        balance && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-sm text-gray-600 dark:text-gray-300 mt-1", children: [
          formatBalance(balance.value),
          " ",
          balance.symbol
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-xs text-gray-500 dark:text-gray-400 px-3 py-2", children: "Switch Network" }),
        supportedChains.map((supportedChain) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            className: `w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${chain?.id === supportedChain.id ? "bg-purple-50 dark:bg-purple-900/20" : ""}`,
            onClick: () => handleSwitchChain(supportedChain.id),
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: supportedChain.name }),
              chain?.id === supportedChain.id && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-purple-600 dark:text-purple-400", children: "\u2713" })
            ] })
          },
          supportedChain.id
        ))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p-2 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          className: "w-full text-left px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors",
          onClick: handleDisconnect,
          children: "Disconnect"
        }
      ) })
    ] }),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setIsOpen(false)
      }
    )
  ] });
}

// src/components/Identity/Identity.tsx
var import_wagmi5 = require("wagmi");

// src/components/Identity/Avatar.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_wagmi4 = require("wagmi");
var import_chains3 = require("viem/chains");
var import_jsx_runtime6 = require("react/jsx-runtime");
function Name({ address, className = "" }) {
  const { data: ensName } = (0, import_wagmi4.useEnsName)({
    address,
    chainId: import_chains3.mainnet.id
  });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: `font-medium ${className}`, children: ensName || shortenAddress(address) });
}

// src/components/Identity/Identity.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function Identity({
  address,
  className = "",
  showAvatar = true,
  showAddress = true,
  showBalance = false
}) {
  const { data: balance } = (0, import_wagmi5.useBalance)({ address });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: `flex items-center gap-3 ${className}`, children: [
    showAvatar && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Avatar, { address }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-col", children: [
      showAddress && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Name, { address }) }),
      showBalance && balance && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
        formatBalance(balance.value, 18, 4),
        " ",
        balance.symbol
      ] })
    ] })
  ] });
}

// src/components/Transaction/Transaction.tsx
var import_wagmi6 = require("wagmi");
var import_jsx_runtime8 = require("react/jsx-runtime");
function Transaction({
  children,
  className = "",
  chainId
}) {
  const { chain } = (0, import_wagmi6.useAccount)();
  if (chainId && chain?.id !== chainId) {
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `text-red-500 ${className}`, children: "Please switch to the correct network" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className, children });
}

// src/components/Transaction/TransactionButton.tsx
var import_react5 = require("react");
var import_wagmi7 = require("wagmi");
var import_jsx_runtime9 = require("react/jsx-runtime");
function TransactionButton({
  text = "Send Transaction",
  className = "",
  disabled = false,
  calls = [],
  onSuccess,
  onError
}) {
  const [isPending, setIsPending] = (0, import_react5.useState)(false);
  const { sendTransaction, data: hash } = (0, import_wagmi7.useSendTransaction)();
  const { isLoading: isConfirming } = (0, import_wagmi7.useWaitForTransactionReceipt)({
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var import_wagmi8 = require("wagmi");
var import_jsx_runtime10 = require("react/jsx-runtime");
function TransactionStatus({ hash, className = "" }) {
  const { isLoading, isSuccess, isError } = (0, import_wagmi8.useWaitForTransactionReceipt)({
    hash
  });
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: `flex items-center gap-2 ${className}`, children: [
    isLoading && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2 text-yellow-600 dark:text-yellow-400", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: "Confirming..." })
    ] }),
    isSuccess && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2 text-green-600 dark:text-green-400", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: "\u2713" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: "Transaction confirmed" })
    ] }),
    isError && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2 text-red-600 dark:text-red-400", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: "\u2717" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: "Transaction failed" })
    ] })
  ] });
}

// src/components/Token/Token.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function Token({ amount, symbol, className = "" }) {
  const displayAmount = amount ? parseFloat(amount).toFixed(4) : "0.0000";
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: `flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm", children: symbol ? symbol.charAt(0) : "?" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "font-medium", children: symbol || "Unknown" }),
      amount && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: displayAmount })
    ] })
  ] });
}

// src/components/Token/TokenBalance.tsx
var import_wagmi9 = require("wagmi");
var import_jsx_runtime12 = require("react/jsx-runtime");
function TokenBalance({ address, token, className = "" }) {
  const { data: balance, isLoading } = (0, import_wagmi9.useBalance)({
    address,
    token
  });
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: `animate-pulse ${className}`, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" }) });
  }
  if (!balance) {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className, children: "-" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: `font-medium ${className}`, children: [
    formatBalance(balance.value),
    " ",
    balance.symbol
  ] });
}

// src/components/Token/TokenIcon.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function TokenIcon({ symbol, size = 24, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      className: `rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ${className}`,
      style: { width: size, height: size, fontSize: size * 0.5 },
      children: symbol ? symbol.charAt(0).toUpperCase() : "?"
    }
  );
}

// src/components/Swap/Swap.tsx
var import_react6 = require("react");
var import_jsx_runtime14 = require("react/jsx-runtime");
function Swap({ className = "", onSuccess, onError }) {
  const [fromAmount, setFromAmount] = (0, import_react6.useState)("");
  const [toAmount, setToAmount] = (0, import_react6.useState)("");
  const [isLoading, setIsLoading] = (0, import_react6.useState)(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: `bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h3", { className: "text-lg font-bold mb-4", children: "Swap Tokens" }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "bg-gray-50 dark:bg-gray-800 rounded-lg p-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("label", { className: "text-sm text-gray-600 dark:text-gray-400", children: "From" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "input",
            {
              type: "number",
              value: fromAmount,
              onChange: (e) => setFromAmount(e.target.value),
              placeholder: "0.0",
              className: "flex-1 bg-transparent text-2xl font-medium outline-none"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { className: "px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium", children: "MATIC" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { className: "p-2 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors", children: "\u2193" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "bg-gray-50 dark:bg-gray-800 rounded-lg p-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("label", { className: "text-sm text-gray-600 dark:text-gray-400", children: "To" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "input",
            {
              type: "number",
              value: toAmount,
              onChange: (e) => setToAmount(e.target.value),
              placeholder: "0.0",
              className: "flex-1 bg-transparent text-2xl font-medium outline-none"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { className: "px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium", children: "USDC" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "button",
      {
        onClick: handleSwap,
        disabled: isLoading || !fromAmount,
        className: `w-full mt-4 px-4 py-3 rounded-lg font-medium transition-colors ${isLoading || !fromAmount ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`,
        children: isLoading ? "Swapping..." : "Swap"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-3 text-xs text-gray-500 dark:text-gray-400 text-center", children: "Powered by Polygon DEX Aggregators" })
  ] });
}

// src/hooks/usePolygonKit.ts
var import_wagmi10 = require("wagmi");
function usePolygonKit() {
  const { address, isConnected, chain } = (0, import_wagmi10.useAccount)();
  const { connect, connectors } = (0, import_wagmi10.useConnect)();
  const { disconnect } = (0, import_wagmi10.useDisconnect)();
  const { data: balance } = (0, import_wagmi10.useBalance)({ address });
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
var import_wagmi11 = require("wagmi");
function usePolygonBalance(address, token) {
  const { data, isLoading, isError, refetch } = (0, import_wagmi11.useBalance)({
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
var import_wagmi12 = require("wagmi");
function usePolygonTransaction() {
  const { sendTransaction, data: hash, isPending, isError, error } = (0, import_wagmi12.useSendTransaction)();
  const { isLoading: isConfirming, isSuccess } = (0, import_wagmi12.useWaitForTransactionReceipt)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Avatar,
  ConnectWallet,
  Identity,
  Name,
  PolygonKitProvider,
  Swap,
  Token,
  TokenBalance,
  TokenIcon,
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
});
