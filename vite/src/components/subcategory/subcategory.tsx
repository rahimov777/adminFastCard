import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  AddSubCategory,
  DeleteSubCategory,
  EditSubCategory,
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
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

const Subcategory = () => {
  const { subCat } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [addInpName, setAddInpName] = useState("");
  const [idx, setIdx] = useState("");
  const [editId, setEditId] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editName, setEditName] = useState("");

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    dispatch(AddSubCategory({ CategoryId: idx, SubCategoryName: addInpName }));
    setAddInpName("");
    setIdx("");
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(
      EditSubCategory({
        Id: editId,
        CategoryId: editCategoryId,
        SubCategoryName: editName,
      })
    );
  };

  useEffect(() => {
    dispatch(GetSubCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-sans text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                Categories
              </h1>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                Manage your categories and subcategories
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <form
                    className="flex flex-col gap-[20px]"
                    onSubmit={handleSubmitAdd}
                    action=""
                  >
                    <Input
                      value={idx}
                      onChange={(e) => setIdx(e.target.value)}
                    />
                    <Input
                      value={addInpName}
                      onChange={(e) => setAddInpName(e.target.value)}
                    />
                    <DialogClose asChild>
                      <Button type="submit">Add</Button>
                    </DialogClose>
                    <DialogClose>
                      <Button className="w-[455px]" variant={"outline"}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subCat?.map((category) => (
            <Card
              key={category.id}
              className="group relative border-border bg-card transition-all duration-300 hover:border-primary/50"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-sans text-xl font-medium text-card-foreground mb-2">
                      {category.subCategoryName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Badge variant="secondary" className="text-xs">
                    {category.id} items
                  </Badge>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setEditId(category.id);
                            setEditCategoryId(category.categoryId);
                            setEditName(category.subCategoryName);
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                            onSubmit={handleSubmitEdit}
                            className="flex flex-col gap-[20px]"
                          >
                            <Input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder="Enter new name"
                            />
                            <Input
                              value={editCategoryId}
                              onChange={(e) => setEditCategoryId(e.target.value)}
                              placeholder="Enter new categoryID"
                            />
                            <DialogClose asChild>
                              <Button type="submit">Save</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                          </form>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                    <Button
                      onClick={() => dispatch(DeleteSubCategory(category.id))}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 font-sans text-4xl font-semibold text-foreground">
                606
              </div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-sans text-4xl font-semibold text-foreground">
                {subCat.length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-sans text-4xl font-semibold text-foreground">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">
                Always Updated
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Subcategory;
