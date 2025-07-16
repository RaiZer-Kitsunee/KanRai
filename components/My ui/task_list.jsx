import ViewTaskDialog from "../Dialog/viewtask_dialog";
import Task from "./task";

export default function TaskList({ status, list }) {
  const text = "#8e94a3";
  const color =
    status === "Todo"
      ? "#47c2e5"
      : status === "Doing"
      ? "#8371f0"
      : status === "Done"
      ? "#69e2ae"
      : "#d44444";

  return (
    <div className="w-1/4 flex flex-col items-start gap-4">
      {/* title of the list */}
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

      {/* list */}
      <div className="flex flex-col gap-4 w-full h-full">
        {/* item */}
        {list.tasks.map((task) => (
          <ViewTaskDialog task={task} listTitle={list.title}>
            <Task key={task.id} task={task} />
          </ViewTaskDialog>
        ))}
      </div>
    </div>
  );
}
