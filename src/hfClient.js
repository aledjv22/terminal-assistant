import { HfInference } from '@huggingface/inference';
import { hf_token, model, max_tokens, temperature, seed } from './config.js';

const hf = new HfInference(hf_token);

const hasToken = () => hf.accessToken !== '';

const getChatCompletion = async (messages) => {
  const response = await hf.chatCompletion({
    model,
    messages,
    max_tokens,
    temperature,
    seed,
  });
  return response;
};

export { getChatCompletion, hasToken };
