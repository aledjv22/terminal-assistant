import { config } from 'dotenv';
import { HfInference } from '@huggingface/inference';

config();

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

const roleSystemContent = process.env.ROLE_SYSTEM_CONTENT || '';

const model = process.env.MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1';

const max_tokens = parseInt(process.env.MAX_TOKENS || '1000');

const temperature = parseFloat(process.env.TEMPERATURE || '0.1');

const seed = parseInt(process.env.SEED || '42');

export { hf, roleSystemContent, model, max_tokens, temperature, seed };
