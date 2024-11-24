import chalk from 'chalk';
import loading from 'loading-cli';
import readline from 'readline';
import { config } from 'dotenv';
import { HfInference } from '@huggingface/inference';

config();

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const conversationHistory = [
  { role: 'system', content: process.env.ROLE_SYSTEM_CONTENT || '' },
];

const hasToken = () => hf.accessToken !== '';

const generateTextFromInput = async () => {
  if (!hasToken()) {
    console.log(
      chalk.bgYellow('No se ha encontrado un token de Hugging Face.'),
    );
    console.log(chalk.bgYellow('Por favor, revisa el archivo .env'));
    rl.close();
    return;
  }

  rl.question('Tu: ', async (input) => {
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'salir') {
      console.log(chalk.bgYellow('¡Hasta luego! ^-^'));
      rl.close();
      return;
    }

    conversationHistory.push({ role: 'user', content: input });

    const load = loading({
      text: 'Pensando...',
      frames: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
    }).start();

    const model = process.env.MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1';
    const max_tokens = parseInt(process.env.MAX_TOKENS || '1000');
    const temperature = parseFloat(process.env.TEMPERATURE || '0.1');
    const seed = parseInt(process.env.SEED || '42');

    const response = await hf.chatCompletion({
      model,
      messages: conversationHistory,
      max_tokens,
      temperature,
      seed,
    });

    load.stop();

    const assistantMessage = response.choices[0].message.content;
    conversationHistory.push({ role: 'assistant', content: assistantMessage });

    console.log(
      chalk.bgGreen(chalk.underline.bold('\nAssistant:'), assistantMessage),
    );

    console.log(chalk.magenta('=========================================='));
    console.log(chalk.magenta('=========================================='));

    generateTextFromInput();
  });
};

generateTextFromInput();
