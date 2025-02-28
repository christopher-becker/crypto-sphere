import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CoinGeckoContext } from "../../core/context/coinGecko.context";
import {
  formatCryptoPrice,
  formatNumber,
  formatPercentage,
} from "../../core/utils/format.util";
import {
  getPercentageMoveClass,
  getPercentageMoveSymbol,
} from "../../core/utils/percentage.util";
import useCryptoPrices from "../../core/hooks/useCryptoPrices.hook";

export default function CoinList() {
  const { id } = useParams();
  const { list } = useContext(CoinGeckoContext);
  const coinDetail = useMemo(
    () => list?.find((coin) => coin.id === id),
    [list, id]
  );

  const formattedPrice = useMemo(
    () => formatCryptoPrice(coinDetail?.current_price ?? 0),
    [coinDetail]
  );
  const formattedChange = useMemo(
    () => formatPercentage(coinDetail?.price_change_percentage_24h ?? 0, 2),
    [coinDetail]
  );

  if (!coinDetail) {
    return <p className="text-gray-700">Coin not found.</p>;
  }

  const percentageMoveClass = getPercentageMoveClass(
    coinDetail.price_change_percentage_24h
  );

  const percentageMoveSymbol = getPercentageMoveSymbol(
    coinDetail.price_change_percentage_24h
  );

  useCryptoPrices([coinDetail]);

  return (
    <main className="page-layout">
      <img
        className="w-48 shadow-[0_0_100px_#0055ff] rounded-full"
        src={coinDetail?.image}
        alt={coinDetail?.name || "Coin Image"}
      />
      <div>
        <h1>{coinDetail?.name}</h1>
        <p>{formattedPrice}</p>
        <p className={`text-lg ${percentageMoveClass}`}>
          {percentageMoveSymbol}
          {formattedChange}
        </p>
        <p>{formatNumber(coinDetail?.max_supply ?? 0)}</p>
      </div>
    </main>
  );
}
