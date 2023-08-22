function TimeLineVerticalElement({
  date,
  left = true,
  right = true,
}: {
  date: string;
  left?: boolean;
  right?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="95"
      height="311"
      viewBox="0 0 95 311"
      fill="none"
    >
      <line
        x1="48"
        y1="4.37114e-08"
        x2="48"
        y2="150"
        stroke="#9101C2"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <text
        x={(() => {
          if (left && right) return "25";
          else if (left && !right) return "25";
          else return "70";
        })()}
        y={145}
        textAnchor="middle"
        fill="#8E00BF"
        fontSize="12"
        fontWeight="bold"
      >
        {"D" + date}
      </text>
      <circle cx="48" cy="156" r="5.5" stroke="#8E00BF" strokeOpacity="0.85" />
      {right && (
        <line
          x1="53"
          y1="156"
          x2="95"
          y2="156"
          stroke="#8E00BF"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      )}
      {left && (
        <line
          x1="1"
          y1="156"
          x2="43"
          y2="156"
          stroke="#8E00BF"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      )}
      <line
        x1="48"
        y1="161"
        x2="48"
        y2="311"
        stroke="#9101C2"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <g filter="url(#filter0_f_13_1369)">
        <circle cx="48" cy="156" r="3" fill="#A400DD" />
      </g>
      <g filter="url(#filter1_f_13_1369)">
        <circle cx="48" cy="156" r="3" fill="#A400BF" />
      </g>
      <defs>
        <filter
          id="filter0_f_13_1369"
          x="40"
          y="148"
          width="16"
          height="16"
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
            stdDeviation="2.5"
            result="effect1_foregroundBlur_13_1369"
          />
        </filter>
        <filter
          id="filter1_f_13_1369"
          x="44"
          y="152"
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
            result="effect1_foregroundBlur_13_1369"
          />
        </filter>
      </defs>
    </svg>
  );
}

function SecondLineVerticalElement() {
  return (
    <svg
      width="47"
      height="309"
      viewBox="0 0 47 309"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1"
        y1="-4.37114e-08"
        x2="1.00001"
        y2="159"
        stroke="#9101C2"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <line
        x1="27"
        y1="154"
        x2="47"
        y2="154"
        stroke="#8E00BF"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeDasharray="2 2"
      />
      <line
        x1="28"
        y1="-4.37114e-08"
        x2="28"
        y2="152"
        stroke="#8E00BF"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeDasharray="2 2"
      />
      <line
        x1="1"
        y1="159"
        x2="0.999993"
        y2="309"
        stroke="#9101C2"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <line
        x1="1"
        y1="1"
        x2="26"
        y2="1"
        stroke="#8E00BF"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

export { TimeLineVerticalElement, SecondLineVerticalElement };
