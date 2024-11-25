import chalk from 'chalk';
import loader from './src/loader.js';
import readline from 'readline';
import { getChatCompletion, hasToken } from './src/hfClient.js';
import { roleSystemContent } from './src/config.js';
import {
  showUserInput,
  showAssistantMessage,
  showExitMessage,
  showTokenError,
  showMargins,
} from './src/messages.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const conversationHistory = [{ role: 'system', content: roleSystemContent }];

const generateTextFromInput = async () => {
  if (!hasToken()) {
    showTokenError();
    rl.close();
    return;
  }

  rl.question(chalk.underline('Tu:') + ' ', async (input) => {
    const numLines = input.split('\n').length;
    readline.moveCursor(process.stdout, 0, -(numLines + 1));
    readline.clearScreenDown(process.stdout);

    showUserInput(input);

    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'salir') {
      showExitMessage();
      rl.close();
      return;
    }

    conversationHistory.push({ role: 'user', content: input });

    loader.start();

    const response = await getChatCompletion(conversationHistory);

    loader.stop();

    const assistantMessage = response.choices[0].message.content;
    conversationHistory.push({ role: 'assistant', content: assistantMessage });

    showAssistantMessage(assistantMessage);

    showMargins();

    generateTextFromInput();
  });
};

generateTextFromInput();
