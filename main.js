import chalk from 'chalk';
import loading from 'loading-cli';
import readline from 'readline';
import {
  hf,
  roleSystemContent,
  model,
  max_tokens,
  temperature,
  seed,
} from './src/config.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const conversationHistory = [{ role: 'system', content: roleSystemContent }];

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

  rl.question(chalk.underline('Tu:') + ' ', async (input) => {
    const numLines = input.split('\n').length;
    readline.moveCursor(process.stdout, 0, -(numLines + 1));
    readline.clearScreenDown(process.stdout);

    console.log(chalk.bgBlue.black(chalk.underline.bold('Tu:'), input));

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
      chalk
        .bgHex('#49c156')
        .black(chalk.underline.bold('\nAsistente:'), assistantMessage),
    );

    console.log(chalk.magenta('=========================================='));
    console.log(chalk.magenta('=========================================='));

    generateTextFromInput();
  });
};

generateTextFromInput();
