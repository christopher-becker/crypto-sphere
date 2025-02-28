import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import CoinPage from "./pages/coin-page/CoinPage";
import Header from "./components/Header";
import TickerMarquee from "./components/ticker-marquee/TickerMarquee";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
      <TickerMarquee />
    </BrowserRouter>
  );
}

export default App;
