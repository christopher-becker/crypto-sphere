import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { getCoinsList } from "../../api/coinGeckoAPI";
import { CoinDirection, CoinType } from "../types/coinGecko.type";

interface CoinGeckoContextType {
  list: CoinType[];
  isLoadingList: boolean;
}

export const CoinGeckoContext = createContext<CoinGeckoContextType>({
  list: [],
  isLoadingList: true,
});

export const CoinGeckoProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [list, setList] = useState<CoinType[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const listRef = useRef<CoinType[]>([]);

  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        const data: CoinType[] = await getCoinsList();
        if (data) {
          const newData: CoinType[] = [];
          data.forEach((newCoin) => {
            const currentCoin = listRef.current?.find(
              (coin) => coin.id == newCoin.id
            );
            if (!currentCoin) {
              newData.push({ ...newCoin, direction: CoinDirection.NONE });
              return;
            }
            if (newCoin.current_price > currentCoin.current_price) {
              newData.push({ ...newCoin, direction: CoinDirection.UP });
            }
            if (newCoin.current_price < currentCoin.current_price) {
              newData.push({ ...newCoin, direction: CoinDirection.DOWN });
            }
            if (newCoin.current_price == currentCoin.current_price) {
              newData.push({ ...newCoin, direction: CoinDirection.NONE });
            }
          });
          setList(() => newData);
          listRef.current = newData;
        }
      } catch (error) {
        console.error("Failed to fetch coin list:", error);
      }
      setIsLoadingList(false);
    };

    const interval = setInterval(() => {
      fetchCoinList();
    }, 61000);

    fetchCoinList();

    return () => clearInterval(interval);
  }, []);

  const contextValue = useMemo(
    () => ({ list, isLoadingList }),
    [list, isLoadingList]
  );

  return (
    <CoinGeckoContext.Provider value={contextValue}>
      {children}
    </CoinGeckoContext.Provider>
  );
};
