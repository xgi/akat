import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import { searchMovies, SearchPage } from "../utils/TMDBAPI";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const [searchResponse, setSearchResponse] = useState<
    SearchPage | undefined
  >();

  useEffect(() => {
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
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand text-white">
      <Head>
        <title>AKAT - Movie titles from different regions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 mb-24 text-center">
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
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-12 border-0 shadow-lg text-xl rounded-md text-white bg-brand-dark"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <SearchBox searchResponse={searchResponse} />

          <div className="relative justify-center items-center">
            <p>some text</p>
            <p>some text</p>
            <p>some text</p>
            <p>some text</p>
            <p>some text</p>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-12 border-t">
        <a
          className="flex items-center justify-center mx-3 hover:text-turquoise focus:text-turquoise"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
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
