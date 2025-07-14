import { List } from "./list";

export class Board {
  constructor(id, title, selected) {
    this.id = id;
    this.title = title;
    this.selected = selected;
    this.lists = [];
  }

  addList(list) {
    if (list instanceof List) {
      this.lists.push(list);
    }
  }
}
