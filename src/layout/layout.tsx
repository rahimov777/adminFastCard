import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaCaretDown, FaSearch } from "react-icons/fa";

import { LuBell, LuFolder, LuLogOut, LuTag } from "react-icons/lu";
import { FaHouse, FaX } from "react-icons/fa6";
import { GetToken } from "@/lib/utils";

const Layout = () => {
  const router = useNavigate();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  // const [errorr, setErrorr] = useState("");

  useEffect(() => {
    const dex = GetToken() && jwtDecode(GetToken());
    const isAdmin =
      dex["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!isAdmin) {
      router("/login");
      return;
    }

    try {
      const decoded = GetToken() && jwtDecode(GetToken());
      console.log("Decoded token:", decoded);

      if (isAdmin !== "SuperAdmin") {
        router("/login");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      router("/login");
    }
  }, [router]);

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
                <FaCaretDown
                  onClick={() => {
                    setModal(true);
                  }}
                  className="text-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="pl-[30px] w-[200px] h-[177vh] items-start pt-[50px] bg-gray-900 flex text-white">
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
                <FaBars /> Users
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
      <>
        {modal && (
          <div className="absolute z-20 right-0 top-[30px] mt-2 w-48 bg-black/50 backdrop-blur-md text-white rounded-lg shadow-lg py-2">
            <div
              className="cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-sm"
              onClick={() => {
                setModal(false),
                  localStorage.removeItem("accessToken"),
                  navigate("/login");
              }}
            >
              <LuLogOut /> Log Out
            </div>
            <div
              className="cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-sm"
              onClick={() => setModal(false)}
            >
              <FaX /> Cancel
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Layout;
