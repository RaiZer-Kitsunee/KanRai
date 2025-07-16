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
  value,
  setValue,
  onSubmit,
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <DialogContent className={"bg-[#2c2c38] border-none"}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className={"font-bold text-[#666b77]"}>
          {description}
        </DialogDescription>
        <fieldset>
          <Input
            className={"border-[#44474d]"}
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
              onClick={onSubmit}
              className="inline-flex h-[35px] items-center justify-center rounded bg-[#333] px-[15px] font-medium leading-none text-white outline-none outline-offset-1 hover:bg-[#645fc6] focus-visible:outline-2 focus-visible:outline-green6 select-none"
            >
              Save changes
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
