import { useIconActive } from "../../lib/hook/useIconActive";
import { IconProps } from "./interface";

export const WorkflowIcon = ({ active = false }: IconProps) => {
  const color = useIconActive(active);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_5_878)">
        <path
          d="M3 3.00024V21.0002H21"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 9.00024C7 9.53068 7.21071 10.0394 7.58579 10.4145C7.96086 10.7895 8.46957 11.0002 9 11.0002C9.53043 11.0002 10.0391 10.7895 10.4142 10.4145C10.7893 10.0394 11 9.53068 11 9.00024C11 8.46981 10.7893 7.9611 10.4142 7.58603C10.0391 7.21096 9.53043 7.00024 9 7.00024C8.46957 7.00024 7.96086 7.21096 7.58579 7.58603C7.21071 7.9611 7 8.46981 7 9.00024Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 7.00024C17 7.53068 17.2107 8.03938 17.5858 8.41446C17.9609 8.78953 18.4696 9.00024 19 9.00024C19.5304 9.00024 20.0391 8.78953 20.4142 8.41446C20.7893 8.03938 21 7.53068 21 7.00024C21 6.46981 20.7893 5.9611 20.4142 5.58603C20.0391 5.21096 19.5304 5.00024 19 5.00024C18.4696 5.00024 17.9609 5.21096 17.5858 5.58603C17.2107 5.9611 17 6.46981 17 7.00024Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15.0002C12 15.5307 12.2107 16.0394 12.5858 16.4145C12.9609 16.7895 13.4696 17.0002 14 17.0002C14.5304 17.0002 15.0391 16.7895 15.4142 16.4145C15.7893 16.0394 16 15.5307 16 15.0002C16 14.4698 15.7893 13.9611 15.4142 13.586C15.0391 13.211 14.5304 13.0002 14 13.0002C13.4696 13.0002 12.9609 13.211 12.5858 13.586C12.2107 13.9611 12 14.4698 12 15.0002Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.16 10.6202L12.5 13.5002"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.088 13.3282L17.925 8.74225"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5_878">
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
