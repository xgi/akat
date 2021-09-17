import type { NextPage } from "next";
import Link from "next/link";
import PageHead from "../components/PageHead";

const About: NextPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-brand text-white">
      <PageHead />

      <main className="flex flex-col justify-center w-full flex-1 px-4 text-left w-11/12 lg:w-3/12">
        <Link href="/">
          <a className="mb-4 hover:text-turquoise focus:text-turquoise">
            &larr; Back to AKAT
          </a>
        </Link>
        <h1 className="text-2xl font-bold">What is AKAT?</h1>
        <p className="">
          AKAT (Also Known As Titles) is a tool for finding the titles of movies
          as they were released in different countries.
        </p>
        <h1 className="text-2xl font-bold mt-3">How do I use it?</h1>
        <p>
          Search for a movie from the main page, and we&apos;ll show you the
          title that movie was released with in different regions.
        </p>
        <h1 className="text-2xl font-bold mt-3">Where is the data from?</h1>
        <p>
          Data is retrieved from the{" "}
          <a
            className="border-b border-dotted hover:text-turquoise focus:text-turquoise hover:border-turquoise focus:border-turquoise"
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Movie Database (TMDB)
          </a>{" "}
          API.
        </p>
        <h1 className="text-2xl font-bold mt-3">Is this open source?</h1>
        <p>
          Yes! Source is at{" "}
          <a
            className="border-b border-dotted hover:text-turquoise focus:text-turquoise hover:border-turquoise focus:border-turquoise"
            href="https://github.com/xgi/akat"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/xgi/akat
          </a>
          .
        </p>
      </main>
    </div>
  );
};

export default About;
