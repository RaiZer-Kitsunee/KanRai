import { CgEnter } from "react-icons/cg";
import { TbLayoutBoardSplit } from "react-icons/tb";

export default function ButtonBoard({ board, closed, onclick }) {
  const purple = "#645fc6";
  const background_Sidebar = "#2c2c38";
  const text = "#8e94a3";

  return (
    <button
      onClick={onclick}
      className="w-[92%] h-10 pl-[7%] flex items-center rounded-r-full gap-4 cursor-pointer"
      style={{
        backgroundColor: board.selected ? purple : background_Sidebar,
        justifyContent: closed ? "center" : "start",
      }}
    >
      <TbLayoutBoardSplit
        className="text-[120%]"
        style={{ color: board.selected ? "white" : text }}
      />
      {closed ? (
        <></>
      ) : (
        <p
          className="text-[0.9rem] font-semibold tracking-wide"
          style={{
            color: board.selected ? "white" : text,
          }}
        >
          {board.title}
        </p>
      )}
    </button>
  );
}
