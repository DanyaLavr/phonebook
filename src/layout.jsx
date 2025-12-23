import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Suspense } from "react";
import AutoLogin from "./lib/firebase/AutoLogin";

const Layout = () => {
  return (
    <>
      <AutoLogin />
      <main>
        <Header />
        <Suspense fallback={<p>Loading pages, please wait...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
