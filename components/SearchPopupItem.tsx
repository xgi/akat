import Image from "next/image";
import { languageFromCode } from "../utils/languages";

type Props = {
  id: number;
  title: string;
  coverSrc: string;
  year: number;
  originalLanguage: string;
  productionCountries: string[];
  selected: boolean;
  showInfoCallback: (id: number) => void;
};

const SearchPopupItem: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={`z-40 relative h-20 flex space-x-4 bg-brand-dark hover:bg-indigo-700 ${
        props.selected ? "bg-indigo-700" : ""
      } border-b border-brand last:border-0 group cursor-pointer`}
      onMouseDown={() => props.showInfoCallback(props.id)}
    >
      <div className="relative w-14">
        <Image
          src={props.coverSrc}
          alt={props.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="sm:w-10/12 w-9/12 m-auto text-left whitespace-nowrap">
        <p className="truncate" title={props.title}>
          {props.title}
        </p>
        <p
          className={`truncate text-gray-400 group-hover:text-gray-300 ${
            props.selected ? "text-gray-300" : ""
          }`}
        >
          {Number.isNaN(props.year) ? "Unknown Year" : props.year} -{" "}
          {languageFromCode(props.originalLanguage)}
        </p>
      </div>
    </div>
  );
};

export default SearchPopupItem;
