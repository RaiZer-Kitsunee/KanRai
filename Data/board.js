import { List } from "./list";

export class Board {
  constructor(id, title, selected = false, lists = []) {
    this.id = id;
    this.title = title;
    this.selected = selected;
    this.lists = lists;
  }
}
