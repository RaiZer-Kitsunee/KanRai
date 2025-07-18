import BoardPage from "@/components/Main/boardpage";
import Navbar from "@/components/Main/navbar";
import Sidebar from "@/components/Main/sidebar";
import {
  addBoard,
  addListToSelectedBoard,
  addSubTask,
  addTaskToList,
  deleteBoard,
  deleteList,
  deleteSubtask,
  deleteTask,
  editBoard,
  editList,
  editSubTask,
  editTask,
  onToggleSubtask,
} from "@/components/services/board_services";
import { Board } from "@/Data/board";

import { useEffect, useState } from "react";

export default function Home() {
  const [closed, setClosed] = useState(false);

  // this for the boards in sidebar
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("boards");

    if (data) {
      setBoards(JSON.parse(data));
    }

    console.log("Load Boards Complete");
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("boards", JSON.stringify(boards));
    } catch (error) {
      throw error("error:" + error);
    }
    console.log("Board Save Complete");
  }, [boards]);

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

  return (
    <div className="w-screen h-screen bg-[#F7F9FC] flex dark:bg-[#21212d]">
      {/* the side bar */}
      <Sidebar
        boards={boards}
        onSelectBoard={selectBoard}
        addBoard={addBoard}
        closed={closed}
        setClosed={setClosed}
        setBoards={setBoards}
      />

      {/*  the content part */}
      {selectedBoard ? (
        <div className="h-full w-full bg-[#F7F9FC] dark:bg-[#21212d]">
          {/* navbar */}
          <Navbar
            selectedBoard={selectedBoard}
            addListToSelectedBoard={addListToSelectedBoard}
            addTaskToList={addTaskToList}
            deleteBoard={deleteBoard}
            editBoard={editBoard}
            setBoards={setBoards}
          />

          {/* board */}
          <BoardPage
            selectedBoard={selectedBoard}
            onToggleSubtask={onToggleSubtask}
            deleteList={deleteList}
            deleteTask={deleteTask}
            deleteSubtask={deleteSubtask}
            editList={editList}
            editTask={editTask}
            addSubTask={addSubTask}
            editSubTask={editSubTask}
            setBoards={setBoards}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center text-2xl">
          <p>No board selected.</p>
          <p>
            <span className="text-violet-500">Create</span> Board to start
            working.
          </p>
        </div>
      )}
    </div>
  );
}
