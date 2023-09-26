import axios from "axios";

export interface Game {
  demo: string;
  real: {
    [currency: string]: {
      id: number;
    };
  };
  title: string;
  provider: string;
  collections: {
    _hd: number;
    all: number;
    slots: number;
    novelty: number;
    btcgames: number;
    ethgames: number;
    ltcgames: number;
    dogegames: number;
    usdtgames: number;
    freeSlots: number;
    freeSpins: number;
    pickBonus: number;
    popularity: number;
    turboSpin: number;
    cryptogames: number;
    gambleFeature: number;
    lowVolatility: number;
    guaranteeWins: number;
    stackedSymbols: number;
  };
}

export const fetchGames = async (): Promise<Game[]> => {
  try {
    const response = await axios.get(
      "https://api.myjson.online/v1/records/1bd90536-d813-4d65-be5d-532282facd49"
    );

    const data = response.data.data;
    const games: Game[] = Object.values(data);
    return games;
  } catch (error) {
    throw new Error("Failed to fetch games data");
  }
};
