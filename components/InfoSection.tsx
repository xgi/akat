import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AlternativeTitles,
  getAlternativeTitles,
  getMovie,
  getPosterUrl,
  getReleaseDates,
  MovieDetails,
  ReleaseDates,
  RELEASE_TYPES,
} from "../utils/TMDBAPI";
import { languageFromCode } from "../utils/languages";
import { countryNameFromCode } from "../utils/countries";
import { formatReleaseDate } from "../utils/layout";

type Props = {
  id: number;
};

// https://dev.to/jorik/country-code-to-flag-emoji-a21
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const getTitlesByCountry = (
  alternativeTitles: AlternativeTitles
): { [code: string]: string[] } => {
  const result: { [code: string]: string[] } = {};

  alternativeTitles.titles.forEach((titleObj) => {
    const existing = result[titleObj.iso_3166_1] || [];
    result[titleObj.iso_3166_1] = [...existing, titleObj.title];
  });

  return result;
};

const InfoSection: React.FC<Props> = (props: Props) => {
  const [details, setDetails] = useState<MovieDetails | undefined>();
  const [alternativeTitles, setAlternativeTitles] = useState<
    AlternativeTitles | undefined
  >();
  const [releaseDates, setReleaseDates] = useState<ReleaseDates | undefined>();
  const [showingFilters, setShowingFilters] = useState(false);
  const [showingReleaseDates, setShowingReleaseDates] = useState(false);

  const loadData = async () => {
    const _details = await getMovie(props.id);
    if (!_details) return;
    setDetails(_details);

    const _alternativeTitles = await getAlternativeTitles(props.id);
    if (!_alternativeTitles) return;
    setAlternativeTitles(_alternativeTitles);

    const _releaseDates = await getReleaseDates(props.id);
    if (!_releaseDates) return;
    setReleaseDates(_releaseDates);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  const renderFilters = () => {
    if (!showingFilters || !alternativeTitles) return;

    return <p>no filters available</p>;
  };

  const renderRegionCards = () => {
    if (!alternativeTitles || !releaseDates) return;

    return Object.entries(getTitlesByCountry(alternativeTitles))
      .sort((a, b) =>
        countryNameFromCode(a[0]).localeCompare(countryNameFromCode(b[0]))
      )
      .map((entry) => {
        const countryCode = entry[0];
        const titles = entry[1];
        const countryName = countryNameFromCode(countryCode);

        const releaseDate = releaseDates.results.find(
          (item) => item.iso_3166_1 === countryCode
        );

        return (
          <div
            key={countryCode}
            className="mt-2 pl-3 pb-3 pt-2 text-left bg-brand-dark rounded-md"
          >
            <p>
              <span
                title={countryName}
                className="mr-1 last:mr-2 cursor-default"
              >
                {getFlagEmoji(countryCode)}
              </span>
              {countryName}
            </p>
            <ul className="list-disc">
              {titles.map((title) => (
                <li key={title} className="truncate text-gray-300 ml-4">
                  {title}
                </li>
              ))}
            </ul>
            {showingReleaseDates && releaseDate ? (
              <ul>
                {releaseDate.release_dates.map((item) => (
                  <li key={item.type}>
                    {RELEASE_TYPES[item.type]} -{" "}
                    {formatReleaseDate(item.release_date)}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
        );
      });
  };

  if (!details) {
    return (
      <p>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </p>
    );
  }

  return (
    <div className="relative justify-center items-center mt-4">
      <div
        className={`relative h-20 mb-4 flex space-x-4 bg-brand-dark border border-highlight-dark`}
      >
        <div className="relative w-14">
          <Image
            src={
              details.poster_path
                ? getPosterUrl(details.poster_path)
                : "/cover.jpg"
            }
            alt={details.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="sm:w-10/12 w-9/12 m-auto text-left whitespace-nowrap">
          <p className="truncate" title={details.title}>
            {details.production_countries.map((country) => (
              <span
                key={country.iso_3166_1}
                title={country.name}
                className="mr-1 last:mr-2 cursor-default"
              >
                {getFlagEmoji(country.iso_3166_1)}
              </span>
            ))}
            {details.original_title}
          </p>
          <p className="truncate text-gray-400">
            {formatReleaseDate(details.release_date)} -{" "}
            {languageFromCode(details.original_language)}
          </p>
        </div>
      </div>
      <p className="text-right">
        <a
          className="text-blue-400 hover:text-turquoise focus:text-turquoise hover:border-turquoise focus:border-turquoise cursor-pointer select-none"
          onClick={() => setShowingReleaseDates(!showingReleaseDates)}
        >
          {showingReleaseDates ? "hide release dates" : "show release dates"}
        </a>{" "}
        /{" "}
        <a
          className="text-blue-400 hover:text-turquoise focus:text-turquoise hover:border-turquoise focus:border-turquoise cursor-pointer select-none"
          onClick={() => setShowingFilters(!showingFilters)}
        >
          filters
        </a>
      </p>
      {renderFilters()}
      {renderRegionCards()}
    </div>
  );
};

export default InfoSection;
