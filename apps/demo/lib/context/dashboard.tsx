import { atom } from "jotai";

interface IWorkflowData {
  id: number;
  name: string;
  waiting: number;
  inProgress: number;
  completed: number;
}

const workflowDataList: IWorkflowData[] = [
  {
    id: 1,
    name: "신입 사원 공통 온보딩",
    waiting: 2,
    inProgress: 3,
    completed: 7,
  },
  {
    id: 2,
    name: "경력 사원 공통 온보딩",
    waiting: 0,
    inProgress: 2,
    completed: 6,
  },
  {
    id: 3,
    name: "육아 휴직 사원 리보딩",
    waiting: 2,
    inProgress: 3,
    completed: 1,
  },
  {
    id: 4,
    name: "정기 안전 교육",
    waiting: 30,
    inProgress: 0,
    completed: 0,
  },
  {
    id: 5,
    name: "주니어 백엔드 개발자 교육",
    waiting: 0,
    inProgress: 1,
    completed: 8,
  },
];

export const workflowDataListAtom = atom<IWorkflowData[]>(workflowDataList);
export const selectedWorkflowIdAtom = atom(workflowDataList[0].id);
