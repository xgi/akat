import { TMDB_API } from "./constants";

type MovieDetails = {
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  poster_path: string | null;
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  title: string;
};

export type SearchPage = {
  page: number;
  results: {
    id: number;
    original_language: string;
    original_title: string;
    poster_path: string | null;
    release_date: string;
    title: string;
  }[];
  total_results: number;
};

export const getMovie = (id: number): Promise<MovieDetails | null> => {
  return fetch(
    `${TMDB_API.URL_BASE}/movie/${id.toString()}?api_key=${TMDB_API.KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      return json as MovieDetails;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const searchMovies = (query: string): Promise<SearchPage | null> => {
  return fetch(
    `${TMDB_API.URL_BASE}/search/movie?query=${query}&api_key=${TMDB_API.KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json as SearchPage;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const getPosterUrl = (
  posterPath: string,
  width = 220,
  height = 330
): string => {
  return `https://themoviedb.org/t/p/w${width.toString()}_and_h${height.toString()}_face/${posterPath}`;
};