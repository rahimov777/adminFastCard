import LoginLayout from "@/layout/loginLayout";
import { MyAxios, SaveToken } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function Login(user: object) {
    try {
      setLoading(true);
      const { data } = await MyAxios.post(`/Account/login`, user);
      SaveToken(data.data);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      setError("Invalid password or username");
      setLoading(false);
      console.log(error);
    }
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login({ userName, password });
  };

  return (
    <div>
      <div className="w-[700px] bg-white text-black h-[100vh] justify-self-end flex justify-center items-center">
        <div className="">
          <h2 className="font-bold text-[24px]">Login</h2>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-[20px] mt-[20px] text-center"
            action=""
          >
            <input
              type="text"
              className="w-[400px] h-[56px] border-[1px] border-[#E5E5E5] rounded-[4px] pl-[16px]"
              placeholder="Email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <div className="relative w-[400px]">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-[56px] border-[1px] border-[#E5E5E5] rounded-[4px] pl-[16px] pr-[40px]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-[12px] top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <a className="text-blue-500 font-semibold" href="">
              Forgot password?
            </a>
            <button
              className={`w-[400px] h-[56px] ${
                loading ? "bg-blue-200" : "bg-blue-500"
              } text-white rounded-[4px] cursor-pointer flex justify-center items-center`}
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader /> : "Log in"}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
