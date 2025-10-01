import { MyAxios } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProfileSlice {
  data: never[];
  isLoading: boolean;
}

const initialState: ProfileSlice = {
  data: [],
  isLoading: false,
};

export const GetProduct = createAsyncThunk("profile/GetProduct", async () => {
  try {
    const { data } = await MyAxios.get("/Product/get-products");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

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
  },
});

export default ProfileSlice.reducer;
