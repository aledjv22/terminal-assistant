import { config } from 'dotenv';

config();

const hf_token = process.env.HUGGING_FACE_TOKEN || '';

const roleSystemContent = process.env.ROLE_SYSTEM_CONTENT || '';

const model = process.env.MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1';

const max_tokens = parseInt(process.env.MAX_TOKENS || '1000');

const temperature = parseFloat(process.env.TEMPERATURE || '0.1');

const seed = parseInt(process.env.SEED || '42');

export { hf_token, roleSystemContent, model, max_tokens, temperature, seed };
