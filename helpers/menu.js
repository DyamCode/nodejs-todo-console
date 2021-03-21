require('colors');

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();

    console.log('===================='.green);
    console.log('   Pick an option   '.cyan);
    console.log('====================\n'.green);

    console.log(`${'1.'.green} Create new task`);
    console.log(`${'2.'.green} Show tasks`);
    console.log(`${'3.'.green} Show completed tasks`);
    console.log(`${'4.'.green} Show pending tasks`);
    console.log(`${'5.'.green} Complete task(s)`);
    console.log(`${'6.'.green} Delete task`);
    console.log(`${'0.'.green} Exit\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Select an option: ', (option) => {
      readline.close();

      resolve(option);
    });
  });
};

const stopMenu = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${'ENTER'.green} to exit\n`, () => {
      readline.close();

      resolve();
    });
  });
};

module.exports = {
  showMenu,
  stopMenu,
};
