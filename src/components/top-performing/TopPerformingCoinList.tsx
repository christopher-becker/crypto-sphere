import { useContext, useMemo } from "react";
import { CoinGeckoContext } from "../../core/context/coinGecko.context";
import TopPerformingCoinRow from "./TopPerformingCoinRow";
import LoadingSkeleton from "../loading-skeleton/LoadingSkeleton";
import { CoinType } from "../../core/types/coinGecko.type";

export default function TopPerformingCoinList({
  title,
  filterBy,
}: {
  title: string;
  filterBy: keyof CoinType;
}) {
  const { list, isLoadingList } = useContext(CoinGeckoContext);
  const top5Coins = useMemo(() => {
    return (list || [])
      .filter((coin) => typeof coin[filterBy] === "number")
      .sort((a, b) => (b[filterBy] as number) - (a[filterBy] as number))
      .slice(0, 5); // Get top 5
  }, [list, filterBy]);

  function renderContent() {
    if (isLoadingList) return <LoadingSkeleton />;
    if (!list || top5Coins.length === 0)
      return <p className="text-gray-500">Nothing to show.</p>;
    return (
      <ul className="flex gap-4 flex-col">
        {top5Coins.map((coin, index) => (
          <TopPerformingCoinRow key={coin.id} coin={coin} index={index} />
        ))}
      </ul>
    );
  }

  return (
    <div className="rounded-2xl p-4 py-4 bg-gray-900 flex flex-1 gap-6 flex-col">
      <h5>{title}</h5>
      {renderContent()}
    </div>
  );
}
