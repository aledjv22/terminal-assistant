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

const generateTextFromInput = async () => {
  rl.question('Tu: ', async (input) => {
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'salir') {
      console.log('¡Hasta luego!0 ^_^');
      rl.close();
      return;
    }

    const load = loading({
      text: 'Pensando...',
      frames: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
    }).start();

    const response = await hf.chatCompletion({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: process.env.ROLE_SYSTEM_CONTENT },
        { role: 'user', content: input },
      ],
      max_tokens: 1000,
      temperature: 0.1,
      seed: 42,
    });

    load.stop();

    console.log('\nAssistant:', response.choices[0].message.content);

    console.log('========================');
    console.log('========================');

    generateTextFromInput();
  });
};

generateTextFromInput();
