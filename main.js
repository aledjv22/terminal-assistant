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

const generateTextFromInput = async () => {
  rl.question('Tu: ', async (input) => {
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'salir') {
      console.log('¡Hasta luego! ^_^');
      rl.close();
      return;
    }

    conversationHistory.push({ role: 'user', content: input });

    const load = loading({
      text: 'Pensando...',
      frames: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
    }).start();

    const response = await hf.chatCompletion({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: conversationHistory,
      max_tokens: 1000,
      temperature: 0.1,
      seed: 42,
    });

    load.stop();

    const assistantMessage = response.choices[0].message.content;
    conversationHistory.push({ role: 'assistant', content: assistantMessage });

    console.log('\nAssistant:', assistantMessage);

    console.log('========================');
    console.log('========================');

    generateTextFromInput();
  });
};

generateTextFromInput();
