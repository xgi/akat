import { TMDB_API } from "./constants";

export type MovieDetails = {
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

export type AlternativeTitles = {
  id: number;
  titles: {
    iso_3166_1: string;
    title: string;
    type: string;
  }[];
};

export type Translations = {
  id: number;
  translations: {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
      title: string;
      overview: string;
      homepage: string;
    };
  }[];
};

export const RELEASE_TYPES: { [key: number]: string } = {
  1: "Premiere",
  2: "Theatrical (limited)",
  3: "Theatrical",
  4: "Digital",
  5: "Physical",
  6: "TV",
};

export type ReleaseDates = {
  id: number;
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      iso_639_1: string;
      release_date: string;
      type: number;
    }[];
  }[];
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
      return json as SearchPage;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const getAlternativeTitles = (
  id: number
): Promise<AlternativeTitles | null> => {
  return fetch(
    `${TMDB_API.URL_BASE}/movie/${id.toString()}/alternative_titles?api_key=${
      TMDB_API.KEY
    }`
  )
    .then((response) => response.json())
    .then((json) => {
      return json as AlternativeTitles;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const getTranslations = (id: number): Promise<Translations | null> => {
  return fetch(
    `${TMDB_API.URL_BASE}/movie/${id.toString()}/translations?api_key=${
      TMDB_API.KEY
    }`
  )
    .then((response) => response.json())
    .then((json) => {
      return json as Translations;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const getReleaseDates = (id: number): Promise<ReleaseDates | null> => {
  return fetch(
    `${TMDB_API.URL_BASE}/movie/${id.toString()}/release_dates?api_key=${
      TMDB_API.KEY
    }`
  )
    .then((response) => response.json())
    .then((json) => {
      return json as ReleaseDates;
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
