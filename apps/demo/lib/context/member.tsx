import { atom } from "jotai";

// jotai atom
interface Employee {
  id: number;
  name: string;
  department: string;
  startDate: string;
  buddy: string;
  manager: string;
  email: string;
  phoneNum: string;
}

interface Manager {
  id: number;
  name: string;
  department: string;
  email: string;
  phoneNum: string;
}

export const employeeAtom = atom<Employee[]>([
  {
    id: 1,
    name: "김철수",
    department: "개발",
    startDate: "2021-01-01",
    buddy: "이영희",
    manager: "홍길동",
    email: "rlacjftn@naver.com",
    phoneNum: "010-1234-5678",
  },
  {
    id: 2,
    name: "홍길동",
    department: "HR",
    startDate: "2022-02-14",
    buddy: "김영수",
    manager: "이영희",
    email: "hong.gildong@example.com",
    phoneNum: "010-9876-5432",
  },
  {
    id: 3,
    name: "이영수",
    department: "디자인",
    startDate: "2020-09-30",
    buddy: "김미영",
    manager: "홍길동",
    email: "leeyoung@example.com",
    phoneNum: "010-8765-4321",
  },
  {
    id: 4,
    name: "김미영",
    department: "마케팅",
    startDate: "2022-07-10",
    buddy: "박준호",
    manager: "이영희",
    email: "kim.miyoung@example.com",
    phoneNum: "010-4567-8901",
  },
  {
    id: 5,
    name: "박준호",
    department: "개발",
    startDate: "2021-11-25",
    buddy: "김미영",
    manager: "김철수",
    email: "junho.park@example.com",
    phoneNum: "010-7654-3210",
  },
  {
    id: 6,
    name: "이미진",
    department: "디자인",
    startDate: "2020-05-18",
    buddy: "김영수",
    manager: "홍길동",
    email: "lee.mijin@example.com",
    phoneNum: "010-6789-0123",
  },
  {
    id: 7,
    name: "김영호",
    department: "영업",
    startDate: "2022-04-05",
    buddy: "박준영",
    manager: "이영희",
    email: "kim.youngho@example.com",
    phoneNum: "010-2345-6789",
  },
  {
    id: 8,
    name: "최지은",
    department: "마케팅",
    startDate: "2021-08-20",
    buddy: "김미영",
    manager: "김철수",
    email: "jiun.choi@example.com",
    phoneNum: "010-9876-5432",
  },
  {
    id: 9,
    name: "이준서",
    department: "영업",
    startDate: "2022-01-30",
    buddy: "박준영",
    manager: "김영수",
    email: "junseo.lee@example.com",
    phoneNum: "010-8765-4321",
  },
  {
    id: 10,
    name: "김민지",
    department: "개발",
    startDate: "2020-12-12",
    buddy: "이미진",
    manager: "홍길동",
    email: "minji.kim@example.com",
    phoneNum: "010-4567-8901",
  },
  {
    id: 11,
    name: "이영희",
    department: "디자인",
    startDate: "2021-06-27",
    buddy: "김영수",
    manager: "홍길동",
    email: "yeonghee@example.com",
    phoneNum: "010-2345-6789",
  },
  {
    id: 12,
    name: "박민준",
    department: "개발",
    startDate: "2022-03-03",
    buddy: "김철수",
    manager: "홍길동",
    email: "minjun.park@example.com",
    phoneNum: "010-7890-1234",
  },
  {
    id: 13,
    name: "김지유",
    department: "HR",
    startDate: "2021-09-15",
    buddy: "이영희",
    manager: "김영수",
    email: "jiyu.kim@example.com",
    phoneNum: "010-5678-9012",
  },
  {
    id: 14,
    name: "이민서",
    department: "마케팅",
    startDate: "2020-07-08",
    buddy: "김미영",
    manager: "이영수",
    email: "minseo.lee@example.com",
    phoneNum: "010-4567-8901",
  },
  {
    id: 15,
    name: "홍지호",
    department: "개발",
    startDate: "2022-05-20",
    buddy: "이미진",
    manager: "김철수",
    email: "jih.hong@example.com",
    phoneNum: "010-6789-0123",
  },
  {
    id: 16,
    name: "김윤서",
    department: "디자인",
    startDate: "2021-03-12",
    buddy: "김영수",
    manager: "홍길동",
    email: "yoonseo.kim@example.com",
    phoneNum: "010-2345-6789",
  },
  {
    id: 17,
    name: "이준영",
    department: "영업",
    startDate: "2020-11-28",
    buddy: "박준영",
    manager: "이영희",
    email: "junyeong.lee@example.com",
    phoneNum: "010-8765-4321",
  },
  {
    id: 18,
    name: "박영준",
    department: "마케팅",
    startDate: "2021-12-24",
    buddy: "김미영",
    manager: "김영수",
    email: "youngjun.park@example.com",
    phoneNum: "010-4567-8901",
  },
  {
    id: 19,
    name: "김서윤",
    department: "마케팅",
    startDate: "2022-10-06",
    buddy: "김미영",
    manager: "이영희",
    email: "seoyoon.kim@example.com",
    phoneNum: "010-7890-1234",
  },
  {
    id: 20,
    name: "최준우",
    department: "HR",
    startDate: "2021-04-17",
    buddy: "김영수",
    manager: "김철수",
    email: "junwoo.choi@example.com",
    phoneNum: "010-5678-9012",
  },
]);

