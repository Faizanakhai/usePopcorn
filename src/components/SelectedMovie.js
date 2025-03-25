import StarRating from "./StarRating";
import { useState, useEffect, useRef } from "react";
import Lodar from "./Loader";
import { useKey } from "./useKey";
const KEY = "d8be2895";

function SelectedMovie({ seletedId, onCloseMovie, onAddwatched, watched }) {
  const [isLoding, setIsLoding] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current += 1;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(seletedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === seletedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  // if (imdbRating > 8) return <p> Greatest ever</p>;

  // const [isTop, setIstop] = useState(imdbRating > 8);
  // console.log(isTop);
  // useEffect(
  //   function () {
  //     setIstop(imdbRating > 8);
  //   },
  //   [imdbRating]
  // );

  // const [avgRating, setAvgRating] = useState(0);

  function handeAdd() {
    const newWatchedMovie = {
      imdbID: seletedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatinDections: countRef.current,
    };

    onAddwatched(newWatchedMovie);
    onCloseMovie();
    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoding(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${seletedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoding(false);
      }
      getMovieDetails();
    },
    [seletedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoding ? (
        <Lodar />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB raing
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={25}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handeAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
export default SelectedMovie;
