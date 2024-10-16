// ----------------------------------Imports--------------------------------------

import React, { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";

// --------------------------------------------------------------------------------

const DefaultLayout = () => {
  // ----------------------------------States--------------------------------------
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  // --------------------------------------------------------------------------------
  return (
    <div>
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed right-6 top-2 z-40 order-10 block h-10 w-10 self-center rounded bg-red-400 opacity-100  lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-4"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>
      <div className="flex">
        <div
          className={`${isSideNavOpen ? "visible" : "hidden"} w-72 lg:block`}
        >
          <Sidebar
            isSideNavOpen={isSideNavOpen}
            setIsSideNavOpen={setIsSideNavOpen}
          />
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-auto ">
          {/* <Header
            isSideNavOpen={isSideNavOpen}
            setIsSideNavOpen={setIsSideNavOpen}
          /> */}
          <Main />
        </div>
      </div>

      {/* <Footer/> */}
    </div>
  );
};

export default DefaultLayout;
