import chalk from 'chalk';

const showUserInput = (input) => {
  console.log(chalk.bgBlue.black(chalk.underline.bold('Tu:'), input));
};

const showAssistantMessage = (message) => {
  console.log(
    chalk.bgHex('#49c156').black(chalk.underline.bold('\nAsistente:'), message),
  );
};

const showExitMessage = () => {
  console.log(chalk.bgYellow.black('¡Hasta luego! ^-^'));
};

const showTokenError = () => {
  console.log(chalk.bgYellow.black('No se ha encontrado un token de Hugging Face.'));
  console.log(chalk.bgYellow.black('Por favor, revisa el archivo .env'));
};

const showMargins = () => {
  console.log(chalk.magenta('=========================================='));
  console.log(chalk.magenta('=========================================='));
};

export {
  showUserInput,
  showAssistantMessage,
  showExitMessage,
  showTokenError,
  showMargins,
};
