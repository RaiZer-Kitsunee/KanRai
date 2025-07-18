import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function BoardDialog({
  children,
  title,
  description,
  buttonName,
  value,
  setValue,
  onSubmit,
  open,
  setOpen,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      // Don't close dialog
      alert("Title is required");
      return;
    }

    // All good, close dialog
    setOpen(false);
  };
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <DialogContent className={" bg-[#FFFFFF] border-none dark:bg-[#2c2c38]"}>
        <DialogTitle className={"text-[#0F172A] dark:text-[#FFFFFF]"}>
          {title}
        </DialogTitle>
        <DialogDescription
          className={"font-bold text-[#64748B] dark:text-[#A3A3A3]"}
        >
          {description}
        </DialogDescription>
        <fieldset>
          <Input
            className={
              "border-[#CBD5E1] bg-[#F1F5F9] text-[#1E293B] dark:bg-[#1E1E2F] dark:border-[#4B5563] dark:text-[#ffffff]"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id="name"
            type="text"
            placeholder="Board Name"
          />
        </fieldset>
        <div className="mt-[25px] flex justify-end">
          <DialogClose asChild>
            <button
              onClick={(e) => {
                handleSubmit(e);
                onSubmit();
              }}
              className="inline-flex h-[35px] items-center justify-center rounded bg-[#E2E8F0] text-[#1E293B]  px-[15px] font-medium leading-none outline-none outline-offset-1 hover:bg-[#645fc6] hover:text-[#EDEDED] focus-visible:outline-2 focus-visible:outline-green6 select-none dark:bg-[#222232] dark:text-[#EDEDED]"
            >
              {buttonName}
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
