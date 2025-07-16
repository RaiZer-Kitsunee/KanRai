"use client";

import { useState } from "react";
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
    setStatus("Todo");
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={"bg-[#2c2c38] border-none w-[40%]"}>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className={"mb-2"}>Title</Label>
            <Input
              className={"border-[#44474d] rounded-[4px]"}
              placeholder="e.g. Take coffee break"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className={"mb-2"}>Description</Label>
            <Textarea
              className={"border-[#44474d] rounded-[4px]"}
              placeholder="e.g. It's always good to take a break..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label className={"mb-2"}>Subtasks</Label>
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  className={"border-[#44474d] rounded-[4px]"}
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
              className="w-full border-[#44474d] bg-white text-[#645fc6] hover:bg-[#19191a] hover:text-white"
              onClick={addSubtask}
            >
              + Add New Subtask
            </Button>
          </div>

          <div>
            <Label className={"mb-2"}>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                className={"w-full border-[#44474d] rounded-[4px]"}
              >
                <SelectValue>
                  {status
                    ? selectedBoard?.lists?.find((list) => list.id === status)?.title
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
            onClick={handleCreate}
            className="w-full rounded-2xl bg-[#645fc6] text-white"
          >
            Create Task
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
