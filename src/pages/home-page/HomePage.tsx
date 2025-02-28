import CoinList from "../../components/coin/CoinList";
import TopPerforming from "../../components/top-performing/TopPerformingCoinList";

export default function HomePage() {
  return (
    <main className="page-layout px-2 lg:!px-0">
      <h1>Today's Crypto Market</h1>
      <div className="flex flex-col sm:flex-row gap-10">
        <TopPerforming
          title={"Top Performing(24h)"}
          filterBy={"price_change_percentage_24h"}
        />
        <TopPerforming
          title={"Highest Volume(24h)"}
          filterBy={"total_volume"}
        />
      </div>
      <CoinList />
    </main>
  );
}
