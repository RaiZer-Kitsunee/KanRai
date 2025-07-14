import BoardPage from "@/components/Main/board";
import Navbar from "@/components/Main/navbar";
import Sidebar from "@/components/Main/sidebar";
import { Board } from "@/Data/board";
import { useState } from "react";

export default function Home() {
  const purple = "#645fc6";
  const background_Sidebar = "#2c2c38";
  const background_MainContent = "#21212d";
  const text = "#8e94a3";

  const [boards, setBoard] = useState([
    new Board(new Date(), "night of darkness", true),
    new Board(new Date(), "this is a test", false),
  ]);

  return (
    <div
      className="w-screen h-screen flex"
      style={{ backgroundColor: background_MainContent }}
    >
      {/* the side bar */}
      <Sidebar boards={boards} />

      {/*  the content part */}
      <div
        className="h-full w-7/8"
        style={{ backgroundColor: background_MainContent }}
      >
        {/* navbar */}
        <Navbar />

        {/* board */}
        <BoardPage />
      </div>
    </div>
  );
}
