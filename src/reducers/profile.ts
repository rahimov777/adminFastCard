import { MyAxios } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProfileSlice {
  data: never[];
  dataProfiles: never[];
  isLoading: boolean;
  cat: never[];
  brand: never[];
  color: never[];
}

const initialState: ProfileSlice = {
  data: [],
  dataProfiles: [],
  isLoading: false,
  cat: [],
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

export const AddProducts = createAsyncThunk(
  "profile/AddProducts",
  async (user) => {
    try {
      const { data } = await MyAxios.post("/Product/add-product", user, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(user);
      
      return data.data;
    } catch (error) {
      console.log(user);
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
