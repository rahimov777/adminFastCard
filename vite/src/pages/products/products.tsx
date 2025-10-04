"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiPlus,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetProduct } from "@/reducers/profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";

export function Products() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProduct());
  }, [dispatch]);

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === data.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data.map((p) => p.id));
    }
  };

  return (
    <div className="w-full space-y-4 m-[10px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Products</h1>
        <Link to={"/addnew"}>
        <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
          <FiPlus className="mr-2 h-4 w-4" />
          Add order
        </Button>
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter</span>
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="stock">In Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table className="w-[1240px] h-[300px] mt-[20px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedProducts.length === data?.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products?.map((el) => (
              <TableRow key={el.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(el.id)}
                    onCheckedChange={() => toggleProduct(el.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                      <img
                        src={`http://37.27.29.18:8002/images/${el.image}`}
                        alt={el.name}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{el.productName}</span>
                  </div>
                </TableCell>
                <TableCell>{el.quantity} in stock</TableCell>
                <TableCell className="text-muted-foreground">
                  {el.categoryName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  ${el.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Link to={"/editproduct"}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-bold">
                            Delete product
                          </DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this{" "}
                            {el.productName}?
                            <DialogFooter>
                              <DialogClose>
                                <Button className="cursor-pointer bg-blue-500">
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button
                                onClick={() => dispatch(DeleteProduct(el.id))}
                                className="border-red-500 text-red-500 cursor-pointer"
                                variant={"outline"}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ←
          </Button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="icon"
              className={`h-8 w-8 ${
                currentPage === page
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <span className="text-muted-foreground">...</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(24)}
          >
            24
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage((p) => Math.min(24, p + 1))}
            disabled={currentPage === 24}
          >
            →
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">274 Results</span>
      </div>
    </div>
  );
}
