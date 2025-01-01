import { useEffect, useState } from "react";
import Lodar from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResult";
import Main from "./components/Main";
import Box from "./components/Box";
import MoiveList from "./components/MovieList";
import SelectedMovie from "./components/SelectedMovie";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";

// const KEY = "d8be2895";

export default function App() {
  const [query, setQuery] = useState("");
  const [seletedId, setSelectedId] = useState(null);
  const { movies, isLoding, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedMovie(id) {
    setSelectedId((seletedId) => (id === seletedId ? null : id));
  }

  function handeCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoding ? <Lodar /> : <MoiveList movies={movies} />} */}
          {isLoding && <Lodar />}
          {!isLoding && !error && (
            <MoiveList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {seletedId ? (
            <SelectedMovie
              seletedId={seletedId}
              onCloseMovie={handeCloseMovie}
              onAddwatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
