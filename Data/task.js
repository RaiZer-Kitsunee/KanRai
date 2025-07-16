// models/task.j

import { SubTask } from "./subtasks";

export class Task {
  constructor(
    id,
    title,
    description = "",
    createdAt = new Date(),
    subtasks = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.subtasks = subtasks;
  }
}
