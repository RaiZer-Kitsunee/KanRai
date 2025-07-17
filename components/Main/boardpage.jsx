import TaskList from "../My ui/task_list";

export default function BoardPage({
  selectedBoard,
  onToggleSubtask,
  deleteList,
  deleteTask,
  deleteSubtask,
  editList,
  editTask,
  addSubTask,
  editSubTask,
}) {
  return (
    <div className="w-full bg-[#21212d] flex pt-5 px-6  gap-4">
      {/* the list of tasks */}
      {selectedBoard.lists.map((list) => (
        <TaskList
          key={list.id}
          status={list.title}
          list={list}
          onToggleSubtask={onToggleSubtask}
          deleteList={deleteList}
          deleteTask={deleteTask}
          deleteSubtask={deleteSubtask}
          editList={editList}
          editTask={editTask}
          addSubTask={addSubTask}
          editSubTask={editSubTask}
        />
      ))}
    </div>
  );
}
