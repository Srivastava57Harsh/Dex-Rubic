//@ts-ignore
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "./App.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  //@ts-ignore
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  polygonMumbai,
  sepolia,
  modeTestnet,
  goerli,
  mainnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Landing from "./pages/landing";

const { chains, publicClient } = configureChains(
  [modeTestnet, sepolia, polygonMumbai, goerli, mainnet],
  [
    alchemyProvider({ apiKey: "nGNX2rQ-BAd_erhkV5BCRFI_0FHnl1a3" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Mode Pay",
  projectId: "b20ec248fdbe746a0f8306abfacf7468",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#353535",
            accentColorForeground: "#FFF",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {/* <AddFriend /> */}
          <Router>
            <Routes>
              <Route path="/" Component={Landing} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
