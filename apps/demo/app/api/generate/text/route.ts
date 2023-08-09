import { OpenAIStream, StreamingTextResponse } from "ai";
import { openai } from "../openai-edge";
import { ratelimitText } from "../upstash-redis";
// import { kv } from "@vercel/kv";
// import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  /* rate limiting */
  if (
    process.env.NODE_ENV != "development" &&
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const ip = req.headers.get("x-forwarded-for");

    const { success, limit, reset, remaining } = await ratelimitText.limit(
      `curi_text_ratelimit_${ip}`
    );

    if (!success) {
      return new Response("You have reached your request limit for the day.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }
  /* rate limiting */

  let { prompt } = await req.json();

  if (prompt.length > 200) {
    prompt = prompt.slice(-200);
  }

  console.log("[request] Recieved Prompt (head 10)", prompt.slice(0, 10));

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI writing assistant that continues existing text based on context from prior text. " +
          "Give more weight/priority to the later characters than the beginning ones. " +
          "Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
          "answer in korean",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
