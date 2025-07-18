import { Switch } from "@/components/ui/switch";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { CgGoogleTasks } from "react-icons/cg";
import { IoMdEye } from "react-icons/io";
import ButtonAddBoard from "../My ui/button_addboard";
import ButtonBoard from "../My ui/button_board";
import { useEffect, useState } from "react";
import BoardDialog from "../Dialog/board_dialog";
import { useTheme } from "next-themes";

export default function Sidebar({
  boards,
  onSelectBoard,
  addBoard,
  closed,
  setClosed,
  setBoards,
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [boardTitle, setBoardTitle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("theme");
    setTheme(data);
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!mounted) return;
  return (
    <div
      className={`h-full ${
        closed ? "w-[3%]" : "w-[21%]"
      } bg-[#FFFFFF] flex flex-col justify-between transition-normal duration-300 dark:bg-[#2c2c38]`}
    >
      <div>
        {/* logo  */}
        <div className="flex items-center pt-5.5 pb-10 px-[6%] gap-1">
          <CgGoogleTasks className="text-4xl text-[#645fc6] " />
          {closed ? (
            <></>
          ) : (
            <h1 className="text-3xl text-black font-bold dark:text-white">
              KanRai
            </h1>
          )}
        </div>

        {/* all board */}
        <div className="flex flex-col gap-4">
          {closed ? (
            <></>
          ) : (
            <h3 className="pl-[8%] text-[#64748B] uppercase font-semibold text-[0.7rem] tracking-[0.15rem] dark:text-[#8e94a3]">
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
                addBoard(boardTitle, setBoards);
                setBoardTitle("");
              }}
              buttonName={"Save"}
              open={open}
              setOpen={setOpen}
            >
              <ButtonAddBoard onClick={() => setOpen(!open)} closed={closed} />
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
        <div className="w-[90%] flex bg-[#f7f9fc] justify-center py-3 gap-5 rounded-md dark:bg-[#21212d]">
          {closed ? (
            <>
              {theme === "dark" ? (
                <MdLightMode
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="text-[1.2rem] text-[#8e94a3] cursor-pointer"
                />
              ) : (
                <MdDarkMode
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-[1.2rem] text-[#8e94a3] cursor-pointer"
                />
              )}
            </>
          ) : (
            <>
              <MdDarkMode className="text-[1.2rem] text-[#8e94a3]" />
              <Switch
              
                checked={theme === "dark" ? false : true}
                onCheckedChange={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className=" data-[state=checked]:bg-[#645fc6]"
              />
              <MdLightMode className="text-[1.2rem] text-[#8e94a3]" />
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
                className="text-[1.2rem] cursor-pointer text-[#8e94a3]"
              />
            </>
          ) : (
            <>
              <FaEyeSlash
                onClick={() => setClosed(!closed)}
                className="cursor-pointer text-[#8e94a3]"
              />
              <p className="text-[0.8rem] font-bold text-[#8e94a3]">
                Hide Sidebar
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
