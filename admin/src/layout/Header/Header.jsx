import DarkModeSwitcher from "./DarkModeSwitcher/DarkModeSwitcher";
import DropdownNotification from "./DropDownNotification/DropDownNotification";
import DropdownUser from "./DropDownUser/DropDownUser";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ isSideNavOpen, setIsSideNavOpen }) => {
  return (
    <header className=" border sticky top-0 z-10 h-[10vh] hidden lg:flex w-full bg-[#ffffff] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="hidden lg:block">
          <form action="submit">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <SearchIcon className="hover:text-blue-600" />
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex  items-center gap-7 2xsm:gap-7">
          <ul className="flex   items-center gap-10 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
