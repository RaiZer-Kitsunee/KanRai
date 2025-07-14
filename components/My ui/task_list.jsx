import Task from "./task";

export default function TaskList({ color, status }) {
  const text = "#8e94a3";

  return (
    <div className="w-2/4 flex flex-col items-start gap-4">
      {/* title of the list */}
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <p
          className="text-[0.75rem] font-bold tracking-widest uppercase"
          style={{ color: text }}
        >
          {status} (4)
        </p>
      </div>

      {/* list */}
      <div className="flex flex-col gap-4 w-full h-full">
        {/* item */}
        <Task title={"Build UI for the game"} />
        <Task title={"Build VFX to the game"} />
        <Task title={"Build Character controller with the rb function"} />
        <Task title={"Build Character controller with the rb function"} />
      </div>
    </div>
  );
}
