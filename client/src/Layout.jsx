import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Fouter from "./components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex m-2 h-screen flex-col max-w-6xl mx-auto">
      <Header />
      <Outlet />
      <main className="flex-1">{children}</main>
      <Fouter />
    </div>
  );
}