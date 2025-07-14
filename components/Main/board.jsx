import TaskList from "@/components/My ui/task_list";
import ButtonAddTaskList from "../My ui/button_add_tasklist";

export default function BoardPage() {
  return (
    <div className="w-full bg-[#21212d] flex pt-5 pl-7 gap-4">
      {/* the list of tasks */}
      <TaskList color={"#47c2e5"} status={"Todo"} />
      <TaskList color={"#8371f0"} status={"Doing"} />
      <TaskList color={"#69e2ae"} status={"Done"} />
      <ButtonAddTaskList />
    </div>
  );
}
