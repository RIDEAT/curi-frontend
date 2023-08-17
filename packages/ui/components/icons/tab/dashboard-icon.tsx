import { useIconActive } from "../../../lib/useIconActive";
import { IconProps } from "./interface";

export const DashboardIcon = ({ active = false }: IconProps) => {
  const color = useIconActive(active);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_5_895)">
        <path
          d="M9 4.99976H7C6.46957 4.99976 5.96086 5.21047 5.58579 5.58554C5.21071 5.96061 5 6.46932 5 6.99976V18.9998C5 19.5302 5.21071 20.0389 5.58579 20.414C5.96086 20.789 6.46957 20.9998 7 20.9998H17C17.5304 20.9998 18.0391 20.789 18.4142 20.414C18.7893 20.0389 19 19.5302 19 18.9998V6.99976C19 6.46932 18.7893 5.96061 18.4142 5.58554C18.0391 5.21047 17.5304 4.99976 17 4.99976H15"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 4.99976C9 4.46932 9.21071 3.96061 9.58579 3.58554C9.96086 3.21047 10.4696 2.99976 11 2.99976H13C13.5304 2.99976 14.0391 3.21047 14.4142 3.58554C14.7893 3.96061 15 4.46932 15 4.99976C15 5.53019 14.7893 6.0389 14.4142 6.41397C14.0391 6.78904 13.5304 6.99976 13 6.99976H11C10.4696 6.99976 9.96086 6.78904 9.58579 6.41397C9.21071 6.0389 9 5.53019 9 4.99976Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 16.9998V12.9998"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.9998V15.9998"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 16.9998V14.9998"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16.9998V15.9998"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5_895">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 -0.000244141)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
