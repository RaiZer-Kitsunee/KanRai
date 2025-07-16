import { TbLayoutBoardSplit } from "react-icons/tb";
import { MdLibraryAdd } from "react-icons/md";

export default function ButtonAddBoard({ closed }) {
  const purple = "#645fc6";
  const background_Sidebar = "#2c2c38";

  return (
    <div
      className="w-[92%] h-10 pl-[7%] flex items-center rounded-r-full gap-4 cursor-pointer"
      style={{
        backgroundColor: background_Sidebar,
        color: purple,
        justifyContent: closed ? "center" : "start",
      }}
    >
      {closed ? (
        <>
          <MdLibraryAdd className="text-[120%]" />
        </>
      ) : (
        <>
          <TbLayoutBoardSplit className="text-[120%]" />
          <p className="text-[0.9rem] font-semibold tracking-wide">
            + Create New Board
          </p>
        </>
      )}
    </div>
  );
}
