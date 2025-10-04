import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  AddBrand,
  DeleteBrand,
  EditBrand,
  GetBrand,
  GetCategories,
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

export default function BrandsPage() {
  const { brand } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [valueInpBrand, setValueInpBrand] = useState("");
  const [idx, setIdx] = useState(null);
  const [valueInpBrandEdit, setValueInpBrandEdit] = useState("");

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(EditBrand({ id: idx, name: valueInpBrandEdit }));
  };

  useEffect(() => {
    dispatch(GetBrand());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Navigation */}
        <Tabs defaultValue="brands" className="w-auto">
          <TabsList className="bg-transparent p-0 h-auto gap-2">
            <TabsTrigger
              value="categories"
              className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground rounded-md px-4 py-2 font-medium"
              asChild
            >
              <Link to="/">Categories</Link>
            </TabsTrigger>
            <TabsTrigger
              value="brands"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md px-4 py-2 font-medium"
              asChild
            >
              <Link to="/brands">Brands</Link>
            </TabsTrigger>
            <TabsTrigger
              value="banners"
              className="data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground rounded-md px-4 py-2 font-medium"
              asChild
            >
              <Link to="/banners">Banners</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Brands List */}
          <div className="rounded-lg border bg-card">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b px-6 py-4">
              <div className="text-sm font-medium text-muted-foreground">
                Brands
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Action
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y">
              {brand?.map((brand) => (
                <div
                  key={brand.id}
                  className="grid grid-cols-[1fr_auto] gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="text-sm font-medium">{brand.brandName}</div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => {
                            setIdx(brand.id);
                            setValueInpBrandEdit(brand.brandName);
                          }}
                          className="rounded p-1.5 text-primary transition-colors hover:bg-primary/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <form
                            className="flex gap-[20px] flex-col"
                            onSubmit={handleSubmitEdit}
                            action=""
                          >
                            <Input
                              value={valueInpBrandEdit}
                              onChange={(e) =>
                                setValueInpBrandEdit(e.target.value)
                              }
                            />
                            <DialogClose asChild>
                              <Button type="submit">Save</Button>
                            </DialogClose>
                            <DialogClose>
                              <Button className="w-[455px]" variant={"outline"}>Cancel</Button>
                            </DialogClose>
                          </form>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                    <button onClick={() => dispatch(DeleteBrand(brand.id))} className="rounded p-1.5 text-destructive transition-colors hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Brand Form */}
          <Card className="h-[200px]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Add new brand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={valueInpBrand}
                onChange={(e) => setValueInpBrand(e.target.value)}
                placeholder="Brand name"
                className="h-11"
              />
              <Button
                onClick={() =>
                  dispatch(AddBrand(valueInpBrand), setValueInpBrand(""))
                }
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Create
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
