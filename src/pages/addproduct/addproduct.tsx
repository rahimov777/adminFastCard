"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Upload, X, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddColor,
  AddProducts,
  GetBrand,
  GetCategories,
  GetColor,
  GetProduct,
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

export default function AddProduct() {
  const [selectedColors, setSelectedColors] = useState<number | null>(null);
  const [tags, setTags] = useState([
    "T-Shirt",
    "Men Clothes",
    "Summer Collection",
  ]);

  const { cat, brand, color } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetBrand());
    dispatch(GetColor());
  }, [dispatch]);

  const [tagInput, setTagInput] = useState("");
  const [differentOptions, setDifferentOptions] = useState(false);
  const [addTax, setAddTax] = useState(false);
  const [sizeOptions, setSizeOptions] = useState(["S", "M", "L", "XL"]);
  const [weightOptions, setWeightOptions] = useState(["10", "20", "30"]);
  const [sizeInput, setSizeInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const navigate = useNavigate();
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("#000000");

  const [productName, setProductName] = useState("");
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [selectCat, setSelectCat] = useState("");
  const [selectBrand, setSelectBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [count, setCount] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const toggleColor = (id: number) => {
    setSelectedColors(id);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeSize = (size: string) => {
    setSizeOptions(sizeOptions.filter((s) => s !== size));
  };

  const addWeight = () => {
    if (weightInput.trim() && !weightOptions.includes(weightInput.trim())) {
      setWeightOptions([...weightOptions, weightInput.trim()]);
      setWeightInput("");
    }
  };

  const removeWeight = (weight: string) => {
    setWeightOptions(weightOptions.filter((w) => w !== weight));
  };

  const handleAddProduct = () => {
    if (
      !productName ||
      !selectCat ||
      !selectBrand ||
      !code ||
      !productPrice ||
      !count
    ) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", productName);
    formData.append("BrandId", selectBrand);
    formData.append("ColorId", selectedColors?.toString() || "");
    formData.append("Quantity", count);
    formData.append("Code", code);
    formData.append("Price", productPrice);
    formData.append("HasDiscount", discount ? "true" : "false");
    if (discount) formData.append("DiscountPrice", discount);
    formData.append("SubCategoryId", selectCat);
    formData.append("Description", desc || "");
    formData.append("Size", sizeInput || "");
    formData.append("Weight", weightInput || "");

    images.forEach((file) => formData.append("Images", file));

    dispatch(AddProducts(formData));
    console.log(AddProducts(formData));
    // navigate("/products")
    
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/products"
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">
              <Link
                to="/products"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span>Add new</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate(-1)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
          action=""
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Main Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Information Section */}

              <Card className="p-6">
                <h2 className="mb-4 text-sm font-semibold">Information</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product name</Label>
                      <Input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        id="product-name"
                        placeholder="Normal"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        id="code"
                      />
                    </div>
                  </div>

                  {/* Rich Text Editor Toolbar */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 rounded-md border border-input bg-background p-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="font-bold">B</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="italic">I</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="underline">U</span>
                      </Button>
                      <div className="mx-1 h-6 w-px bg-border" />
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        ≡
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        ≣
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        ⚡
                      </Button>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      className="min-h-[120px]"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="categories">Categories</Label>
                      <Select
                        value={selectCat}
                        onValueChange={(val) => setSelectCat(val)}
                      >
                        <SelectTrigger id="categories">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cat?.map((e) => (
                            <SelectItem key={e.id} value={e.id.toString()}>
                              {e.categoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brands">Brands</Label>
                      <Select
                        value={selectBrand}
                        onValueChange={(val) => setSelectBrand(val)}
                      >
                        <SelectTrigger id="brands">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {brand?.map((el) => (
                            <SelectItem key={el.id} value={el.id.toString()}>
                              {el.brandName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Price Section */}
              <Card className="p-6">
                <h2 className="mb-4 text-sm font-semibold">Price</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="price">Product price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          id="price"
                          className="pl-7"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discount">Discount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          id="discount"
                          className="pl-7"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="count">Count</Label>
                      <Input
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        id="count"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="add-tax" className="text-sm font-normal">
                      Add tax for this product
                    </Label>
                    <Switch
                      id="add-tax"
                      checked={addTax}
                      onCheckedChange={setAddTax}
                    />
                  </div>
                </div>
              </Card>

              {/* Different Options Section */}
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">Different Options</h2>
                    <p className="text-xs text-muted-foreground">
                      This product has multiple options
                    </p>
                  </div>
                  <Switch
                    checked={differentOptions}
                    onCheckedChange={setDifferentOptions}
                  />
                </div>

                {differentOptions && (
                  <div className="space-y-4">
                    {/* Size Options */}
                    <div className="space-y-2">
                      <Label>Option 1</Label>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Size" className="flex-1" />
                        <div className="flex flex-wrap gap-2">
                          {sizeOptions.map((size) => (
                            <Badge
                              key={size}
                              variant="secondary"
                              className="gap-1 px-2 py-1"
                            >
                              {size}
                              <button
                                onClick={() => removeSize(size)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Weight Options */}
                    <div className="space-y-2">
                      <Label>Option 2</Label>
                      <div className="space-y-2">
                        <Input
                          placeholder="Weight"
                          value={weightInput}
                          onChange={(e) => setWeightInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addWeight();
                            }
                          }}
                        />
                        <div className="flex flex-wrap gap-2">
                          {weightOptions.map((weight) => (
                            <Badge
                              key={weight}
                              variant="secondary"
                              className="gap-1 px-2 py-1"
                            >
                              {weight}
                              <button
                                onClick={() => removeWeight(weight)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Option 2</Label>
                      <Input placeholder="Value" />
                    </div>

                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm text-primary"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add more
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Color, Tags, Images */}
            <div className="space-y-6">
              {/* Colour Section */}
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold">Colour:</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="cursor-pointer h-auto p-0 text-sm text-primary"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Create new
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>New color</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-2 items-center">
                          <Label htmlFor="colorName">Color name</Label>
                          <Input
                            id="colorName"
                            placeholder="Color name"
                            value={colorName}
                            onChange={(e) => setColorName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                          <Label>Pick color</Label>
                          <input
                            type="color"
                            value={colorCode}
                            onChange={(e) => setColorCode(e.target.value)}
                            className="h-10 w-20 cursor-pointer rounded border border-input p-0"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <DialogClose>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                        <Button onClick={() => dispatch(AddColor(colorName))}>
                          Create
                        </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex gap-2">
                  {color?.map((elem) => (
                    <button
                      key={elem.id}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleColor(elem.id);
                      }}
                      className={`relative h-10 w-10 rounded-full border-2 transition-all hover:scale-110 ${
                        selectedColors === elem.id
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: elem.colorName }}
                      aria-label={elem.colorName}
                    >
                      {selectedColors === elem.id && (
                        <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Tags Section */}
              <Card className="p-6">
                <h2 className="mb-4 text-sm font-semibold">Tags</h2>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tags name"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={addTag}
                      className="shrink-0 bg-transparent"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 px-3 py-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Images Section */}
              <Card className="p-6">
                <h2 className="mb-4 text-sm font-semibold">Images</h2>
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 p-8 text-center">
                    <div>
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer inline-flex items-center"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </label>

                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            setImages(Array.from(e.target.files));
                          }
                        }}
                      />
                    </div>
                    <p className="mb-1 text-sm font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      SVG, PNG, JPG or GIF (max 800x400px)
                    </p>
                  </div>

                  {/* Image List */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-[auto_1fr_auto] gap-3 text-xs font-medium text-muted-foreground">
                      <span>Image</span>
                      <span>File name</span>
                      <span>Actions</span>
                    </div>
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-border p-2"
                      >
                        <div className="h-10 w-10 rounded bg-muted">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="h-full w-full rounded object-cover"
                          />
                        </div>
                        <span className="truncate text-sm">{image.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            setImages(images.filter((_, i) => i !== index))
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  );
}
