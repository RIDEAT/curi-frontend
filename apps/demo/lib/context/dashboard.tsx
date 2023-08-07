"use client";

import { atom } from "jotai";

export interface IMemberWorkspace {
  id: number;
  name: string;
  startDate: string;
  progressRate: number;
  status: "inProgress" | "completed";
  sequences: ISequenceData[];
  eNPS: number;
}

export interface IWorkflowData {
  id: number;
  name: string;
  waiting: number;
  inProgress: number;
  completed: number;
  members: IMemberWorkspace[];
}

const MEMBER_NAMES = [
  "김철수",
  "김영희",
  "김영수",
  "김영미",
  "김희정",
  "김민수",
  "김민희",
  "최철수",
  "최영희",
  "최영수",
  "고석원",
  "박지원",
  "이민호",
  "한지영",
  "송승현",
  "전은지",
  "윤동현",
  "장민주",
  "강영민",
  "이지윤",
  "이준호",
  "임수진",
  "한동욱",
  "김수진",
  "정태우",
  "황미영",
  "신재원",
  "김혜진",
  "정대현",
  "이영숙",
  "오승준",
  "신현주",
  "임대현",
  "최미희",
  "박준호",
  "정하은",
  "송영진",
  "강서연",
  "이진우",
  "임주희",
  "황태영",
  "신재연",
  "장진우",
  "이미현",
  "임승호",
  "한미경",
  "김재우",
  "정지수",
  "윤석호",
  "이채원",
  "임동혁",
  "황미진",
  "신정환",
  "장혜진",
  "강민호",
];

const getRandomMemberName = () => {
  const randomIndex = Math.floor(Math.random() * MEMBER_NAMES.length);
  return MEMBER_NAMES[randomIndex];
};

const WORKFLOW_NAMES = [
  "신입 사원 공통 온보딩",
  "경력 사원 공통 온보딩",
  "육아 휴직 사원 리보딩",
  "정기 안전 교육",
  "주니어 백엔드 개발자 교육",
];

const SEQEUENCE_NAMES = [
  "필수 서류 제출",
  "환영하기",
  "입사일 D-Day",
  "IT 기기 세팅",
  "1:1 매니저 면담",
  "신입사원 필수 교육",
];

export interface ISequenceData {
  id: number;
  title: string;
  status: "inProgress" | "completed";
}

const sequenceDataList: ISequenceData[] = [
  {
    id: 1,
    title: SEQEUENCE_NAMES[0],
    status: "completed",
  },
  {
    id: 2,
    title: SEQEUENCE_NAMES[1],
    status: "completed",
  },
  {
    id: 3,
    title: SEQEUENCE_NAMES[2],
    status: "completed",
  },
  {
    id: 4,
    title: SEQEUENCE_NAMES[3],
    status: "completed",
  },
  {
    id: 5,
    title: SEQEUENCE_NAMES[4],
    status: "completed",
  },
  {
    id: 6,
    title: SEQEUENCE_NAMES[5],
    status: "completed",
  },
];

const getNewSequenceDataList = (
  sequenceDataList: ISequenceData[],
  pivot: number
) => {
  return sequenceDataList.map((sequence) => {
    return {
      ...sequence,
      status: sequence.id > pivot ? "inProgress" : sequence.status,
    };
  });
};

const membersDataFor0: IMemberWorkspace[] = [
  {
    id: 1,
    name: MEMBER_NAMES[1],
    startDate: "2023-05-04",
    progressRate: 0.5,
    status: "inProgress",
    sequences: getNewSequenceDataList(sequenceDataList, 3),
    eNPS: 88.9,
  },
  {
    id: 2,
    name: MEMBER_NAMES[2],
    startDate: "2023-04-11",
    progressRate: 0.7,
    status: "inProgress",
    sequences: getNewSequenceDataList(sequenceDataList, 4),
    eNPS: 90.2,
  },
  {
    id: 3,
    name: MEMBER_NAMES[3],
    startDate: "2023-04-23",
    progressRate: 0.9,
    status: "inProgress",
    sequences: getNewSequenceDataList(sequenceDataList, 5),
    eNPS: 83.2,
  },
  {
    id: 4,
    name: MEMBER_NAMES[4],
    startDate: "2023-03-01",
    progressRate: 0.3,
    status: "inProgress",
    sequences: getNewSequenceDataList(sequenceDataList, 2),
    eNPS: 93.2,
  },
  {
    id: 5,
    name: MEMBER_NAMES[5],
    startDate: "2023-01-05",
    progressRate: 1,
    status: "completed",
    sequences: getNewSequenceDataList(sequenceDataList, 7),
    eNPS: 95.9,
  },
];

