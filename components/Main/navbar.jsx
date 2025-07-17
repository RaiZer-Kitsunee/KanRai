import ListDialog from "../Dialog/list_dialog";
import { use, useState } from "react";
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
  const [status, setStatus] = useState(1);

  const [changing, setChanging] = useState(false);

  return (
    <div
      className={`w-full h-20 px-5 flex justify-between items-center ${
        changing ? "gap-5" : ""
      }`}
      style={{ backgroundColor: background_Sidebar, width: "100%" }}
    >
      {/* title of the board */}
      {changing ? (
        <Input
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
      ) : (
        <h2 className="text-[1.3rem] font-semibold">{selectedBoard.title}</h2>
      )}

      {/* the buttons */}
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
          <MyDropdownMenu
            onDelete={() => deleteBoard(selectedBoard.id)}
            onEdit={() => setChanging(!changing)}
          />
        </div>
      )}
    </div>
  );
}
