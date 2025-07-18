import ListDialog from "../Dialog/list_dialog";
import { use, useEffect, useState } from "react";
import NavButton from "../My ui/nav_button";
import AddTaskDialog from "../Dialog/task_dialog";
import MyDropdownMenu from "../My ui/dropdown_menu";
import { Input } from "../ui/input";

export default function Navbar({
  selectedBoard,
  addListToSelectedBoard,
  addTaskToList,
  deleteBoard,
  editBoard,
}) {
  const background_Sidebar = "#2c2c38";
  const [boardTitle, setBoardTitle] = useState("");
  const [listTitle, setListTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [subtasks, setSubtasks] = useState([""]);
  const [status, setStatus] = useState(0);

  const [openColum, setColumOpen] = useState(false);
  const [openTask, setTaskOpen] = useState(false);

  const [changing, setChanging] = useState(false);

  // Ensure boardTitle is set to selectedBoard.title when editing starts
  useEffect(() => {
    if (changing) {
      setBoardTitle(selectedBoard.title || "");
    }
  }, [changing, selectedBoard.title]);

  return (
    <div
      className={`w-full h-20 bg-[#FFFFFF] px-5 flex justify-between items-center ${
        changing ? "gap-5" : ""
      } dark:bg-[#2c2c38]`}
    >
      {changing ? (
        <Input
          className={"focus"}
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          autoFocus
        />
      ) : (
        <h2 className="text-[1.3rem] font-semibold text-black dark:text-white">
          {selectedBoard.title}
        </h2>
      )}
      {changing ? (
        <NavButton
          onClick={() => {
            editBoard(selectedBoard.id, boardTitle);
            setChanging(!changing);
          }}
          title={"Save"}
        />
      ) : (
        <div className="flex items-center gap-4">
          <ListDialog
            title={"Create List"}
            description={"Create List here. Click save when you're done."}
            value={listTitle}
            setValue={setListTitle}
            onSubmit={() => {
              addListToSelectedBoard(listTitle);
              setListTitle("");
            }}
            open={openColum}
            setOpen={setColumOpen}
          >
            <NavButton
              onClick={() => setColumOpen(!openColum)}
              title={"+ New Colum"}
            />
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
            open={openTask}
            setOpen={setTaskOpen}
          >
            <NavButton
              onClick={() => setTaskOpen(!openTask)}
              title={"+ Add New Task"}
            />
          </AddTaskDialog>

          {/* just the drop menu of the three point */}
          <MyDropdownMenu
            onDelete={() => deleteBoard(selectedBoard.id)}
            onEdit={() => setChanging(!changing)}
          />
        </div>
      )}
    </div>
  );
}
