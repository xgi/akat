import React from "react";
import { NUM_SHOWN_SEARCH_RESULTS } from "../utils/constants";
import { getPosterUrl, SearchPage } from "../utils/TMDBAPI";
import SearchPopupItem from "./SearchPopupItem";

type Props = {
  searchResponse: SearchPage | undefined;
  selectedSearchIndex: number;
};

const SearchPopup: React.FC<Props> = (props: Props) => {
  if (!props.searchResponse || !props.searchResponse.results) return <></>;

  return (
    <div className="mt-2 rounded-md relative w-full max-w-2xl overflow-y-auto border-gray-500 shadow-md">
      {props.searchResponse.results
        .slice(0, NUM_SHOWN_SEARCH_RESULTS)
        .map((result) => (
          <SearchPopupItem
            key={result.id}
            title={result.title}
            coverSrc={
              result.poster_path
                ? getPosterUrl(result.poster_path)
                : "/cover.jpg"
            }
            year={new Date(result.release_date).getFullYear()}
            originalLanguage={result.original_language}
            productionCountries={["US"]}
            selected={
              props.selectedSearchIndex !== -1 &&
              props.searchResponse?.results.indexOf(result) ===
                props.selectedSearchIndex
            }
          />
        ))}
    </div>
  );
};

export default SearchPopup;
