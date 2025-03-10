function AttachmentsIcon({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <svg
      width={size == "lg" ? "60" : "24"}
      height={size == "lg" ? "60" : "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_297_1353)">
        <path
          d="M1.99976 14.5C1.99976 16.9853 4.01447 19 6.49976 19H18.4998C20.4328 19 21.9998 17.433 21.9998 15.5C21.9998 13.7367 20.6959 12.278 18.9997 12.0354C19.0087 10.2322 18.3253 8.4261 16.9495 7.05025C14.2158 4.31658 9.78368 4.31658 7.05001 7.05025C6.15066 7.9496 5.54719 9.03278 5.23959 10.1788C3.36766 10.7238 1.99976 12.4522 1.99976 14.5Z"
          stroke="#0019d2"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 11L12 9M12 9L10 11M12 9L12 15"
          stroke="#0019d2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_297_1353">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { AttachmentsIcon };
