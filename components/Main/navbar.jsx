import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";

export default function Navbar() {
  const background_Sidebar = "#2c2c38";

  return (
    <div
      className="w-full h-20 px-5 flex justify-between items-center"
      style={{ backgroundColor: background_Sidebar }}
    >
      {/* title of the board */}
      <h2 className="text-[1.3rem] font-semibold">Eternal Night</h2>

      {/* the buttons */}
      <div className="flex items-center gap-4">
        <button className="bg-[#645fc6] font-semibold text-[0.9rem] tracking-wide px-4 py-2 rounded-3xl hover:scale-102 transition-transform duration-300 cursor-pointer">
          +Add New Task
        </button>

        {/* just the drop menu of the three point */}
        <DropdownMenu>
          <DropdownMenuTrigger className="text-[1.2rem] cursor-pointer">
            <HiDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={"w-30 mr-6 bg-[#2c2c38] border-[#8e94a3]"}
          >
            <DropdownMenuItem className={"text-[#8e94a3]"}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className={"text-[#8e94a3]"}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