export const managerAtom = atom<Manager[]>([
  {
    id: 1,
    name: "홍길동",
    department: "개발",
    email: "ghdrlfehd@gmail.com",
    phoneNum: "010-1234-5678",
  },
  {
    id: 2,
    name: "이영희",
    department: "디자인",
    email: "yeonghee@example.com",
    phoneNum: "010-9876-5432",
  },
  {
    id: 3,
    name: "김영수",
    department: "영업",
    email: "youngsoo@example.com",
    phoneNum: "010-8765-4321",
  },
  {
    id: 4,
    name: "김미영",
    department: "마케팅",
    email: "miyoung@example.com",
    phoneNum: "010-4567-8901",
  },
  {
    id: 5,
    name: "김철수",
    department: "HR",
    email: "chulsoo@example.com",
    phoneNum: "010-7890-1234",
  },
  {
    id: 6,
    name: "박준호",
    department: "개발",
    email: "junho@example.com",
    phoneNum: "010-2345-6789",
  },
  {
    id: 7,
    name: "이미진",
    department: "디자인",
    email: "mijin@example.com",
    phoneNum: "010-6789-0123",
  },
  {
    id: 8,
    name: "박준영",
    department: "영업",
    email: "junyeong@example.com",
    phoneNum: "010-3456-7890",
  },
  {
    id: 9,
    name: "김민지",
    department: "마케팅",
    email: "minji@example.com",
    phoneNum: "010-9876-5432",
  },
  {
    id: 10,
    name: "이영수",
    department: "HR",
    email: "yeongsoo@example.com",
    phoneNum: "010-8765-4321",
  },
  {
    id: 11,
    name: "김영호",
    department: "개발",
    email: "youngho@example.com",
    phoneNum: "010-7654-3210",
  },
  {
    id: 12,
    name: "김지은",
    department: "디자인",
    email: "ji.eun@example.com",
    phoneNum: "010-6543-2109",
  },
  {
    id: 13,
    name: "이준서",
    department: "영업",
    email: "junseo@example.com",
    phoneNum: "010-5432-1098",
  },
  {
    id: 14,
    name: "홍지호",
    department: "마케팅",
    email: "jih@example.com",
    phoneNum: "010-4321-0987",
  },
  {
    id: 15,
    name: "김윤서",
    department: "개발",
    email: "yoonseo@example.com",
    phoneNum: "010-3210-9876",
  },
  {
    id: 16,
    name: "이민서",
    department: "디자인",
    email: "minseo@example.com",
    phoneNum: "010-2109-8765",
  },
  {
    id: 17,
    name: "박영준",
    department: "영업",
    email: "youngjun@example.com",
    phoneNum: "010-1098-7654",
  },
  {
    id: 18,
    name: "김서윤",
    department: "마케팅",
    email: "seoyoon@example.com",
    phoneNum: "010-0987-6543",
  },
  {
    id: 19,
    name: "최준우",
    department: "개발",
    email: "junwoo@example.com",
    phoneNum: "010-9876-5432",
  },
  {
    id: 20,
    name: "이준영",
    department: "디자인",
    email: "junyeong@example.com",
    phoneNum: "010-8765-4321",
  },
]);
