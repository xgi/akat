import Image from "next/image";

type Props = {
  title: string;
  coverSrc: string;
  year: number;
  originalLanguage: string;
  productionCountries: string[];
};

// https://dev.to/jorik/country-code-to-flag-emoji-a21
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const SearchBoxItem: React.FC<Props> = (props: Props) => {
  return (
    <div className="z-40 relative h-20 flex space-x-4 bg-brand-dark hover:bg-indigo-700 border-b border-brand last:border-0 group cursor-pointer">
      <div className="relative w-14">
        <Image
          src={props.coverSrc}
          alt="temp"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="sm:w-10/12 w-9/12 m-auto text-left whitespace-nowrap">
        <p className="truncate" title={props.title}>
          {/* {props.productionCountries.map((countryCode) => (
            <span
              key={countryCode}
              title={countryCode}
              className="mr-1 last:mr-2"
            >
              {getFlagEmoji(countryCode)}
            </span>
          ))} */}

          {props.title}
        </p>
        <p className="truncate text-gray-400 group-hover:text-gray-300">
          {props.year} - {props.originalLanguage}
        </p>
      </div>
    </div>
  );
};

export default SearchBoxItem;
