import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";

// const Home     = lazy(() => import("../pages/Home"));
const About    = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Portfolio= lazy(() => import("../pages/Portfolio"));
const Contact  = lazy(() => import("../pages/Contact"));

const Loader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"/>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // { index: true,        element: <Suspense fallback={<Loader/>}><Home /></Suspense> },
      { path: "about",      element: <Suspense fallback={<Loader/>}><About /></Suspense> },
      { path: "services",   element: <Suspense fallback={<Loader/>}><Services /></Suspense> },
      { path: "portfolio",  element: <Suspense fallback={<Loader/>}><Portfolio /></Suspense> },
      { path: "contact",    element: <Suspense fallback={<Loader/>}><Contact /></Suspense> },
    ],
  },
]);
export default router;
