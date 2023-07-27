import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const file = req.body || "";
  const contentType = req.headers.get("content-type") || "text/plain";
  const filename = `${nanoid()}.${contentType.split("/")[1]}`;

  // Blob으로 변환
  const blob = new Blob(
    [file instanceof ReadableStream ? await toUint8Array(file) : file],
    { type: contentType }
  );

  // Blob 타입으로 응답 생성
  const blobResponse = new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": contentType,
    },
  });

  return blobResponse;
}

// @web-streams/polyfill에서 제공하는 함수로 ReadableStream을 Uint8Array로 변환
async function toUint8Array(readableStream) {
  const reader = readableStream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return new Uint8Array(chunks);
}
