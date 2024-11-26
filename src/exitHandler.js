const exitWords = [
  'exit',
  'salir',
  'chau',
  'bye',
  'adios',
  'quit',
  'q',
  's',
  'goodbye',
];

const shouldExit = (input) => {
  const inputLower = input.toLowerCase().trim();
  return exitWords.includes(inputLower);
};

export { shouldExit };
