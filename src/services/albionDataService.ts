import axios from 'axios';
import Bottleneck from 'bottleneck';
import { arr } from '../types'; // Assuming 'arr' type is defined in '../types'

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000, // 1 request per second
});

export interface MarketPriceData {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

export const fetchItemPrice = async (
  location: string,
  itemIdBase: string, // e.g., "T4_FIBER"
  tier: number,
  enchantment: number,
  isLeveledResource: boolean
): Promise<number | null> => {
  let myURL = `https://www.albion-online-data.com/api/v2/stats/Prices/T${tier}_${itemIdBase}`;
  if (isLeveledResource && enchantment > 0) {
    myURL += `_LEVEL${enchantment}`;
  } else if (enchantment > 0 && !isLeveledResource) {
    myURL += `@${enchantment}`;
  }
  myURL += `.json?locations=${location}`;

  try {
    const response = await limiter.schedule(() => axios.get<MarketPriceData[]>(myURL));
    if (response.data && response.data.length > 0) {
      const priceData = response.data[0];
      let bigger = 0;
      if (priceData.sell_price_min > priceData.buy_price_min) {
        bigger = priceData.sell_price_min;
      } else {
        bigger = priceData.buy_price_min;
      }
      if (bigger === 0) {
        bigger = 99999999; // Default to a large number if price is 0
      }
      return bigger;
    }
    return null; // No data found
  } catch (error) {
    console.error(`Error fetching item price for ${itemIdBase} in ${location}:`, error);
    return null;
  }
};

export const fetchArtifactPrice = async (
  location: string,
  artifactName: string, // e.g., "HEAD_CLOTH_KEEPER"
  tier: number
): Promise<number | null> => {
  const myURL = `https://www.albion-online-data.com/api/v2/stats/Prices/T${tier}_ARTEFACT_${artifactName}.json?locations=${location}`;

  try {
    const response = await limiter.schedule(() => axios.get<MarketPriceData[]>(myURL));
    if (response.data && response.data.length > 0) {
      const priceData = response.data[0];
      let bigger = 0;
      if (priceData.sell_price_min > priceData.buy_price_min) {
        bigger = priceData.sell_price_min;
      } else {
        bigger = priceData.buy_price_min;
      }
      if (bigger === 0) {
        bigger = 99999999;
      }
      return bigger;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching artifact price for ${artifactName} in ${location}:`, error);
    return null;
  }
};

export const fetchHeartPrice = async (
  location: string,
  heartName: string // e.g., "FOREST_TOKEN_1"
): Promise<number | null> => {
  const myURL = `https://www.albion-online-data.com/api/v2/stats/Prices/T1_FACTION_${heartName}.json?locations=${location}`;

  try {
    const response = await limiter.schedule(() => axios.get<MarketPriceData[]>(myURL));
    if (response.data && response.data.length > 0) {
      const priceData = response.data[0];
      let bigger = 0;
      if (priceData.sell_price_min > priceData.buy_price_min) {
        bigger = priceData.sell_price_min;
      } else {
        bigger = priceData.buy_price_min;
      }
      if (bigger === 0) {
        bigger = 99999999;
      }
      return bigger;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching heart price for ${heartName} in ${location}:`, error);
    return null;
  }
};
