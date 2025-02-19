import { Link } from "react-router-dom";
import SearchCoin from "./search-coin/SearchCoin";

export default function Header() {
  return (
    <header>
      <div className="flex gap-4 sm:gap-8 items-center max-w-3xl m-auto">
        <nav className="flex gap-4 flex-1">
          <Link to={"/"} className="flex gap-3 items-center">
            <img className="h-8" src="/logo.png" alt="Crypto Sphere Logo" />
            <strong className="hidden sm:flex">Crypto-Sphere</strong>
          </Link>
        </nav>
        <SearchCoin />
      </div>
    </header>
  );
}
