export const getBgColor = (rate: number) => {
  if (rate < 0.1) {
    return "bg-violet-100 ";
  } else if (rate < 0.3) {
    return "bg-violet-200";
  } else if (rate < 0.5) {
    return "bg-violet-300 text-white";
  } else if (rate < 0.7) {
    return "bg-violet-400 text-white";
  } else if (rate < 0.9) {
    return "bg-violet-500 text-white";
  } else {
    return "bg-violet-700 text-white";
  }
};

export const getTextColor = (
  rate: number,
  scale: "violet" | "normal" = "violet"
) => {
  if (rate < 0.5) {
    return scale == "violet" ? "text-violet-500" : "text-orange-500";
  } else if (rate < 0.7) {
    return scale == "violet" ? "text-violet-600" : "text-orange-500";
  } else if (rate < 0.9) {
    return scale == "violet" ? "text-violet-700" : "text-red-500";
  } else {
    return scale == "violet" ? "text-violet-800" : "text-emerald-400";
  }
};
