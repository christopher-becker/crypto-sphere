import { useMemo } from "react";
import { CoinType } from "../../core/types/coinGecko.type";
import {
  formatCryptoPrice,
  formatPercentage,
} from "../../core/utils/format.util";
import {
  getPercentageMoveClass,
  getPercentageMoveSymbol,
} from "../../core/utils/percentage.util";
import { Link } from "react-router-dom";

export default function TopPerformingCoinRow({
  coin,
  index,
}: {
  coin: CoinType;
  index: number;
}) {
  const formattedPrice = useMemo(
    () => formatCryptoPrice(coin.current_price),
    [coin.current_price]
  );
  const formattedChange = useMemo(
    () => formatPercentage(coin.price_change_percentage_24h, 2),
    [coin.price_change_percentage_24h]
  );
  return (
    <li>
      <Link
        to={`/coin/${coin.id}`}
        className="group flex gap-4 items-center hover:opacity-80 transition-all"
      >
        <div className="text-gray-500 group-hover:text-white transition-all">
          {index + 1}
        </div>
        <div className="flex gap-2 flex-1 uppercase items-center">
          <img
            src={coin.image}
            className="rounded-3xl h-9 w-9 group-hover:shadow-[0_0_8px_#0055ff] group-hover:scale-110 transition-all"
            alt={coin.name || "Coin Image"}
          />
          <div className="flex flex-col gap-0">
            <span>{coin.symbol}</span>
            <span className="text-xs text-gray-500">
              #{coin.market_cap_rank}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4 items-end sm:items-center relative">
          <div>${formattedPrice}</div>
          <div
            className={`text-xs ${getPercentageMoveClass(
              coin.price_change_percentage_24h
            )}`}
          >
            {getPercentageMoveSymbol(coin.price_change_percentage_24h)}
            {formattedChange}
          </div>
          <span className="bg-gradient-to-r from-transparent to-gray-900 w-20 text-right text-2xl invisible group-hover:visible absolute -right-2 group-hover:right-0 transition-all">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
