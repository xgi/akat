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
    <div className="relative h-20 flex flex-col justify-center bg-brand-dark hover:bg-indigo-700 border-b border-brand last:border-0">
      <div className="absolute inset-y-0 flex w-14">
        <Image
          src={props.coverSrc}
          alt="temp"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full text-left pl-20 pr-4 whitespace-nowrap">
        <p className="truncate" title={props.title}>
          {props.productionCountries.map((countryCode) => (
            <span
              key={countryCode}
              title={countryCode}
              className="mr-1 last:mr-2"
            >
              {getFlagEmoji(countryCode)}
            </span>
          ))}

          {props.title}
        </p>
        <p className="truncate text-gray-400">
          {props.year} - {props.originalLanguage}
        </p>
      </div>
    </div>
  );
};

export default SearchBoxItem;
