import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function Index() {
  return (
    <div style={{ background: "#f6fdf7", minHeight: "100vh" }}>
      <Navbar />
      <Outlet />
    </div>
  );
}
