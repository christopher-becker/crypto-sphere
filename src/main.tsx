import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CoinGeckoProvider } from "./core/context/coinGecko.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CoinGeckoProvider>
      <App />
    </CoinGeckoProvider>
  </StrictMode>
);
