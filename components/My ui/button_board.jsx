import { TbLayoutBoardSplit } from "react-icons/tb";

export default function ButtonBoard({ board, closed, onclick }) {
  const text = "#8e94a3";

  return (
    <button
      onClick={onclick}
      className={`w-[92%] h-10 pl-[7%] ${
        board.selected ? "bg-[#645fc6]" : "bg-[#F7F9FC]"
      } flex items-center ${
        closed ? "justify-center" : "justify-start"
      } rounded-r-full gap-2 cursor-pointer dark:${
        board.selected ? "bg-[#645fc6]" : "bg-[#2c2c38]"
      }`}
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
