import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AlternativeTitles,
  getAlternativeTitles,
  getMovie,
  getPosterUrl,
  getReleaseDates,
  getTranslations,
  MovieDetails,
  ReleaseDates,
  RELEASE_TYPES,
  Translations,
} from "../utils/TMDBAPI";
import { languageFromCode } from "../utils/languages";
import { countryNameFromCode } from "../utils/countries";
import { formatReleaseDate } from "../utils/layout";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  id: number;
};

enum TitleType {
  AlternativeTitle,
  Translation,
}

// https://dev.to/jorik/country-code-to-flag-emoji-a21
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const getTitlesByCountry = (
  alternativeTitles: AlternativeTitles,
  translations: Translations
): {
  [code: string]: {
    types: TitleType[];
    title: string;
    tlLanguage?: string;
  }[];
} => {
  const result: {
    [code: string]: {
      types: TitleType[];
      title: string;
      tlLanguage?: string;
    }[];
  } = {};

  translations.translations.forEach((tlObj) => {
    if (tlObj.data.title !== "") {
      const existingArr = result[tlObj.iso_3166_1] || [];
      result[tlObj.iso_3166_1] = [
        ...existingArr,
        {
          types: [TitleType.Translation],
          title: tlObj.data.title,
          tlLanguage: tlObj.name,
        },
      ];
    }
  });

  alternativeTitles.titles.forEach((titleObj) => {
    const existingArr = result[titleObj.iso_3166_1] || [];
    const existingEntryIdx = existingArr.findIndex(
      (entry) => entry.title === titleObj.title
    );

    if (existingEntryIdx === -1) {
      result[titleObj.iso_3166_1] = [
        ...existingArr,
        { types: [TitleType.AlternativeTitle], title: titleObj.title },
      ];
    } else {
      existingArr[existingEntryIdx] = {
        types: [TitleType.Translation, TitleType.AlternativeTitle],
        title: titleObj.title,
        tlLanguage: existingArr[existingEntryIdx].tlLanguage,
      };
    }
  });

  return result;
};

const InfoSection: React.FC<Props> = (props: Props) => {
  const [details, setDetails] = useState<MovieDetails | undefined>();
  const [alternativeTitles, setAlternativeTitles] = useState<
    AlternativeTitles | undefined
  >();
  const [translations, setTranslations] = useState<Translations | undefined>();
  const [releaseDates, setReleaseDates] = useState<ReleaseDates | undefined>();
  const [showingReleaseDates, setShowingReleaseDates] = useState(false);

  const loadData = async () => {
    const _details = await getMovie(props.id);
    if (!_details) {
      setDetails(undefined);
      return;
    }
    setDetails(_details);

    const _alternativeTitles = await getAlternativeTitles(props.id);
    if (!_alternativeTitles) return;
    setAlternativeTitles(_alternativeTitles);

    const _translations = await getTranslations(props.id);
    if (!_translations) return;
    setTranslations(_translations);

    const _releaseDates = await getReleaseDates(props.id);
    if (!_releaseDates) return;
    setReleaseDates(_releaseDates);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  const renderRegionCards = () => {
    if (!alternativeTitles || !translations || !releaseDates) return;

    return Object.entries(getTitlesByCountry(alternativeTitles, translations))
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
            <ul className="list-disc ml-4 text-gray-300">
              {titles.map((titleEntry) => (
                <li
                  key={`${titleEntry.types.join("-")}_${titleEntry.title}`}
                  className="truncate"
                >
                  {titleEntry.types.includes(TitleType.Translation) ? (
                    <span
                      className="border border-gray-400 text-gray-400 px-1.5 mr-2 cursor-default"
                      style={{ fontSize: "0.7rem", lineHeight: 1 }}
                      title={`Translation: ${titleEntry.tlLanguage}`}
                    >
                      TL
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="inline-block">{titleEntry.title}</span>
                </li>
              ))}
            </ul>
            {showingReleaseDates && releaseDate ? (
              <ul className="mt-3 ml-4 text-gray-300">
                {releaseDate.release_dates.map((item) => (
                  <li key={item.type}>
                    <b>{RELEASE_TYPES[item.type]}:</b>{" "}
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
    return <LoadingSpinner />;
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
                : "/blank_poster.svg"
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
        </a>
      </p>
      {renderRegionCards()}
    </div>
  );
};

export default InfoSection;
