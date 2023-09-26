import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { RootState } from "../redux/store";
import {
  setProviderFilter,
  setCurrencyFilter,
  setSortBy,
  updateGamesList,
} from "../redux/gamesSlice";
import { fetchGames, Game } from "../api/games";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();

  const providerFilter = useSelector(
    (state: RootState) => state.games.filters.provider
  );

  const currencyFilter = useSelector(
    (state: RootState) => state.games.filters.currency
  );

  const sortBy = useSelector((state: RootState) => state.games.sortBy);

  const games: Game[] = useSelector((state: RootState) => state.games.games);

  const { data, isLoading } = useQuery("games", fetchGames, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    onSuccess: (data) => {
      console.log("Данные успешно загружены:", data);
    },
  });

  useEffect(() => {
    const gamesList = Object.entries(data || {}).map(([gameId, gameData]) => ({
      id: gameId,
      ...gameData,
    }));

    dispatch(updateGamesList(gamesList));
  }, [data]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "provider") {
      dispatch(setProviderFilter(value));
    } else if (name === "currency") {
      dispatch(setCurrencyFilter(value));
    }
    const selectedSortOption = "";
    dispatch(setSortBy(selectedSortOption));
  };

  const filteredGames = games.filter((game) => {
    const currencyId = game.real[currencyFilter]?.id;
    return (
      (!providerFilter || game.provider === providerFilter) &&
      (!currencyFilter ? true : !!currencyId)
    );
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === "popularity") {
      const popularityA =
        typeof a.collections?.popularity === "number"
          ? a.collections?.popularity
          : 0;
      const popularityB =
        typeof b.collections?.popularity === "number"
          ? b.collections?.popularity
          : 0;
      return popularityA - popularityB;
    }
    return 0;
  });

  const [visibleGames, setVisibleGames] = useState(12);

  const handleShowMoreClick = () => {
    setVisibleGames((prevVisibleGames) => prevVisibleGames + 12);
  };

  const handleGameClick = (game: { title: string }) => {
    localStorage.setItem("selectedGameTitle", game.title);
  };

  return (
    <section className="container">
      <section className="filters">
        <select
          name="provider"
          value={providerFilter}
          onChange={handleFilterChange}
        >
          <option value="">Все</option>
          {Array.from(new Set(games.map((game) => game.provider))).map(
            (provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            )
          )}
        </select>{" "}
        <select
          name="currency"
          value={currencyFilter}
          onChange={handleFilterChange}
        >
          <option value="">Все</option>
          {Object.keys(data?.[0]?.real || {}).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </section>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section className="game-list">
            {sortedGames.slice(0, visibleGames).map((game) => (
              <div className="game-list-block" key={game.title}>
                <Link onClick={() => handleGameClick(game)} to={game.demo}>
                  <div className="image">Game Image</div>
                  {game.title}
                </Link>
              </div>
            ))}
          </section>

          <button onClick={handleShowMoreClick}>Показать еще</button>
        </>
      )}
    </section>
  );
}

export default HomePage;
