import { useContext, useEffect } from "react";
import { CoinGeckoContext } from "../context/coinGecko.context";
import { CoinType } from "../types/coinGecko.type";
import { BINANCE_WSS_URL } from "../constants/config.const";

export default function useCryptoPrices(coins: CoinType[]) {
  const { list, handleUpdateList } = useContext(CoinGeckoContext);

  useEffect(() => {
    if (!list) return;
    const tickerList = coins
      .slice(0, 100)
      .map((coin) => `${coin.symbol.toLowerCase()}usdt@ticker`)
      .join("/");

    if (!tickerList) return;

    const socket = new WebSocket(`${BINANCE_WSS_URL}/${tickerList}`);

    socket.onopen = () => {};

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleUpdateList(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      console.log("Cleaning up WebSocket connection");
      socket.close();
    };
  }, []);
  return null;
}
