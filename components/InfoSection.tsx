import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AlternativeTitles,
  getAlternativeTitles,
  getMovie,
  getPosterUrl,
  MovieDetails,
} from "../utils/TMDBAPI";
import { languageFromCode } from "../utils/languages";
import { countryNameFromCode } from "../utils/countries";

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

  useEffect(() => {
    getMovie(props.id)
      .then((result) => {
        if (result) {
          setDetails(result);
        }

        return getAlternativeTitles(props.id);
      })
      .then((result) => {
        if (result) {
          setAlternativeTitles(result);
        }
      });
  }, [props.id]);

  const renderAltTitles = () => {
    if (!alternativeTitles) return;

    return Object.entries(getTitlesByCountry(alternativeTitles)).map(
      (entry) => {
        const countryCode = entry[0];
        const titles = entry[1];
        const countryName = countryNameFromCode(countryCode);

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
            {titles.map((title) => (
              <p key={title} className="truncate text-gray-300 ml-4">
                - {title}
              </p>
            ))}
          </div>
        );
      }
    );
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
        className={`relative h-20 mb-6 flex space-x-4 bg-brand-dark rounded-md`}
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
            {new Date(details.release_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - {languageFromCode(details.original_language)}
          </p>
        </div>
      </div>

      {renderAltTitles()}
    </div>
  );
};

export default InfoSection;
