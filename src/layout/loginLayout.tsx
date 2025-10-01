import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GetToken } from "@/lib/utils";

const LoginLayout = () => {
  const decoded = GetToken() && jwtDecode(GetToken());
  console.log(decoded);

  return (
    <div className=" text-white flex">
      <div className="w-[750px] h-screen bg-[#1C2536] flex pl-[64px] items-center">
        <div className="">
          <h2 className="text-[24px]">Welcome to admin panel</h2>
          <img src="/src/assets/logo.svg" alt="" />
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
