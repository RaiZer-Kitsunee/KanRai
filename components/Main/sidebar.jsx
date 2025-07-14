import { Switch } from "@/components/ui/switch";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { CgGoogleTasks } from "react-icons/cg";
import ButtonAddBoard from "../My ui/button_addboard";
import ButtonBoard from "../My ui/button_board";

export default function Sidebar() {
  const purple = "#645fc6";
  const background_Sidebar = "#2c2c38";
  const background_MainContent = "#21212d";
  const text = "#8e94a3";

  return (
    <div
      className="h-full w-1/4 flex flex-col justify-between"
      style={{ backgroundColor: background_Sidebar }}
    >
      <div>
        {/* logo  */}
        <div className="flex items-center pt-5.5 pb-10 px-[6%] gap-1">
          <CgGoogleTasks className="text-4xl" style={{ color: purple }} />
          <h1 className="text-3xl font-bold">KanRai</h1>
        </div>

        {/* all board */}
        <div className="flex flex-col gap-4">
          <h3
            className="pl-[8%] uppercase font-semibold text-[0.7rem] tracking-[0.15rem]"
            style={{ color: text }}
          >
            All boards (10)
          </h3>
          <div className="flex flex-col gap-2">
            {/* board button */}
            <ButtonBoard selected={true} />
            <ButtonBoard selected={false} />
            <ButtonBoard selected={false} />
            {/* add board button  */}
            <ButtonAddBoard />
          </div>
        </div>
      </div>

      {/* additional setting */}
      <div className="flex flex-col items-start pl-5 gap-4 pb-7">
        {/* theme button */}
        <div
          className="w-[90%] flex justify-center py-3  gap-5 rounded-md"
          style={{ backgroundColor: background_MainContent }}
        >
          <MdLightMode className="text-[1.2rem]" style={{ color: text }} />
          <Switch className=" data-[state=checked]:bg-[#645fc6]" />
          <MdDarkMode className="text-[1.2rem]" style={{ color: text }} />
        </div>

        {/* hide sidebar button */}
        <div className="flex gap-3">
          <FaEyeSlash style={{ color: text }} />
          <p className="text-[0.8rem] font-bold" style={{ color: text }}>
            Hide Sidebar
          </p>
        </div>
      </div>
    </div>
  );
}
