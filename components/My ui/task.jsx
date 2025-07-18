export default function Task({ task }) {
  const text = "#8e94a3";

  return (
    <div className="w-full bg-[#F1F3F8] flex  flex-col items-start gap-1 py-4 pl-3 rounded-md dark:bg-[#2c2c38]">
      <h3 className="font-semibold text-[0.9rem] text-[#0F172A] overflow-clip dark:text-[#FFFFFF]">
        {task.title}
      </h3>
      <p className="font-semibold text-[#64748B] text-[0.7rem] dark:text-[#8e94a3]">
        {task.subtasks.filter((s) => s.completed).length} of{" "}
        {task.subtasks.length} subtasks
      </p>
    </div>
  );
}
