import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });
  it("should render the site name", () => {
    const siteName = screen.getByText("Crypto-Sphere");
    expect(siteName.textContent).toBe("Crypto-Sphere");
  });

  it("should render the SearchCoin component", () => {
    const searchCoin = screen.getAllByTestId("search-coin");
    expect(searchCoin.length).toBeGreaterThan(0);
  });
});
