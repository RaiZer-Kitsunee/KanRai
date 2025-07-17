import { Switch } from "@/components/ui/switch";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { CgGoogleTasks } from "react-icons/cg";
import { IoMdEye } from "react-icons/io";
import ButtonAddBoard from "../My ui/button_addboard";
import ButtonBoard from "../My ui/button_board";
import { useState } from "react";
import BoardDialog from "../Dialog/board_dialog";

export default function Sidebar({
  boards,
  onSelectBoard,
  addBoard,
  closed,
  setClosed,
}) {
  const [boardTitle, setBoardTitle] = useState("");

  const purple = "#645fc6";
  const background_Sidebar = "#2c2c38";
  const background_MainContent = "#21212d";
  const text = "#8e94a3";

  return (
    <div
      className="h-full flex flex-col justify-between transition-normal duration-300"
      style={{
        backgroundColor: background_Sidebar,
        width: closed ? "3%" : "21%",
      }}
    >
      <div>
        {/* logo  */}
        <div className="flex items-center pt-5.5 pb-10 px-[6%] gap-1">
          <CgGoogleTasks className="text-4xl" style={{ color: purple }} />
          {closed ? <></> : <h1 className="text-3xl font-bold">KanRai</h1>}
        </div>

        {/* all board */}
        <div className="flex flex-col gap-4">
          {closed ? (
            <></>
          ) : (
            <h3
              className="pl-[8%] uppercase font-semibold text-[0.7rem] tracking-[0.15rem]"
              style={{ color: text }}
            >
              All boards ({boards.length})
            </h3>
          )}
          <div className="flex flex-col gap-2">
            {/* board button */}
            {boards.map((board) => (
              <ButtonBoard
                key={board.id}
                board={board}
                closed={closed}
                onclick={() => onSelectBoard(board.id)}
              />
            ))}
            {/* add board button  */}
            <BoardDialog
              title={"Create Board"}
              description={"Create board here. Click save when you're done."}
              value={boardTitle}
              setValue={setBoardTitle}
              onSubmit={() => {
                addBoard(boardTitle);
                setBoardTitle("");
              }}
              buttonName={"Save"}
            >
              <ButtonAddBoard closed={closed} />
            </BoardDialog>
          </div>
        </div>
      </div>

      {/* additional setting */}
      <div
        className="flex flex-col items-center gap-4 pb-7"
        style={{ padding: closed && 0, marginBottom: closed && 15 }}
      >
        {/* theme button */}
        <div
          className="w-[90%] flex justify-center py-3 gap-5 rounded-md"
          style={{ backgroundColor: background_MainContent }}
        >
          {closed ? (
            <>
              <MdLightMode className="text-[1.2rem]" style={{ color: text }} />
            </>
          ) : (
            <>
              <MdDarkMode className="text-[1.2rem]" style={{ color: text }} />
              <Switch className=" data-[state=checked]:bg-[#645fc6]" />
              <MdLightMode className="text-[1.2rem]" style={{ color: text }} />
            </>
          )}
        </div>

        {/* hide sidebar button */}
        <div
          className="flex gap-3"
          style={{
            padding: closed,
          }}
        >
          {closed ? (
            <>
              <IoMdEye
                onClick={() => setClosed(!closed)}
                className="text-[1.2rem] cursor-pointer"
                style={{ color: text }}
              />
            </>
          ) : (
            <>
              <FaEyeSlash
                onClick={() => setClosed(!closed)}
                className="cursor-pointer"
                style={{ color: text }}
              />
              <p className="text-[0.8rem] font-bold" style={{ color: text }}>
                Hide Sidebar
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
