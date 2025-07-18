"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import MyDropdownMenu from "../My ui/dropdown_menu";
import { Button } from "../ui/button";
import ListDialog from "./list_dialog";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function ViewTaskDialog({
  list,
  task,
  onToggleSubtask,
  deleteTask,
  deleteSubtask,
  editTask,
  addSubTask,
  editSubTask,
  children,
  setBoards,
}) {
  const completedCount = task.subtasks.filter((s) => s.completed).length;

  const [openTask, setOpenTask] = useState(false);
  const [openSubTask, setOpenSubTask] = useState(false);
  const [taskEditTitle, setTaskEditTitle] = useState("");
  const [subTaskAddTitle, setSubTaskAddTitle] = useState("");

  const [openEditSubTask, setOpenEditSubTask] = useState(false);
  const [subTaskEditTitle, setSubTaskEditTitle] = useState("");

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-md space-y-4 bg-[#FFFFFF] border-none dark:bg-[#2c2c38]">
        <DialogTitle className="text-xl font-semibold flex justify-between items-center text-[#0F172A] dark:text-[#FFFFFF]">
          {task.title}
          <div className="flex">
            <Button
              onClick={() => setOpenSubTask(!openSubTask)}
              className={
                "w-6 h-6 text-[1.5rem] p-0  bg-[#2c2c38] border-white dark:text-[#ffffff] mr-2 rounded-sm flex justify-center items-center hover:bg-violet-500 hover:text-black"
              }
            >
              +
            </Button>
            <ListDialog
              title={"Create SubTasks"}
              description={"Here Create Subtasks, click save once finish"}
              value={subTaskAddTitle}
              setValue={setSubTaskAddTitle}
              onSubmit={() => {
                addSubTask(list.id, task.id, subTaskAddTitle, setBoards);
                setSubTaskAddTitle("");
              }}
              open={openSubTask}
              setOpen={setOpenSubTask}
            />
            <MyDropdownMenu
              onDelete={() => deleteTask(list.id, task.id, setBoards)}
              onEdit={() => setOpenTask(!openTask)}
            />
            <ListDialog
              title={"Edit Task Title"}
              description={"Editing Task title here, just Click At Save"}
              value={taskEditTitle}
              setValue={setTaskEditTitle}
              onSubmit={() =>
                editTask(list.id, task.id, taskEditTitle, setBoards)
              }
              open={openTask}
              setOpen={setOpenTask}
              pastValue={task.title}
            />
          </div>
        </DialogTitle>

        <p className="text-sm text-[#64748B] dark:text-[#A3A3A3]">
          {task.description}
        </p>

        <div className="space-y-4">
          <p className="text-sm font-medium text-[#64748B] dark:text-[#A3A3A3]">
            Subtasks ({completedCount} of {task.subtasks.length})
          </p>
          {task.subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className={
                "group flex items-center text-[#9e9ea6] gap-3 px-2 py-3 rounded-[4px] bg-[#F1F3F8] dark:bg-black "
              }
            >
              <Checkbox
                id={`subtask-${subtask.id}`}
                checked={subtask.completed}
                onCheckedChange={() =>
                  onToggleSubtask(list.id, task.id, subtask.id, setBoards)
                }
                className={"border-[#CBD5E1] dark:border-[#4B5563]"}
              />
              <Label
                htmlFor={`subtask-${subtask.id}`}
                className={`w-full text-[0.9rem] ${
                  subtask.completed ? "opacity-50 line-through" : ""
                } text-[#0F172A] dark:text-[#ffffff]`}
              >
                {subtask.title}
              </Label>
              <ListDialog
                title={"Edit SubTask"}
                description={"Editing SubTask Title here, Take your time"}
                value={subTaskEditTitle}
                setValue={setSubTaskEditTitle}
                onSubmit={() =>
                  editSubTask(
                    list.id,
                    task.id,
                    subtask.id,
                    subTaskEditTitle,
                    setBoards
                  )
                }
                open={openEditSubTask}
                setOpen={setOpenEditSubTask}
                pastValue={subtask.title}
              />
              <Button
                onClick={() => setOpenEditSubTask(!openEditSubTask)}
                className={
                  "w-4 h-4 p-3 m-0 font-bold rounded-sm justify-center bg-[#21212d] dark:text-white items-center hidden group-hover:flex hover:bg-violet-500 hover:text-black"
                }
              >
                <FaEdit />
              </Button>
              <Button
                onClick={() =>
                  deleteSubtask(list.id, task.id, subtask.id, setBoards)
                }
                className={
                  "w-4 h-4 p-3 m-0 font-bold rounded-sm justify-center bg-[#21212d] dark:text-white items-center hidden group-hover:flex hover:bg-violet-500 hover:text-black"
                }
              >
                X
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <Label className={"text-[#64748B] dark:text-[#A3A3A3]"}>Status</Label>
          <Select value={list.title} disabled>
            <SelectTrigger
              className={
                "w-full border-[#44474d] rounded-[4px] text-[#64748B] dark:text-[#A3A3A3]"
              }
            >
              <SelectValue>{list.title}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="Doing">Doing</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}
