import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import TaskDialog from "../Dialog/task_dialog";
import ListDialog from "../Dialog/list_dialog";
import { useState } from "react";
import NavButton from "../My ui/nav_button";
import AddTaskDialog from "../Dialog/task_dialog";
import { Button } from "../ui/button";

export default function Navbar({
  selectedBoard,
  addListToSelectedBoard,
  addTaskToList,
  closed,
}) {
  const background_Sidebar = "#2c2c38";
  const [listTitle, setListTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState([""]);
  const [status, setStatus] = useState(1);

  return (
    <div
      className="w-full h-20 px-5 flex justify-between items-center "
      style={{ backgroundColor: background_Sidebar , width: "100%"}}
    >
      {/* title of the board */}
      <h2 className="text-[1.3rem] font-semibold">{selectedBoard.title}</h2>

      {/* the buttons */}
      <div className="flex items-center gap-4">
        <ListDialog
          title={"Create List"}
          description={"Create List here. Click save when you're done."}
          value={listTitle}
          setValue={setListTitle}
          onSubmit={() => {
            addListToSelectedBoard(listTitle);
          }}
        >
          <NavButton title={"+ New Colum"} />
        </ListDialog>

        <AddTaskDialog
          onCreate={() =>
            addTaskToList(status, taskTitle, taskDescription, subtasks)
          }
          title={taskTitle}
          setTitle={setTaskTitle}
          description={taskDescription}
          setDescription={setTaskDescription}
          subtasks={subtasks}
          setSubtasks={setSubtasks}
          status={status}
          setStatus={setStatus}
          selectedBoard={selectedBoard}
        >
          <NavButton title={"+ Add New Task"} />
        </AddTaskDialog>

        {/* just the drop menu of the three point */}
        <DropdownMenu>
          <DropdownMenuTrigger className="text-[1.2rem] cursor-pointer">
            <HiDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={"w-30 mr-6 bg-[#2c2c38] border-[#8e94a3]"}
          >
            <DropdownMenuItem className={"text-[#8e94a3]"}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className={"text-[#8e94a3]"}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
