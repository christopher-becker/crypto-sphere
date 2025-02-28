import { Link } from "react-router-dom";
import SearchCoin from "./search-coin/SearchCoin";
import CurrencySelect from "./currency-select/CurrencySelect";

export default function Header() {
  return (
    <header>
      <div className="flex gap-4 sm:gap-8 items-center max-w-3xl m-auto">
        <nav className="flex gap-4 flex-1">
          <Link to={"/"} className="flex gap-3 items-center">
            <img className="h-8 w-8" src="/logo.png" alt="Crypto Sphere Logo" />
            <strong className="hidden sm:flex">Crypto-Sphere</strong>
          </Link>
        </nav>
        <div className="flex gap-2">
          <SearchCoin />
          <CurrencySelect />
        </div>
      </div>
    </header>
  );
}
