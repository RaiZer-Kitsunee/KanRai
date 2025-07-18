import { Board } from "@/Data/board";
import { List } from "@/Data/list";
import { SubTask } from "@/Data/subtasks";
import { Task } from "@/Data/task";

const addBoard = (boardTitle, setBoards) => {
  if (boardTitle.trim() === "") return;

  const board = new Board(Date.now(), boardTitle, false, [
    new List(1, "Todo", []),
    new List(2, "Doing", []),
    new List(3, "Done", []),
  ]);
  setBoards((prevBoards) => [...prevBoards, board]);
};

const addListToSelectedBoard = (listTitle, setBoards) => {
  if (listTitle.trim() === "") return;

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

const addTaskToList = (
  listId,
  taskTitle,
  tasksDescription,
  subTasks,
  setBoards
) => {
  if (taskTitle.trim() === "") return;
  if (tasksDescription.trim() === "") return;

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

const addSubTask = (listId, taskId, subTaskTitle, setBoards) => {
  if (subTaskTitle.trim() === "") return;

  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.map((list) => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks.map((task) => {
          if (task.id !== taskId) return task;

          const newSubTaskId = (task.subtasks.length ?? 0) + 1;
          const newSubTask = new SubTask(newSubTaskId, subTaskTitle, false);
          const updatedSubtasks = [...task.subtasks, newSubTask];

          return new Task(
            task.id,
            task.title,
            task.description,
            task.createdAt,
            updatedSubtasks
          );
        });
        return new List(list.id, list.title, updatedTasks);
      });
      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

const onToggleSubtask = (listId, taskId, subtaskId, setBoards) => {
  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.map((list) => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks.map((task) => {
          if (task.id !== taskId) return task;

          const updatedSubtasks = task.subtasks.map((subtask) =>
            subtask.id === subtaskId
              ? new SubTask(subtask.id, subtask.title, !subtask.completed)
              : subtask
          );

          return new Task(
            task.id,
            task.title,
            task.description,
            task.createdAt,
            updatedSubtasks
          );
        });

        return new List(list.id, list.title, updatedTasks);
      });
      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

const deleteBoard = (boardId, setBoards) => {
  setBoards((prev) => {
    const index = prev.findIndex((board) => board.id === boardId);
    const wasSelected = prev[index]?.selected;

    const updatedBoards = prev.filter((board) => board.id !== boardId);

    if (wasSelected && updatedBoards.length > 0) {
      // Select the next board if possible, otherwise the previous one, otherwise the first one
      let fallbackIndex = index;
      if (fallbackIndex >= updatedBoards.length) {
        fallbackIndex = updatedBoards.length - 1;
      }
      if (fallbackIndex < 0) {
        fallbackIndex = 0;
      }
      const fallbackBoard = updatedBoards[fallbackIndex];

      return updatedBoards.map(
        (board) =>
          new Board(
            board.id,
            board.title,
            board.id === fallbackBoard.id,
            board.lists
          )
      );
    }

    return updatedBoards;
  });
};

const deleteList = (listId, setBoards) => {
  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.filter((list) => list.id !== listId);

      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

const deleteTask = (listId, taskId, setBoards) => {
  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.map((list) => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks.filter((task) => task.id !== taskId);

        return new List(list.id, list.title, updatedTasks);
      });
      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

const deleteSubtask = (listId, taskId, subtaskId, setBoards) => {
  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.map((list) => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks.map((task) => {
          if (task.id !== taskId) return task;

          const updatedSubtasks = task.subtasks.filter(
            (subtask) => subtask.id !== subtaskId
          );

          return new Task(
            task.id,
            task.title,
            task.description,
            task.createdAt,
            updatedSubtasks
          );
        });

        return new List(list.id, list.title, updatedTasks);
      });
      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

const editBoard = (boardId, newBoardTitle, setBoards) => {
  setBoards((prev) =>
    prev.map((board) =>
      board.id === boardId ? { ...board, title: newBoardTitle } : board
    )
  );
};

const editList = (listId, newListTitle, setBoards) => {
  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.map((list) =>
        list.id === listId ? { ...list, title: newListTitle } : list
      );

      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

const editTask = (listId, taskId, newTaskTitle, setBoards) => {
  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.map((list) => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks.map((task) =>
          task.id === taskId ? { ...task, title: newTaskTitle } : task
        );

        return new List(list.id, list.title, updatedTasks);
      });

      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

const editSubTask = (listId, taskId, subtaskId, newSubTaskTitle, setBoards) => {
  setBoards((prev) => {
    return prev.map((board) => {
      if (!board.selected) return board;

      const updatedLists = board.lists.map((list) => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks.map((task) => {
          if (task.id !== taskId) return task;

          const updatedSubtasks = task.subtasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, title: newSubTaskTitle }
              : subtask
          );

          return new Task(
            task.id,
            task.title,
            task.description,
            task.createdAt,
            updatedSubtasks
          );
        });

        return new List(list.id, list.title, updatedTasks);
      });

      return new Board(board.id, board.title, true, updatedLists);
    });
  });
};

export {
  addBoard,
  addListToSelectedBoard,
  addTaskToList,
  addSubTask,
  onToggleSubtask,
  deleteBoard,
  deleteList,
  deleteTask,
  deleteSubtask,
  editBoard,
  editList,
  editTask,
  editSubTask,
};
