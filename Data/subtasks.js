// models/subtask.js

export class SubTask {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}
