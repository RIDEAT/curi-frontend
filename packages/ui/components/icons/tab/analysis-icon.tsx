import { useIconActive } from "../../../lib/useIconActive";
import { IconProps } from "./interface";

function AnalysisIcon({ active = false }: IconProps) {
  const color = useIconActive(active);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_256_1342)">
        <path
          d="M3 17L9 11L13 15L21 7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 7H21V11"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_256_1342">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { AnalysisIcon };