const workflowDataList: IWorkflowData[] = [
  {
    id: 1,
    name: WORKFLOW_NAMES[0],
    waiting: 2,
    inProgress: 3,
    completed: 7,
    members: membersDataFor0,
  },
  {
    id: 2,
    name: WORKFLOW_NAMES[3],
    waiting: 0,
    inProgress: 2,
    completed: 6,
    members: [], // TODO : make membersDataFor1
  },
  {
    id: 3,
    name: "육아 휴직 사원 리보딩",
    waiting: 2,
    inProgress: 3,
    completed: 1,
    members: [], // TODO : make membersDataFor2
  },
  {
    id: 4,
    name: "정기 안전 교육",
    waiting: 30,
    inProgress: 0,
    completed: 0,
    members: [], // TODO : make membersDataFor3
  },
  {
    id: 5,
    name: "주니어 백엔드 개발자 교육",
    waiting: 0,
    inProgress: 1,
    completed: 8,
    members: [], // TODO : make membersDataFor4
  },
];

const generateMemberData = (
  numMembers: number,
  numWaiting: number,
  numCompleted: number
) => {
  const members: IMemberWorkspace[] = [];

  for (let i = 0; i < numMembers; i++) {
    const randomName = getRandomMemberName();
    const randomStartDate = `2023-${Math.floor(Math.random() * 12 + 1)
      .toString()
      .padStart(2, "0")}-${Math.floor(Math.random() * 28 + 1)
      .toString()
      .padStart(2, "0")}`;

    // For waiting members
    if (i < numWaiting) {
      members.push({
        id: i + 1,
        name: randomName,
        startDate: randomStartDate,
        progressRate: 0,
        status: "inProgress",
        sequences: sequenceDataList.map((sequence) => ({
          ...sequence,
          status: "inProgress",
        })),
        eNPS: +(Math.random() * 28 + 70).toFixed(1),
      });
      continue;
    }

    // For completed members
    if (i < numWaiting + numCompleted) {
      members.push({
        id: i + 1,
        name: randomName,
        startDate: randomStartDate,
        progressRate: 1, // 100%
        status: "completed",
        sequences: sequenceDataList.map((sequence) => ({
          ...sequence,
          status: "completed",
        })),
        eNPS: +(Math.random() * 28 + 70).toFixed(1),
      });
      continue;
    }

    // For inProgress members
    const progressRate = Math.floor(Math.random() * (70 - 20 + 1) + 20) / 100; // Randomly choose a rate between 20 and 70
    const totalSequences = sequenceDataList.length;
    const numberOfCompletedSequences = Math.round(
      (progressRate / 100) * totalSequences
    ); // Calculate how many sequences need to be completed

    // Create a new sequences list
    const sequences: ISequenceData[] = [...sequenceDataList];
    for (let j = 0; j < totalSequences; j++) {
      if (j < numberOfCompletedSequences) {
        sequences[j].status = "completed";
      } else {
        sequences[j].status = "inProgress";
      }
    }

    members.push({
      id: i + 1,
      name: randomName,
      startDate: randomStartDate,
      progressRate: progressRate,
      status: "inProgress",
      sequences: sequences,
      eNPS: +(Math.random() * 28 + 70).toFixed(1),
    });
  }
  return members;
};

const membersDataFor1 = generateMemberData(
  5,
  workflowDataList[1].waiting,
  workflowDataList[1].completed
);
const membersDataFor2 = generateMemberData(
  6,
  workflowDataList[2].waiting,
  workflowDataList[2].completed
);
const membersDataFor3 = generateMemberData(
  30,
  workflowDataList[3].waiting,
  workflowDataList[3].completed
);
const membersDataFor4 = generateMemberData(
  9,
  workflowDataList[4].waiting,
  workflowDataList[4].completed
);

// Re-assigning to the workflowDataList to use the newly generated members
workflowDataList[1].members = membersDataFor1;
workflowDataList[2].members = membersDataFor2;
workflowDataList[3].members = membersDataFor3;
workflowDataList[4].members = membersDataFor4;

export const workflowDataListAtom = atom<IWorkflowData[]>(workflowDataList);
export const selectedWorkflowIdAtom = atom(workflowDataList[0].id);
