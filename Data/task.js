// models/task.j

import { SubTask } from "./subtasks";

export class Task {
  constructor(id, title, description = "", createdAt = new Date()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.subtasks = []; // Array of SubTask instances
  }

  addSubTask(subtask) {
    if (subtask instanceof SubTask) {
      this.subtasks.push(subtask);
    }
  }

  toggleSubTask(id) {
    const sub = this.subtasks.find((s) => s.id === id);
    if (sub) sub.toggle();
  }
}
