function ContentsIcon({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size == "lg" ? "60" : "24"}
      height={size == "lg" ? "60" : "24"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7 21C5.89543 21 5 20.1046 5 19V3H14L19 8V19C19 20.1046 18.1046 21 17 21H7Z"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 3V9H19"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 13H15"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 17H15"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { ContentsIcon };
