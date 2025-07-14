import TaskList from "@/components/My ui/task_list";

export default function Board() {
  return (
    <div className="w-full h-full bg-[#21212d] flex pt-5 pl-7 gap-4">
      {/* the list of tasks */}
      <TaskList />
      <TaskList />
      <TaskList />
    </div>
  );
}
