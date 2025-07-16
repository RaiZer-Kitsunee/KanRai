"use client";

import { Children, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
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
import { Button } from "@/components/ui/button";

export default function ViewTaskDialog({
  task,
  onToggleSubtask,
  children,
  listTitle,
}) {
  const [open, setOpen] = useState(false);

  const completedCount = task.subtasks.filter((s) => s.completed).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-md space-y-4 bg-[#2c2c38] border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {task.title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm  text-[#727481]">{task.description}</p>

        <div className="space-y-2">
          <p className="text-sm font-medium">
            Subtasks ({completedCount} of {task.subtasks.length})
          </p>
          {task.subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className={`flex items-center text-[#9e9ea6] gap-2 p-2 rounded bg-[#21212d] ${
                subtask.completed ? "opacity-50 line-through" : ""
              }`}
            >
              <Checkbox
                id={`subtask-${subtask.id}`}
                checked={subtask.completed}
                onCheckedChange={() => onToggleSubtask(task.id, subtask.id)}
              />
              <Label
                htmlFor={`subtask-${subtask.id}`}
                className="w-full text-sm"
              >
                {subtask.title}
              </Label>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <Label>Status</Label>
          <Select value={listTitle} disabled>
            <SelectTrigger className={"w-full border-[#44474d] rounded-[4px]"}>
              <SelectValue>{listTitle}</SelectValue>
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
