import { useIconActive } from "../../lib/hook/useIconActive";
import { IconProps } from "./interface";

export const MemberIcon = ({ active = false }: IconProps) => {
  const color = useIconActive(active);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_5_909)">
        <path
          d="M5 7.00024C5 8.06111 5.42143 9.07853 6.17157 9.82867C6.92172 10.5788 7.93913 11.0002 9 11.0002C10.0609 11.0002 11.0783 10.5788 11.8284 9.82867C12.5786 9.07853 13 8.06111 13 7.00024C13 5.93938 12.5786 4.92196 11.8284 4.17182C11.0783 3.42167 10.0609 3.00024 9 3.00024C7.93913 3.00024 6.92172 3.42167 6.17157 4.17182C5.42143 4.92196 5 5.93938 5 7.00024Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 21.0002V19.0002C3 17.9394 3.42143 16.922 4.17157 16.1718C4.92172 15.4217 5.93913 15.0002 7 15.0002H11C12.0609 15.0002 13.0783 15.4217 13.8284 16.1718C14.5786 16.922 15 17.9394 15 19.0002V21.0002"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 3.13025C16.8604 3.35055 17.623 3.85095 18.1676 4.55256C18.7122 5.25417 19.0078 6.11708 19.0078 7.00525C19.0078 7.89342 18.7122 8.75633 18.1676 9.45794C17.623 10.1595 16.8604 10.6599 16 10.8802"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 21.0003V19.0003C20.9949 18.1174 20.6979 17.2611 20.1553 16.5647C19.6126 15.8683 18.8548 15.371 18 15.1503"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5_909">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.000244141)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
