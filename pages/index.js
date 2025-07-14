import Board from "@/components/Main/board";
import Navbar from "@/components/Main/navbar";
import Sidebar from "@/components/Main/sidebar";

export default function Home() {
  const purple = "#645fc6";
  const background_Sidebar = "#2c2c38";
  const background_MainContent = "#21212d";
  const text = "#8e94a3";

  return (
    <div
      className="w-screen h-screen flex"
      style={{ backgroundColor: background_MainContent }}
    >
      {/* the side bar */}
      <Sidebar />

      {/*  the content part */}
      <div
        className="h-full w-7/8 overflow-hidden"
        style={{ backgroundColor: background_MainContent }}
      >
        {/* navbar */}
        <Navbar />

        {/* board */}
        <Board />
      </div>
    </div>
  );
}
