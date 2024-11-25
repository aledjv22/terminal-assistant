import chalk from 'chalk';
import loader from './src/loader.js';
import readline from 'readline';
import {
  addMessageToHistory,
  getConversationHistory,
} from './src/conversationHistory.js';
import { getChatCompletion, hasToken } from './src/hfClient.js';
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

    addMessageToHistory('user', input);

    loader.start();

    const response = await getChatCompletion(getConversationHistory());

    loader.stop();

    const assistantMessage = response.choices[0].message.content;

    addMessageToHistory('assistant', assistantMessage);

    showAssistantMessage(assistantMessage);

    showMargins();

    generateTextFromInput();
  });
};

generateTextFromInput();
