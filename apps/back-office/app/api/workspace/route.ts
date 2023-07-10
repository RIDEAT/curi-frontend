import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json(
    {
      transactionId: 11,
      list: [
        {
          id: 1,
          name: "workspace1",
          emailId: "ws1",
        },
        {
          id: 2,
          name: "workspace2",
          emailId: "ws2",
        },
        {
          id: 3,
          name: "workspace3",
          emailId: "ws3",
        },
      ],
    },
    { status: 200 }
  );
}

export async function POST(request) {
  const { workspacename, emailId } = await request.json();

  return NextResponse.json(
    {
      transactionId: 11,
      workspaceName: workspacename,
      workspaceId: 1,
      emailId: emailId,
      createDate: new Date(),
      creator: { userId: "adfadfga2", userName: "강민혁" },
    },
    { status: 200 }
  );
}

export async function PUT(request) {
  const { workspaceId, workspacename, emailId } = await request.json();

  return NextResponse.json(
    {
      transactionId: 1134,
      workspaceName: workspacename,
      workspaceId: workspaceId,
      emailId: emailId,
      createDate: new Date(),
      creator: { userId: "adfadfga2", userName: "강민혁" },
    },
    { status: 200 }
  );
}

export async function DELETE(request) {
  const { workspaceId } = await request.json();

  return NextResponse.json(
    {
      transactionId: 1134,
      workspaceId: workspaceId,
      deleteDate: new Date(),
      deletor: {
        userId: "adfadfga2",
        userName: "강민혁",
      },
    },
    { status: 200 }
  );
}
