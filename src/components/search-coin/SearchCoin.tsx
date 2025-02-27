import { useContext, useEffect, useMemo, useState } from "react";
import { CoinGeckoContext } from "../../core/context/coinGecko.context";
import { CoinType } from "../../core/types/coinGecko.type";
import { Link } from "react-router-dom";

export default function SearchCoin() {
  const { list } = useContext(CoinGeckoContext);
  const [filterValue, setFilterValue] = useState<string>("");

  const filteredList: CoinType[] = useMemo(() => {
    if (!list || !filterValue.trim()) return [];
    return list.filter(
      (coin) =>
        coin.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [list, filterValue]);

  function handleResetSearchInput() {
    setFilterValue("");
  }

  // Close search on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setFilterValue("");
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="relative">
        <input
          data-testid="search-coin"
          placeholder="Search"
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        {filterValue && (
          <>
            {/* Click outside to close */}
            <div
              className="fixed top-0 left-0 w-full h-full"
              onClick={handleResetSearchInput}
            ></div>

            {/* Search Results */}
            <ul className="absolute right-0 py-4 rounded-2xl bg-gray-900 max-w-xs shadow-2xl w-full mt-2">
              {filteredList.length ? (
                filteredList.slice(0, 4).map((coin) => (
                  <li key={coin.id}>
                    <Link
                      to={`/coin/${coin.id}`}
                      className="flex gap-4 group p-4 px-4 border-b border-slate-800 hover:bg-slate-800 transition-all items-center"
                      onClick={handleResetSearchInput}
                    >
                      <img
                        src={coin.image}
                        className="rounded-3xl h-10 w-10 sm:h-8 sm:w-8 group-hover:shadow-[0_0_8px_#0055ff] group-hover:scale-125 transition-all"
                        alt={coin.name || "Coin Image"}
                      />
                      <div className="flex flex-col">
                        <span>{coin.name}</span>
                        <span className="text-xs uppercase text-gray-500">
                          {coin.symbol}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <span className="p-4 text-gray-400">Nothing found.</span>
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
