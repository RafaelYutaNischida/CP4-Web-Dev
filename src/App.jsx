import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingBlock: "2rem" }}>
        <Outlet />
      </main>
    </>
  );
}
