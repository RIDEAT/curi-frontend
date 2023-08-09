import { db } from "../../reservation/firebase";
import { openai } from "../openai-node";
import { ratelimitImage } from "../upstash-redis";
import { addDoc, collection } from "firebase/firestore";

// import { kv } from "@vercel/kv";
// import { Ratelimit } from "@upstash/ratelimit";

const addIamgeUrl = async (prompt: string, url: string) => {
  try {
    const data = {
      prompt,
      url,
      created_at: new Date(),
    };
    console.log("[request]", "ai image save to database");
    const docRef = await addDoc(collection(db, "ai_images"), data);
    console.log("Document written with ID: ", docRef.id);
    console.log("[complete]", "ai image saved to database");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function POST(req: Request): Promise<Response> {
  /* rate limiting */
  if (
    process.env.NODE_ENV != "development" &&
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const ip = req.headers.get("x-forwarded-for");

    const { success, limit, reset, remaining } = await ratelimitImage.limit(
      `curi_image_ratelimit_${ip}`
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

  console.log("[request] Recieved Prompt: ", prompt);

  const finalPrompt =
    "Considering it's for onboarding content " +
    "create image based on the context and keeping the audience in mind." +
    "delete all texts in image. here is context: " +
    prompt;

  const response = await openai.createImage({
    prompt: finalPrompt,
    n: 1,
    size: "256x256",
  });

  const image_url = response.data.data[0].url;

  await addIamgeUrl(prompt, image_url);

  return new Response(image_url, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
