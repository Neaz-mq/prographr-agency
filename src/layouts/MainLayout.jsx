import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomScrollbar from "../components/CustomScrollbar";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function MainLayout() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen flex flex-col">
      <CustomScrollbar />
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}