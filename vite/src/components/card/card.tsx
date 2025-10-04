"use client";

import { Gauge, DollarSign, TrendingUp, Loader2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetProduct } from "@/reducers/profile";

export default function DashboardCarStyle() {
  const { data, isLoading } = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const totalSales = data?.products?.reduce((sum, p) => sum + p.price, 0);
  const totalCost = data?.products?.reduce((sum, p) => sum + p.discountPrice, 0);
  const totalProfit = totalSales - totalCost;

  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  if (isLoading) {
    return <Loader2Icon/>;
  }

  return (
    <div className="space-y-6  p-6 rounded-xl text-white">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-red-600 to-red-400 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <DollarSign className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            ${totalSales}k
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Cost</CardTitle>
            <Gauge className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            ${totalCost}k
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-400 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <TrendingUp className="h-5 w-5" />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            ${totalProfit}k
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
