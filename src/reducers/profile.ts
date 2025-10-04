import { MyAxios } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProfileSlice {
  data: never[];
  dataProfiles: never[];
  isLoading: boolean;
  cat: never[];
  subCat: never[];
  brand: never[];
  color: never[];
}

const initialState: ProfileSlice = {
  data: [],
  dataProfiles: [],
  isLoading: false,
  cat: [],
  subCat: [],
  brand: [],
  color: [],
};

export const GetProduct = createAsyncThunk("profile/GetProduct", async () => {
  try {
    const { data } = await MyAxios.get("/Product/get-products");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const DeleteProduct = createAsyncThunk(
  "profile/DeleteProduct",
  async (id, { dispatch }) => {
    try {
      await MyAxios.delete(`/Product/delete-product?id=${id}`);
      dispatch(GetProduct());
    } catch (error) {
      console.log(error);
    }
  }
);

export const GetUserProfiles = createAsyncThunk(
  "profile/GetUserProfiles",
  async () => {
    try {
      const { data } = await MyAxios.get("/UserProfile/get-user-profiles");
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const GetCategories = createAsyncThunk(
  "profile/GetCategories",
  async () => {
    try {
      const { data } = await MyAxios.get("/Category/get-categories");
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const GetSubCategories = createAsyncThunk(
  "profile/GetSubCategories",
  async () => {
    try {
      const { data } = await MyAxios.get("/SubCategory/get-sub-category");
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const GetBrand = createAsyncThunk("profile/GetBrand", async () => {
  try {
    const { data } = await MyAxios.get("/Brand/get-brands");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const GetColor = createAsyncThunk("profile/GetColor", async () => {
  try {
    const { data } = await MyAxios.get("/Color/get-colors");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const DelteColor = createAsyncThunk(
  "profile/DelteColor",
  async (id, { dispatch }) => {
    try {
      await MyAxios.delete(`/Color/delete-color?id=${id}`);
      dispatch(GetColor());
    } catch (error) {
      console.log(error);
    }
  }
);

export const DeleteCategory = createAsyncThunk(
  "profile/DeleteCategory",
  async (id, { dispatch }) => {
    try {
      await MyAxios.delete(`/Category/delete-category?id=${id}`);
      dispatch(GetCategories());
    } catch (error) {
      console.log(error);
    }
  }
);

export const DeleteBrand = createAsyncThunk(
  "profile/DeleteBrand",
  async (id, { dispatch }) => {
    try {
      await MyAxios.delete(`/Brand/delete-brand?id=${id}`);
      dispatch(GetBrand());
    } catch (error) {
      console.log(error);
    }
  }
);

export const DeleteSubCategory = createAsyncThunk(
  "profile/DeleteSubCategory",
  async (id, { dispatch }) => {
    try {
      await MyAxios.delete(`/SubCategory/delete-sub-category?id=${id}`);
      dispatch(GetSubCategories());
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddProducts = createAsyncThunk(
  "profile/AddProducts",
  async (user, { dispatch }) => {
    try {
      await MyAxios.post("/Product/add-product", user, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(GetProduct());
    } catch (error) {
      console.log(user);
      console.log(error);
    }
  }
);

export const AddBrand = createAsyncThunk(
  "profile/AddBrand",
  async (name, { dispatch }) => {
    try {
      await MyAxios.post(`/Brand/add-brand?BrandName=${name}`);
      dispatch(GetBrand());
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddCategory = createAsyncThunk(
  "profile/AddCategory",
  async (user, { dispatch }) => {
    try {
      await MyAxios.post("/Category/add-category", user, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(user);

      dispatch(GetCategories());
    } catch (error) {
      console.log(user);
      console.log(error);
    }
  }
);

export const AddSubCategory = createAsyncThunk(
  "profile/AddSubCategory",
  async ({ CategoryId, SubCategoryName }, { dispatch }) => {
    try {
      await MyAxios.post(
        `/SubCategory/add-sub-category?CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`
      );
      dispatch(GetSubCategories());
      dispatch(GetCategories());
    } catch (error) {
      console.log(error);
    }
  }
);

export const EditProducts = createAsyncThunk(
  "profile/EditProducts",
  async (
    {
      Id,
      BrandId,
      ColorId,
      ProductName,
      Description,
      Quantity,
      Code,
      Price,
      HasDiscount,
      DiscountPrice,
      SubCategoryId,
    },
    { dispatch }
  ) => {
    try {
      await MyAxios.put(
        `/Product/update-product?Id=${Id}&BrandId=${BrandId}&ColorId=${BrandId}ProductName=${ProductName}&Description=${Description}&Quantity=${Quantity}&Code=${Code}&Price=${Price}&HasDiscount=${HasDiscount}&DiscountPrice=${DiscountPrice}&SubCategoryId=${SubCategoryId}`
      );
      dispatch(GetProduct());
    } catch (error) {
      console.log(error);
    }
  }
);

export const EditBrand = createAsyncThunk(
  "profile/EditBrand",
  async ({ id, name }, { dispatch }) => {
    try {
      await MyAxios.put(`/Brand/update-brand?Id=${id}&BrandName=${name}`);
      dispatch(GetBrand());
    } catch (error) {
      console.log(error);
    }
  }
);

export const EditSubCategory = createAsyncThunk(
  "profile/EditSubCategory",
  async ({ Id, CategoryId, SubCategoryName }, { dispatch }) => {
    try {
      await MyAxios.put(
        `/SubCategory/update-sub-category?Id=${Id}&CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`
      );
      dispatch(GetSubCategories());
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddColor = createAsyncThunk(
  "profile/AddColor",
  async (name, { dispatch }) => {
    try {
      await MyAxios.post(`/Color/add-color?ColorName=${name}`);
      dispatch(GetColor());
    } catch (error) {
      console.log(error);
    }
  }
);

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetProduct.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(GetProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetUserProfiles.fulfilled, (state, { payload }) => {
      state.dataProfiles = payload;
      state.isLoading = false;
    });
    builder.addCase(GetCategories.fulfilled, (state, { payload }) => {
      state.cat = payload;
      state.isLoading = false;
    });
    builder.addCase(GetSubCategories.fulfilled, (state, { payload }) => {
      state.subCat = payload;
      state.isLoading = false;
    });
    builder.addCase(GetBrand.fulfilled, (state, { payload }) => {
      state.brand = payload;
      state.isLoading = false;
    });
    builder.addCase(GetColor.fulfilled, (state, { payload }) => {
      state.color = payload;
      state.isLoading = false;
    });
  },
});

export default ProfileSlice.reducer;
