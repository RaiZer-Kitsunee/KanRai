import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";

export default function MyDropdownMenu({ onDelete, isSmall, onEdit }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-[1.2rem] cursor-pointer">
        <HiDotsVertical className={`${isSmall ? "text-[0.9rem]" : ""}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={"w-30 mr-6 bg-[#2c2c38] border-[#8e94a3]"}
      >
        <DropdownMenuItem onClick={onEdit} className={"text-white"}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className={"text-red-500"}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
