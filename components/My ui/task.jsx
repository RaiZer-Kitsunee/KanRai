export default function Task({ title }) {
  const background_Sidebar = "#2c2c38";
  const text = "#8e94a3";

  return (
    <div
      className="w-full flex flex-col gap-1 py-4 pl-3 rounded-md"
      style={{ backgroundColor: background_Sidebar }}
    >
      <h3 className="font-semibold text-[0.9rem]">{title}</h3>
      <p className="font-semibold text-[0.7rem]" style={{ color: text }}>
        0 of 3 substasks
      </p>
    </div>
  );
}
