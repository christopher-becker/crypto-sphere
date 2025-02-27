import { COINGECKO_API_URL } from "../core/constants/config.const";

export async function getCoinsList(currency: string = "usd") {
  try {
    const endpoint = `${COINGECKO_API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch coins list data: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCoinDetail(id: string) {
  try {
    const endpoint = `${COINGECKO_API_URL}/coins/${id}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch coin detail: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
