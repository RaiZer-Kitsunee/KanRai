import { Task } from "./task";

export class List {
  constructor(id, title, tasks = []) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
}
