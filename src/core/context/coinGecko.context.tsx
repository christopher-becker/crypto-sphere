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
import { DEFAULT_CURRENCY } from "../constants/config.const";

interface CoinGeckoContextType {
  currency: string;
  list: CoinType[];
  isLoadingList: boolean;
  updateList: (data: Binance24hrTickerType) => void;
  updateCurrency: (data: string) => void;
}

export const CoinGeckoContext = createContext<CoinGeckoContextType>({
  currency: DEFAULT_CURRENCY,
  list: [],
  isLoadingList: true,
  updateList: () => {},
  updateCurrency: () => {},
});

export const CoinGeckoProvider = ({ children }: PropsWithChildren<unknown>) => {
  const hasLocalStorageCurrency = localStorage.getItem("APP_CURRENCY");
  const [currency, setCurrency] = useState<string>(
    hasLocalStorageCurrency ?? DEFAULT_CURRENCY
  );
  const [list, setList] = useState<CoinType[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        const data: CoinType[] = await getCoinsList(currency);
        if (!!data) setList(() => data);
      } catch (error) {
        console.error("Failed to fetch coin list:", error);
      }
      setIsLoadingList(false);
    };

    fetchCoinList();
  }, [currency]);

  function updateList(data: Binance24hrTickerType) {
    const removeTicker = data.s.toLowerCase().replace(currency, "");
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

  function setCurrencyStorage(data: string) {
    localStorage.setItem("APP_CURRENCY", data);
  }

  function updateCurrency(data: string) {
    setCurrency(data);
    setCurrencyStorage(data);
  }

  const contextValue = useMemo(
    () => ({ currency, list, isLoadingList, updateList, updateCurrency }),
    [currency, list, isLoadingList]
  );

  return (
    <CoinGeckoContext.Provider value={contextValue}>
      {children}
    </CoinGeckoContext.Provider>
  );
};
