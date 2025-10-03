import { ChartAreaGradient } from "@/components/chart/chart";
import DashboardCarStyle from "@/components/card/card";
import Todos from "@/components/todosUnderChart/todos";
import Total from "@/components/totalUpChart/total";

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold p-[30px]">Dashboard</h1>
      <div className="flex gap-[100px] items-center">
        <div className="">
          <DashboardCarStyle />
          <ChartAreaGradient />
        </div>
        <div className="">
          <Total />
        </div>
      </div>
      <div className="">
        <Todos />
      </div>
    </div>
  );
};

export default Home;
