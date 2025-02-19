import { useContext } from "react";
import { CoinGeckoContext } from "../../core/context/coinGecko.context";
import CoinRow from "./CoinRow";
import LoadingSkeleton from "../loading-skeleton/LoadingSkeleton";

export default function CoinList() {
  const { list, isLoadingList } = useContext(CoinGeckoContext);

  function renderContent() {
    if (isLoadingList) return <LoadingSkeleton />;
    if (!list || list.length === 0)
      return <span className="text-gray-500">Nothing to show.</span>;

    return (
      <ul>
        {list.map((coin) => (
          <CoinRow key={coin.id} coin={coin} />
        ))}
      </ul>
    );
  }

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex gap-8">
        <h2 className="flex-1">The Top 100</h2>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
