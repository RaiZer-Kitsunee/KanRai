import { Task } from "./task";

export class List {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.tasks = [];
  }

  addTask(task) {
    if (task instanceof Task) {
      this.tasks.push(task);
    }
  }
}
