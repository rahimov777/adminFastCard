import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfiles } from "@/reducers/profile";
import { FaTrash } from "react-icons/fa";
import { LuPen, LuPenLine, LuTrash } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Orders = () => {
  const { dataProfiles } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUserProfiles());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users</h2>
        <Button className="bg-blue-500">+ Add user</Button>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-[30px]">
          <Input placeholder="Search..." />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-[10px]">
          <Button className="cursor-pointer" variant={"outline"}>
            <LuPenLine className="text-blue-500" />
          </Button>
          <Button className="cursor-pointer" variant={"outline"}>
            <LuTrash className="text-blue-500" />
          </Button>
        </div>
      </div>

      <Table className="w-[1200px] h-[800px] mt-[40px]">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>UserName</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataProfiles?.map((user, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>
                {user.userRoles.length > 0 ? user.userRoles[0].name : "-"}
              </TableCell>
              <TableCell>{user.email || "-"}</TableCell>
              <TableCell>{user.phoneNumber || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            ←
          </Button>
          {[...Array(dataProfiles.totalPage)].map((_, i) => (
            <Button
              key={i}
              variant={
                dataProfiles.pageNumber === i + 1 ? "default" : "outline"
              }
              size="sm"
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="sm">
            →
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Page {dataProfiles.pageNumber} of {dataProfiles.totalPage} —{" "}
          {dataProfiles.totalRecord} records
        </div>
      </div>
    </div>
  );
};

export default Orders;
