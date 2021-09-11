import React from "react";
import SearchBoxItem from "./SearchBoxItem";

const TEMP_DATA = [
  {
    key: 1,
    title: "Some Movie",
    coverSrc: "/cover.jpg",
    year: 2017,
    originalLanguage: "German",
  },
  {
    key: 2,
    title: "Some Movie 2",
    coverSrc: "/cover2.jpg",
    year: 2019,
    originalLanguage: "Japanese",
  },
  {
    key: 3,
    title: "Some Movie 3",
    coverSrc: "/cover.jpg",
    year: 2017,
    originalLanguage: "English",
  },
  {
    key: 4,
    title: "Some Movie 4",
    coverSrc: "/cover2.jpg",
    year: 2021,
    originalLanguage: "Japanese",
  },
];

type Props = {};

const SearchBox: React.FC<Props> = (props: Props) => {
  return (
    <div className="mt-2 rounded-md relative max-h-96 overflow-y-auto border-gray-500 shadow-md">
      {TEMP_DATA.map((item) => (
        <SearchBoxItem
          key={item.key}
          title={item.title}
          coverSrc={item.coverSrc}
          year={item.year}
          originalLanguage={item.originalLanguage}
        />
      ))}
    </div>
  );
};

export default SearchBox;
