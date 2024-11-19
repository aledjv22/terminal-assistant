import readline from "readline";
import { config } from "dotenv";
import { HfInference } from "@huggingface/inference";

config();

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generateTextFromInput = async (message) => {
  const response = await hf.chatCompletion({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [{ role: "user", content: message }],
    max_tokens: 1000,
    temperature: 0.1,
    seed: 42,
  });
  console.log(response.choices[0].message.content);
};

generateTextFromInput(message);
