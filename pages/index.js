import BoardPage from "@/components/Main/boardpage";
import Navbar from "@/components/Main/navbar";
import Sidebar from "@/components/Main/sidebar";
import { Board } from "@/Data/board";
import { List } from "@/Data/list";
import { SubTask } from "@/Data/subtasks";
import { Task } from "@/Data/task";
import { useState } from "react";

export default function Home() {
  const background_MainContent = "#21212d";

  const [closed, setClosed] = useState(false);

  // this for the boards in sidebar
  const [boards, setBoards] = useState([
    new Board(1, "Design", false, [
      new List(1, "test", [
        new Task(1, "Test man", "Help", new Date(), []),
        new Task(2, "Test man", "Help", new Date(), []),
      ]),
      new List(2, "test", [
        new Task(1, "Test man", "Help", new Date(), []),
        new Task(2, "Test man", "Help", new Date(), []),
      ]),
    ]),
    new Board(2, "Development", false, []),
  ]);

  const addBoard = (boardTitle) => {
    const board = new Board(Date.now(), boardTitle, false, [
      new List(1, "Todo", []),
      new List(2, "Doing", []),
      new List(3, "Done", []),
    ]);
    setBoards([...boards, board]);
  };

  const selectBoard = (id) => {
    setBoards((prev) =>
      prev.map(
        (board) =>
          new Board(board.id, board.title, board.id === id, board.lists)
      )
    );
  };

  // this for the boards and the lists
  const selectedBoard = boards.find((board) => board.selected);

  const addListToSelectedBoard = (listTitle) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (!board.selected) return board;

        const newListId = board.lists.length + 1;
        const newList = new List(newListId, listTitle, []);
        const updatedLists = [...board.lists, newList];

        return new Board(board.id, board.title, true, updatedLists);
      })
    );
  };

  const addTaskToList = (listId, taskTitle, tasksDescription, subTasks) => {
    setBoards((prev) =>
      prev.map((board) => {
        if (!board.selected) return board;

        const updatedLists = board.lists.map((list) => {
          if (list.id !== listId) return list;

          const newTaskId = list.tasks.length + 1;

          const newSubTasks = subTasks.map((subtask, index) => {
            return new SubTask(index + 1, subtask.title, subtask.completed);
          });

          const newTask = new Task(
            newTaskId,
            taskTitle,
            tasksDescription,
            new Date(),
            newSubTasks
          );
          const updatedTasks = [...list.tasks, newTask];

          return new List(list.id, list.title, updatedTasks);
        });

        return new Board(board.id, board.title, true, updatedLists);
      })
    );
  };

  return (
    <div
      className="w-screen h-screen flex"
      style={{ backgroundColor: background_MainContent }}
    >
      {/* the side bar */}
      <Sidebar
        boards={boards}
        onSelectBoard={selectBoard}
        addBoard={addBoard}
        closed={closed}
        setClosed={setClosed}
      />

      {/*  the content part */}
      {selectedBoard ? (
        <div
          className="h-full w-full"
          style={{ backgroundColor: background_MainContent }}
        >
          {/* navbar */}
          <Navbar
            selectedBoard={selectedBoard}
            addListToSelectedBoard={addListToSelectedBoard}
            addTaskToList={addTaskToList}
            closed={closed}
          />

          {/* board */}
          <BoardPage selectedBoard={selectedBoard} />
        </div>
      ) : (
        <div className="p-4">No board selected.</div>
      )}
    </div>
  );
}
