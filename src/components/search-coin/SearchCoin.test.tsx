import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SearchCoin from "./SearchCoin";

describe("SearchCoin Component", () => {
  render(<SearchCoin />);

  it("should render input with placeholder", () => {
    const searchCoinInput = screen.getAllByTestId("search-coin");
    searchCoinInput.forEach((input) => {
      expect(input.getAttribute("placeholder")).toBe("Search");
    });
  });
});
