import { useContext } from "react";
import { CoinGeckoContext } from "../../core/context/coinGecko.context";
import {
  getPercentageMoveClass,
  getPercentageMoveSymbol,
} from "../../core/utils/percentage.util";
import {
  formatCryptoPrice,
  formatPercentage,
} from "../../core/utils/format.util";
import "./ticker-marquee.css";
import { Link } from "react-router-dom";

export default function TickerMarquee() {
  const { list = [] } = useContext(CoinGeckoContext);
  const style = { "--quantity": list.length || 10 } as React.CSSProperties;

  const marqueeCoinList = list.map((coin) => {
    const priceChange = coin.price_change_percentage_24h ?? 0;
    const formattedChange = formatPercentage(priceChange, 2);
    const formattedPriceChange = formatCryptoPrice(coin.price_change_24h ?? 0);

    return (
      <li key={coin.id}>
        <Link to={`/coin/${coin.id}`} className="flex gap-1">
          <span className={getPercentageMoveClass(priceChange)}>
            {getPercentageMoveSymbol(priceChange)}
          </span>
          <span>{coin.name}</span>
          <span className={getPercentageMoveClass(priceChange)}>
            <span className="hidden sm:inline-flex">
              {formattedPriceChange}
            </span>
            ({formattedChange})
          </span>
        </Link>
      </li>
    );
  });

  return (
    <div className="fixed left-0 bottom-0 w-full">
      <div className="ticker-marquee" style={style}>
        <ul>{marqueeCoinList}</ul>
        <ul aria-hidden="true">{marqueeCoinList}</ul>
      </div>
    </div>
  );
}
