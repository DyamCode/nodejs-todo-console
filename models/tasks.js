const Task = require('./task');

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get list() {
    const list = [];

    Object.keys(this._list).forEach((key) => list.push(this._list[key]));

    return list;
  }

  loadTasks(tasks = []) {
    tasks.forEach((task) => (this._list[task.id] = task));
  }

  creteTask(description) {
    const task = new Task(description);

    this._list[task.id] = task;
  }

  listTasks() {
    const tasks = this.list;

    tasks.forEach((task, index) => {
      this.listFormat(task, index);
    });
  }

  listTasksByStatus(status = true) {
    const tasks = this.list.filter((task) => {
      if (status) return task.completed_at;

      return !task.completed_at;
    });

    tasks.forEach((task, index) => {
      this.listFormat(task, index, true);
    });
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleStatus(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.completed_at) {
        task.completed_at = new Date().toISOString();
      }
    });

    this.list.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completed_at = null;
      }
    });
  }

  listFormat(task, index, showCreatedAt = false) {
    console.log(
      `${(++index).toString().green}. ${task.description} ::: ${
        task.completed_at
          ? (showCreatedAt ? task.completed_at.green : 'Completed').green
          : 'pending'.red
      }`
    );
  }
}

module.exports = Tasks;
