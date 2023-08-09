import { Configuration, OpenAIApi } from "openai";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);

export { openai };
