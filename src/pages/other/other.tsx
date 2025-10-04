import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Smartphone,
  Monitor,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  AddCategory,
  DeleteCategory,
  EditProducts,
  GetBrand,
  GetCategories,
  GetSubCategories,
} from "@/reducers/profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogClose } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import BrandsPage from "@/components/brand/brand";
import Subcategory from "@/components/subcategory/subcategory";

export default function Other() {
  const { cat, subCat } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [idx, setIdx] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [inpCatAdd, setInpCatAdd] = useState("");
  const [img, setImg] = useState(null);

  const [valueTab, setValueTab] = useState("categories");

  const handleEditProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Id", idx);
    formData.append("CategoryImage", categoryImage);
    formData.append("CategoryName", categoryName);

    dispatch(EditProducts(formData));
    dispatch(GetCategories());
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("CategoryImage", img);
    formData.append("CategoryName", inpCatAdd);

    dispatch(AddCategory(formData));
  };

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetBrand());
    dispatch(GetSubCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header with Tabs and Add Button */}
        <div className="flex items-center justify-between">
          <Tabs
            value={valueTab}
            onValueChange={(value) => setValueTab(value)}
            className="w-auto"
          >
            <TabsList className="bg-transparent p-0 h-auto gap-2">
              <TabsTrigger
                value="categories"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md px-4 py-2 font-medium"
              >
                Categories
              </TabsTrigger>
              <TabsTrigger
                value="brands"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md px-4 py-2 font-medium"
              >
                Brands
              </TabsTrigger>
              <TabsTrigger
                value="banners"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md px-4 py-2 font-medium"
              >
                Banners
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add new
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <form
                  onSubmit={handleAddProduct}
                  className="flex flex-col gap-[10px]"
                  action=""
                >
                  <Input
                    value={inpCatAdd}
                    onChange={(e) => setInpCatAdd(e.target.value)}
                  />
                  <Input
                    onChange={(e) => setImg(e.target.files[0])}
                    type="file"
                  />
                  <DialogClose asChild>
                    <Button type="submit">Add</Button>
                  </DialogClose>
                  <DialogClose>
                    <Button
                      className="w-[460px]"
                      type="button"
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </form>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-white border-border"
          />
        </div>

        {/* Categories Grid */}
        {valueTab == "categories" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cat?.map((category) => (
              <Card
                key={category.id}
                className="relative p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow border-border bg-white"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer absolute top-2 right-2 h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => {
                        setIdx(category.id);
                        setCategoryName(category.categoryName);
                        setCategoryImage(null);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <form
                        className="flex gap-[20px] flex-col"
                        onSubmit={handleEditProduct}
                        action=""
                      >
                        <Input
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <Input
                          onChange={(e) => setCategoryImage(e.target.files[0])}
                          type="file"
                        />
                        <DialogClose asChild>
                          <Button type="submit">Save</Button>
                        </DialogClose>
                      </form>
                      <DialogClose>
                        <Button
                          className="w-[460px] mt-[10px]"
                          variant={"outline"}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={() => dispatch(DeleteCategory(category.id))}
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer absolute top-2 right-8 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-blue-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>

                <div className="flex items-center justify-center">
                  <img
                    src={`http://37.27.29.18:8002/images/${category.categoryImage}`}
                    alt=""
                  />
                </div>

                <p className="text-sm font-medium text-center">
                  {category.categoryName}
                </p>
              </Card>
            ))}
          </div>
        )}

        {valueTab == "brands" && (
          <div className="">
            <BrandsPage />
          </div>
        )}
        {valueTab == "banners" && <Subcategory />}

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-blue-50 text-blue-600"
            >
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              4
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              5
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              6
            </Button>
            <span className="px-2 text-muted-foreground">...</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              24
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">274 Results</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
