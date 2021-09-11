import React from "react";
import { getPosterUrl, SearchPage } from "../utils/TMDBAPI";
import SearchBoxItem from "./SearchBoxItem";

const TEMP_DATA = [
  {
    key: 1,
    title:
      "Some Movie Some Movie Some Movie Some Movie Some Movie SQQQome Movie Some Movie Some MoviQQQe Some Movie Some Movie Some Movie Some Movie Some Movie Some Movie ",
    coverSrc: "/cover.jpg",
    year: 2017,
    originalLanguage: "German",
    productionCountries: ["US", "GB"],
  },
  {
    key: 2,
    title: "Some Movie 2",
    coverSrc: "/cover2.jpg",
    year: 2019,
    originalLanguage: "Japanese",
    productionCountries: ["US"],
  },
  {
    key: 3,
    title: "Some Movie 3",
    coverSrc: "/cover.jpg",
    year: 2017,
    originalLanguage: "English",
    productionCountries: ["JP"],
  },
  {
    key: 4,
    title: "Some Movie 4",
    coverSrc: "/cover2.jpg",
    year: 2021,
    originalLanguage: "Japanese",
    productionCountries: ["FR"],
  },
];

type Props = {
  searchResponse: SearchPage | undefined;
};

const SearchBox: React.FC<Props> = (props: Props) => {
  if (!props.searchResponse || !props.searchResponse.results) return <></>;

  return (
    <div className="mt-2 rounded-md relative overflow-y-auto border-gray-500 shadow-md">
      {props.searchResponse.results.slice(0, 4).map((result) => (
        <SearchBoxItem
          key={result.id}
          title={result.title}
          coverSrc={
            result.poster_path ? getPosterUrl(result.poster_path) : "/cover.jpg"
          }
          year={new Date(result.release_date).getFullYear()}
          originalLanguage={result.original_language}
          productionCountries={["US"]}
        />
      ))}
    </div>
  );
};

export default SearchBox;
