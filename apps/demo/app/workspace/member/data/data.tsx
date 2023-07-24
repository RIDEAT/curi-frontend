import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const departments = [
  {
    value: "development",
    label: "개발",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "marketing",
    label: "마케팅",
    icon: CircleIcon,
  },
  {
    value: "design",
    label: "디자인",
    icon: StopwatchIcon,
  },
  {
    value: "business",
    label: "영업",
    icon: CheckCircledIcon,
  },
  {
    value: "hr",
    label: "HR",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
