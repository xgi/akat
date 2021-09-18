import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchPopup from "../components/SearchPopup";
import PageHead from "../components/PageHead";
import { NUM_SHOWN_SEARCH_RESULTS } from "../utils/constants";
import { searchMovies, SearchPage } from "../utils/TMDBAPI";
import InfoSection from "../components/InfoSection";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const [showingSearchPopup, setShowingSearchPopup] = useState(false);
  const [searchResponse, setSearchResponse] = useState<
    SearchPage | undefined
  >();
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(-1);
  const [shownMovieId, setShownMovieId] = useState<number | undefined>();

  const showInfo = (id: number) => {
    setShownMovieId(id);
  };

  useEffect(() => {
    if (query !== "") {
      const timeoutID = setTimeout(() => {
        searchMovies(query).then((response) => {
          if (response) {
            setSearchResponse(response);
          } else {
            setSearchResponse(undefined);
          }
        });
      }, 100);
      return () => clearTimeout(timeoutID);
    } else {
      setSearchResponse(undefined);
    }
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen bg-brand text-white">
      <PageHead />

      <main className="flex flex-col items-center w-full flex-1 px-4 text-center mt-36 md:mt-48 xl:mt-52">
        <div className="relative w-full h-20">
          <Image alt="AKAT header" src="/header.svg" layout="fill" />
        </div>

        <p className="mt-3 text-2xl">
          Get movie titles from regions around the world.
        </p>

        <div className="w-full max-w-2xl">
          <div className="mt-4 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
            <input
              autoFocus
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-12 border-0 shadow-lg text-xl rounded-md text-white bg-brand-dark"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!showingSearchPopup) setShowingSearchPopup(true);
              }}
              onFocus={(e) => setShowingSearchPopup(true)}
              onBlur={(e) => setShowingSearchPopup(false)}
              onKeyDownCapture={(e) => {
                switch (e.key) {
                  case "ArrowDown":
                    if (selectedSearchIndex >= NUM_SHOWN_SEARCH_RESULTS - 1) {
                      setSelectedSearchIndex(0);
                    } else {
                      setSelectedSearchIndex(selectedSearchIndex + 1);
                    }
                    e.preventDefault();
                    break;
                  case "ArrowUp":
                    if (selectedSearchIndex <= 0) {
                      setSelectedSearchIndex(NUM_SHOWN_SEARCH_RESULTS - 1);
                    } else {
                      setSelectedSearchIndex(selectedSearchIndex - 1);
                    }
                    e.preventDefault();
                    break;
                  case "Escape":
                    setQuery("");
                    break;
                  case "Enter":
                    setShowingSearchPopup(false);
                    if (selectedSearchIndex !== -1) {
                      const searchResult =
                        searchResponse?.results[selectedSearchIndex];
                      if (searchResult) showInfo(searchResult.id);
                    }
                  default:
                    setSelectedSearchIndex(-1);
                    break;
                }
              }}
            />
          </div>

          {showingSearchPopup ? (
            <SearchPopup
              searchResponse={searchResponse}
              selectedSearchIndex={selectedSearchIndex}
              showInfoCallback={showInfo}
            />
          ) : (
            ""
          )}

          {shownMovieId ? <InfoSection id={shownMovieId} /> : ""}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-12 mt-4">
        <Link href="/about">
          <a className="flex items-center justify-center mx-3 hover:text-turquoise focus:text-turquoise">
            About
          </a>
        </Link>
        {"//"}
        <a
          className="flex items-center justify-center mx-3 hover:text-turquoise focus:text-turquoise"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        {"//"}
        <a
          className="flex items-center justify-center mx-3 hover:text-turquoise focus:text-turquoise"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          License
        </a>
      </footer>
    </div>
  );
};

export default Home;
