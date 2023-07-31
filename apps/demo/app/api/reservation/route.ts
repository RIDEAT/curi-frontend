import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log(json);
    let json_response = {
      status: "success",
      data: {
        json,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
