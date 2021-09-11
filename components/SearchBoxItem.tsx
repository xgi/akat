import Image from "next/image";

type Props = {
  title: string;
  coverSrc: string;
  year: number;
  originalLanguage: string;
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
