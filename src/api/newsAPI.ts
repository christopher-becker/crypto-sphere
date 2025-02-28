import { NEWS_API_URL } from "../core/constants/config.const";

export async function getNewsList() {
  try {
    const endpoint = NEWS_API_URL;
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
