import { TbLayoutBoardSplit } from "react-icons/tb";

export default function ButtonBoard({ selected }) {
  const purple = "#645fc6";
  const background_Sidebar = "#2c2c38";
  const text = "#8e94a3";

  return (
    <div
      className="w-[92%] h-10 pl-[7%] flex items-center rounded-r-full gap-4"
      style={{ backgroundColor: selected ? purple : background_Sidebar }}
    >
      <TbLayoutBoardSplit
        className="text-[120%]"
        style={{ color: selected ? "white" : text }}
      />
      <p
        className="text-[0.9rem] font-semibold tracking-wide"
        style={{
          color: selected ? "white" : text,
        }}
      >
        Eternal Night
      </p>
    </div>
  );
}
