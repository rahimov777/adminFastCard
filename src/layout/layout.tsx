import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import { LuFolder, LuTag } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { FaHouse } from "react-icons/fa6";

const Layout = () => {
  const [firstLetter] = useState("YUSUF");
  const [logicH] = useState(firstLetter.at(0));

  return (
    <div>
      <nav>
        <div className="bg-gray-900">
          <div className="flex gap-[150px] pl-20 pr-20 items-center justify-between">
            <div className="flex gap-[10px] items-center">
              <div className="flex gap-[150px]">
                <img src="/src/assets/logo.svg" className="w-[166px]" alt="" />
                <div className="flex items-center">
                  <FaSearch className="text-white" />
                  <input
                    type="search"
                    className="w-[100px] h-[40px] placeholder:text-white outline-none pl-[10px] text-white"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-[30px] items-center">
              <LuBell className="text-white" />
              <div className="flex gap-5 items-center">
                <div className="w-[36px] h-[36px] bg-green-300 rounded-full text-white flex justify-center items-center font-bold">
                  {logicH &&
                    (firstLetter.at(1) == "h" || firstLetter.at(1) == "H"
                      ? firstLetter.slice(0, 2)
                      : firstLetter.at(0))}
                </div>
                <h2 className="text-white">{firstLetter}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="pl-[30px] w-[200px] h-[100vh] items-start pt-[50px] bg-gray-900 flex text-white">
            <div className="flex flex-col gap-[20px]">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-[10px] items-center w-[150px] h-[40px] bg-white text-[#5A607F] p-[10px] rounded-[4px]"
                    : "flex gap-[10px] items-center"
                }
                to={"/"}
              >
                <FaHouse /> Dashboard
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-[10px] items-center w-[150px] h-[40px] bg-white text-[#5A607F] p-[10px] rounded-[4px]"
                    : "flex gap-[10px] items-center"
                }
                to={"/orders"}
              >
                <FaBars /> Orders
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-[10px] items-center w-[150px] h-[40px] bg-white text-[#5A607F] p-[10px] rounded-[4px]"
                    : "flex gap-[10px] items-center"
                }
                to={"/products"}
              >
                <LuTag /> Product
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-[10px] items-center w-[150px] h-[40px] bg-white text-[#5A607F] p-[10px] rounded-[4px]"
                    : "flex gap-[10px] items-center"
                }
                to={"/other"}
              >
                <LuFolder /> Other
              </NavLink>
            </div>
          </div>
          <main>
            <Outlet />
          </main>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
