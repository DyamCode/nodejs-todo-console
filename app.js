require('colors');

const {
  inquireMenu,
  pause,
  readInput,
  customList,
  confirmMenu,
  showChecklist,
} = require('./helpers/inquirer');
const { storeDB, readDB } = require('./helpers/storeFile');
const Tasks = require('./models/tasks');

const main = async () => {
  let option = '';
  const tasks = new Tasks();

  const db = readDB();

  if (db) {
    tasks.loadTasks(db);
  }

  do {
    option = await inquireMenu();
    console.log();
    switch (option) {
      case '1':
        const desc = await readInput('Description: ');

        tasks.creteTask(desc);

        break;
      case '2':
        tasks.listTasks();

        break;
      case '3':
        tasks.listTasksByStatus();

        break;
      case '4':
        tasks.listTasksByStatus(false);

        break;
      case '5':
        const ids = await showChecklist(tasks.list);

        tasks.toggleStatus(ids);

        break;
      case '6':
        const id = await customList(tasks.list);

        if (id === '0') break;

        const confirm = await confirmMenu('Are you sure?');

        if (confirm) {
          tasks.deleteTask(id);

          console.log('\nThe task was deleted successfully :)'.green);
        }

        break;
    }

    console.log();

    storeDB(tasks.list);

    if (option !== '0') await pause();
  } while (option !== '0');
};

main();
