import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useMemo,
} from "react";
import { getCoinsList } from "../../api/coinGeckoAPI";
import { CoinType } from "../types/coinGecko.type";
import { Binance24hrTickerType } from "../types/binance.type";

interface CoinGeckoContextType {
  list: CoinType[];
  isLoadingList: boolean;
  handleUpdateList: (data: Binance24hrTickerType) => void;
}

export const CoinGeckoContext = createContext<CoinGeckoContextType>({
  list: [],
  isLoadingList: true,
  handleUpdateList: () => {},
});

export const CoinGeckoProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [list, setList] = useState<CoinType[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        const data: CoinType[] = await getCoinsList();
        setList(() => data);
      } catch (error) {
        console.error("Failed to fetch coin list:", error);
      }
      setIsLoadingList(false);
    };

    fetchCoinList();
  }, []);

  function handleUpdateList(data: Binance24hrTickerType) {
    const removeTicker = data.s.toLowerCase().replace("usdt", "");
    setList((current) =>
      current.map((coin) =>
        coin.symbol.toLowerCase() === removeTicker
          ? {
              ...coin,
              current_price: parseFloat(data.c),
              price_change_percentage_24h: parseFloat(data.P),
            }
          : coin
      )
    );
  }

  const contextValue = useMemo(
    () => ({ list, isLoadingList, handleUpdateList }),
    [list, isLoadingList]
  );

  return (
    <CoinGeckoContext.Provider value={contextValue}>
      {children}
    </CoinGeckoContext.Provider>
  );
};
