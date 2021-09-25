import React from "react";

const HeaderLogo: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80mm"
      height="22mm"
      viewBox="0 0 80 22"
    >
      <defs>
        <path id="a" d="M9.332 10.665h727.905v351.954H9.332z"></path>
      </defs>
      <text
        transform="translate(-.887 -6.757) scale(.26458)"
        style={{ lineHeight: "1.25", whiteSpace: "pre" }}
        fill="#fff"
        fontFamily="sans-serif"
        fontSize="40"
        fontWeight="400"
      >
        <tspan x="9.332" y="100.137">
          <tspan fontFamily="Archivo Black" fontSize="96">
            AKAT
          </tspan>
        </tspan>
      </text>
    </svg>
  );
};

export default HeaderLogo;
