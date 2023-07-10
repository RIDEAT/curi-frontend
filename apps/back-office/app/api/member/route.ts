import { NextResponse } from "next/server";

export async function GET(request) {
  // [TODO] 검증 - 해당 워크스페이스에 들어갈 수 있는지

  return NextResponse.json(
    {
      list: [
        {
          id: 1,
          name: "류현진",
          email: "fbguswls@naver.com",
          phoneNumber: "010-1234-5678",
          StartDate: "2021-01-01",
          role: {
            type: "employee",
          },
        },
        {
          id: 2,
          name: "김연아",
          email: "kya@naver.com",
          phoneNumber: "010-9876-5432",
          StartDate: "2021-02-15",
          role: {
            type: "mentor",
          },
        },
        {
          id: 3,
          name: "손흥민",
          email: "thfcsonny@gmail.com",
          phoneNumber: "010-2468-1357",
          StartDate: "2021-03-10",
          role: {
            type: "employee",
          },
        },
        {
          id: 4,
          name: "이정후",
          email: "ljh@kbo.com",
          phoneNumber: "010-5555-9999",
          StartDate: "2021-04-22",
          role: {
            type: "employee",
          },
        },
        {
          id: 5,
          name: "박지성",
          email: "jspark@mu.com",
          phoneNumber: "010-7777-2222",
          StartDate: "2021-05-07",
          role: {
            type: "employee",
          },
        },
        {
          id: 6,
          name: "손승원",
          email: "ssw@naver.com",
          phoneNumber: "010-1212-3434",
          StartDate: "2021-06-19",
          role: {
            type: "employee",
          },
        },
        {
          id: 7,
          name: "박세리",
          email: "seri@lpga.com",
          phoneNumber: "010-9999-1111",
          StartDate: "2021-07-25",
          role: {
            type: "employee",
          },
        },
        {
          id: 8,
          name: "박찬호",
          email: "pitcherpc@kia.com",
          phoneNumber: "010-8888-3333",
          StartDate: "2021-08-03",
          role: {
            type: "mentor",
          },
        },
        {
          id: 9,
          name: "김연경",
          email: "yykim@kovo.com",
          phoneNumber: "010-7777-4444",
          StartDate: "2021-09-12",
          role: {
            type: "admin",
          },
        },
        {
          id: 10,
          name: "유재석",
          email: "jaeseok@kbs.com",
          phoneNumber: "010-2222-8888",
          StartDate: "2021-10-08",
          role: {
            type: "mentor",
          },
        },
        {
          id: 11,
          name: "강호동",
          email: "hodong@sbs.com",
          phoneNumber: "010-3333-7777",
          StartDate: "2021-11-29",
          role: {
            type: "admin",
          },
        },
        {
          id: 12,
          name: "박명수",
          email: "myungsuduk@kbs.com",
          phoneNumber: "010-6666-3333",
          StartDate: "2022-01-02",
          role: {
            type: "admin",
          },
        },
        {
          id: 13,
          name: "이승기",
          email: "seunggi@mbc.com",
          phoneNumber: "010-1111-5555",
          StartDate: "2022-02-14",
          role: {
            type: "admin",
          },
        },
        {
          id: 14,
          name: "전지현",
          email: "jihyun@sidushq.com",
          phoneNumber: "010-5555-2222",
          StartDate: "2022-03-27",
          role: {
            type: "employee",
          },
        },
        {
          id: 15,
          name: "하정우",
          email: "jungwoo@studio.com",
          phoneNumber: "010-8888-4444",
          StartDate: "2022-04-30",
          role: {
            type: "employee",
          },
        },
        {
          id: 16,
          name: "이민호",
          email: "minho@artist.com",
          phoneNumber: "010-4444-9999",
          StartDate: "2022-05-14",
          role: {
            type: "employee",
          },
        },
      ],
    },
    { status: 200 }
  );
}

export async function POST(request) {
  const { name, email, phoneNumber, roleType, StartDate } =
    await request.json();

  return NextResponse.json(
    {
      transactionId: 11,
      memberId: 1,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      StartDate: StartDate,
      role: {
        type: roleType,
      },
      creator: { userId: "adfadfga2", userName: "강민혁" },
    },
    { status: 200 }
  );
}

export async function PUT(request) {
  const { memberId, name, email, phoneNumber, roleType, StartDate } =
    await request.json();

  return NextResponse.json(
    {
      transactionId: 11,
      memberId: memberId,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      StartDate: StartDate,
      role: {
        type: roleType,
      },
      creator: { userId: "adfadfga2", userName: "강민혁" },
      updator: {
        userId: "adfadfga2dfasdfad",
        userName: "류지승",
      },
    },
    { status: 200 }
  );
}

export async function DELETE(request) {
  const { memberId } = await request.json();

  return NextResponse.json(
    {
      transactionId: 134,
      memberId: memberId,
      deletor: {
        userId: "adfadfga2dfasdfad",
        userName: "류지승",
      },
    },
    { status: 200 }
  );
}
