"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AddTaskDialog({
  children,
  onCreate,
  title,
  setTitle,
  description,
  setDescription,
  subtasks,
  setSubtasks,
  status,
  setStatus,
  selectedBoard,
  open,
  setOpen,
}) {
  const addSubtask = () =>
    setSubtasks([...subtasks, { title: "", completed: false }]);
  const removeSubtask = (index) =>
    setSubtasks(subtasks.filter((_, i) => i !== index));
  const updateSubtask = (index, value) =>
    setSubtasks(
      subtasks.map((val, i) => (i === index ? { ...val, title: value } : val))
    );

  const handleCreate = () => {
    onCreate();
    // Optionally reset form
    setTitle("");
    setDescription("");
    setSubtasks([{ title: "", completed: false }]);
    setStatus(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("title is empty");
      toast.error("Title is required");
      return;
    }

    if (description.trim() === "") {
      toast.error("description is required");
      return;
    }

    if (subtasks.find((sub) => sub.title.trim() === "")) {
      toast.error("subtask is required");
      return;
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className={"bg-[#FFFFFF] border-none dark:bg-[#2c2c38] w-[40%]"}
      >
        <DialogHeader>
          <DialogTitle
            className={
              "flex justify-between text-[#0F172A] dark:text-[#FFFFFF]"
            }
          >
            <p>Add New Task</p>
            <p
              onClick={() => setOpen(!open)}
              className="text-[0.9rem] cursor-pointer"
            >
              X
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className={"mb-2 text-[#64748B] dark:text-[#A3A3A3]"}>
              Title
            </Label>
            <Input
              className={
                "border-[#CBD5E1] bg-[#F1F5F9] text-[#1E293B] dark:bg-[#1E1E2F] dark:border-[#4B5563] dark:text-[#ffffff] rounded-[4px]"
              }
              placeholder="e.g. Take coffee break"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className={"mb-2 text-[#64748B] dark:text-[#A3A3A3]"}>
              Description
            </Label>
            <Textarea
              className={
                "border-[#CBD5E1] bg-[#F1F5F9] text-[#1E293B] dark:bg-[#1E1E2F] dark:border-[#4B5563] dark:text-[#ffffff] rounded-[4px]"
              }
              placeholder="e.g. It's always good to take a break..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label className={"mb-2 text-[#64748B] dark:text-[#A3A3A3]"}>
              Subtasks
            </Label>
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  className={
                    "border-[#CBD5E1] bg-[#F1F5F9] text-[#1E293B] dark:bg-[#1E1E2F] dark:border-[#4B5563] dark:text-[#ffffff] rounded-[4px]"
                  }
                  value={subtask.title}
                  placeholder="e.g. Make coffee"
                  onChange={(e) => updateSubtask(index, e.target.value)}
                />
                <Button
                  className={"bg-[#2c2c38]"}
                  variant="destructive"
                  onClick={() => removeSubtask(index)}
                >
                  X
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-[#44474d] bg-[#19191a] text-white hover:bg-white hover:text-[#645fc6]"
              onClick={addSubtask}
            >
              + Add New Subtask
            </Button>
          </div>

          <div>
            <Label className={"mb-2 text-[#64748B] dark:text-[#A3A3A3]"}>
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                className={
                  "w-full border-[#44474d] rounded-[4px] text-[#64748B] dark:text-[#A3A3A3]"
                }
              >
                <SelectValue>
                  {status
                    ? selectedBoard?.lists?.find((list) => list.id === status)
                        ?.title
                    : "Select status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {selectedBoard &&
                  Array.isArray(selectedBoard.lists) &&
                  selectedBoard.lists.map((list) => (
                    <SelectItem key={list.id} value={list.id}>
                      {list.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogClose asChild>
          <Button
            onClick={(e) => {
              handleSubmit(e);
              handleCreate();
            }}
            className="w-full rounded-2xl bg-black text-white dark:bg-[#645fc6] dark:text-white hover:bg-[#645fc6]  "
          >
            Create Task
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
