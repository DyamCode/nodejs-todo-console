const { v4: uuid } = require('uuid');

class Task {
  id = '';
  description = '';
  completed_at = null;

  constructor(description) {
    this.id = uuid();
    this.description = description;
  }
}

module.exports = Task;
