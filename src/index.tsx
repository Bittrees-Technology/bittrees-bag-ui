import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MintPage from "./MintPage";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    process.env.REACT_APP_ENABLE_TESTNETS === "true"
      ? chain.goerli
      : chain.mainnet,
  ],
  [
    alchemyProvider({ apiKey: "MY6sRxkJ6Jeo6Pd_6XvgrmvXJFbrQE0w" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Builders Advocacy Group",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/mint",
    element: <MintPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <RouterProvider router={router} />
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
