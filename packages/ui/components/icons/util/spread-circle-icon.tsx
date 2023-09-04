function SpreadCircleIcon({ color = "#00D94A" }: { color?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="5.5" stroke={color} strokeOpacity="0.85" />
      <g filter="url(#filter0_f_259_1372)">
        <circle cx="6" cy="6" r="3" fill={color} />
      </g>
      <defs>
        <filter
          id="filter0_f_259_1372"
          x="2"
          y="2"
          width="8"
          height="8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.5"
            result="effect1_foregroundBlur_259_1372"
          />
        </filter>
      </defs>
    </svg>
  );
}

export { SpreadCircleIcon };
