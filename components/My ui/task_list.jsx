import { useState } from "react";
import ListDialog from "../Dialog/list_dialog";
import ViewTaskDialog from "../Dialog/viewtask_dialog";
import MyDropdownMenu from "./dropdown_menu";
import Task from "./task";

export default function TaskList({
  status,
  list,
  onToggleSubtask,
  deleteList,
  deleteTask,
  deleteSubtask,
  editList,
  editTask,
  addSubTask,
  editSubTask,
}) {
  const text = "#8e94a3";
  const color =
    status === "Todo"
      ? "#47c2e5"
      : status === "Doing"
      ? "#8371f0"
      : status === "Done"
      ? "#69e2ae"
      : "#d44444";

  const [open, setOpen] = useState(false);
  const [listTitle, setListTitle] = useState("");

  return (
    <div className="w-1/4 flex flex-col items-start gap-4">
      {/* title of the list */}
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <p
            className="text-[0.6rem] font-bold tracking-widest uppercase"
            style={{ color: text }}
          >
            {status} ({list.tasks.length})
          </p>
        </div>
        <div className="flex ">
          <MyDropdownMenu
            onClick={() => deleteList(list.id)}
            isSmall={true}
            onEdit={() => setOpen(!open)}
          />
          <ListDialog
            title={"Edit List Title"}
            description={"Editing list Title here, click Save once you finish"}
            value={listTitle}
            setValue={setListTitle}
            onSubmit={() => editList(list.id, listTitle)}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>

      {/* list */}
      <div className="flex flex-col gap-4 w-full h-full">
        {/* item */}
        {list.tasks.map((task) => (
          <ViewTaskDialog
            key={task.id}
            list={list}
            task={task}
            onToggleSubtask={onToggleSubtask}
            deleteTask={deleteTask}
            deleteSubtask={deleteSubtask}
            editTask={editTask}
            addSubTask={addSubTask}
            editSubTask={editSubTask}
          >
            <Task task={task} />
          </ViewTaskDialog>
        ))}
      </div>
    </div>
  );
}
