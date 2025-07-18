import { useState } from "react";
import ListDialog from "../Dialog/list_dialog";
import ViewTaskDialog from "../Dialog/viewtask_dialog";
import MyDropdownMenu from "./dropdown_menu";
import Task from "./task";
import { useTheme } from "next-themes";

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
  setBoards,
}) {
  const { theme, setTheme } = useTheme();

  const text = "#8e94a3";
  const colorLight =
    status === "Todo"
      ? "#3B82F6"
      : status === "Doing"
      ? "#8B5CF6"
      : status === "Done"
      ? "#22C55E"
      : "#d44444";

  const colorDark =
    status === "Todo"
      ? "#49A9FC"
      : status === "Doing"
      ? "#A78BFA"
      : status === "Done"
      ? "#56D9A0"
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
            style={{
              backgroundColor: theme === "dark" ? colorDark : colorLight,
            }}
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
            onDelete={() => deleteList(list.id, setBoards)}
            isSmall={true}
            onEdit={() => setOpen(!open)}
          />
          <ListDialog
            title={"Edit List Title"}
            description={"Editing list Title here, click Save once you finish"}
            value={listTitle}
            setValue={setListTitle}
            onSubmit={() => editList(list.id, listTitle, setBoards)}
            open={open}
            setOpen={setOpen}
            pastValue={list.title}
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
            setBoards={setBoards}
          >
            <Task task={task} />
          </ViewTaskDialog>
        ))}
      </div>
    </div>
  );
}
