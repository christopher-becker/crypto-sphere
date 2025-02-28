import { useContext } from "react";
import { CoinGeckoContext } from "../../core/context/coinGecko.context";
import { CURRENCIES } from "../../core/constants/config.const";

export default function CurrencySelect() {
  const { updateCurrency, currency: appCurrency } =
    useContext(CoinGeckoContext);
  return (
    <select
      value={appCurrency}
      onChange={(e) => updateCurrency(e.target.value)}
    >
      {CURRENCIES.map((currency) => (
        <option key={currency} value={currency}>
          {currency.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
