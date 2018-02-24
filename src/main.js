require('babel-polyfill');

import crypt from './crypt';
import decrypt from './decrypt';

const executeCommand = ({
  command,
  fileName,
}) => {
  const path = `${__dirname}/${fileName}`;
  switch (command) {
    case '-c': crypt({ path }); break;
    case '-d': decrypt({ path }); break;
    default: throw new Error('');
  }
};

const handleError =
  ({ message }) => {
    if (!message) {
      console.log('Error, usage: node ./src/main.js [-c|-d] [filename]');
    } else {
      console.log(`Error, ${message}`);
    }
  };

const run = () => {
  if (process.argv.length < 4) {
    handleError();
  }
  const command = process.argv[2];
  const fileName = process.argv[3];
  console.log(process.argv);
  executeCommand({ command, fileName });
};

run();