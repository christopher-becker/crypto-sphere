import { useMemo } from "react";
import { CoinDirection, CoinType } from "../../core/types/coinGecko.type";
import {
  formatCryptoPrice,
  formatPercentage,
} from "../../core/utils/format.util";
import { Link } from "react-router-dom";
import {
  getPercentageMoveClass,
  getPercentageMoveSymbol,
} from "../../core/utils/percentage.util";

export default function CoinRow({ coin }: { coin: CoinType }) {
  const formattedPrice = useMemo(
    () => formatCryptoPrice(coin.current_price),
    [coin.current_price]
  );
  const formattedChange = useMemo(
    () => formatPercentage(coin.price_change_percentage_24h, 2),
    [coin.price_change_percentage_24h]
  );
  const directionClass = useMemo(() => {
    if (coin.direction === CoinDirection.UP) return "animate-flash-green";
    if (coin.direction === CoinDirection.DOWN) return "animate-flash-red";
    return "";
  }, [coin.direction]);
  return (
    <li className="border-b border-slate-900 hover:bg-slate-900 transition-all">
      <Link to={`/coin/${coin.id}`} className="group block p-2 py-4 sm:p-4">
        <div className="flex gap-2 sm:gap-5 items-center">
          <span className="text-gray-500 w-6 text-center group-hover:text-white transition-all">
            {coin.market_cap_rank}
          </span>
          <img
            src={coin.image}
            className="rounded-3xl h-10 w-10 sm:h-6 sm:w-6 group-hover:shadow-[0_0_8px_#0055ff] group-hover:scale-125 transition-all"
            alt={coin.name || "Coin Image"}
          />
          <div className="flex flex-1 flex-col sm:flex-row sm:gap-2">
            <span className="text-base font-bold text-ellipsis break-words line-clamp-2">
              {coin.name}
            </span>
            <span className="font-normal text-gray-700 uppercase">
              {coin.symbol}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-5">
            <span className={`sm:w-24 text-right ${directionClass}`}>
              ${formattedPrice}
            </span>
            <span
              className={`text-sm sm:text-base sm:w-24 text-right ${getPercentageMoveClass(
                coin.price_change_percentage_24h
              )}`}
            >
              {getPercentageMoveSymbol(coin.price_change_percentage_24h)}
              {formattedChange}%
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
