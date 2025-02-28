import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useMemo,
} from "react";
import { getCoinsList } from "../../api/coinGeckoAPI";
import { CoinType } from "../types/coinGecko.type";

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
