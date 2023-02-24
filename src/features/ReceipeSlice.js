import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCategories, getMeals, searchByName, getUniqueMeal } from "./ReceipeService";

const initialState = {
  meals: {},
  filteredMeals: "",
  categories: {},
  singleMeal: "",
  status: "",
  error: false
};

export const getMealCategories = createAsyncThunk(
  "receipe/getMealCategories",
  async (_, thunkApi) => {
    try {
      return await getCategories();
    } catch (error) {
      const errorMessage = error?.response?.data?.errorMsg;

      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const getNewMeals = createAsyncThunk("receipe/getNewMeal", async (data, thunkApi) => {
  try {
    return await getMeals(data);
  } catch (error) {
    const errorMessage = error?.response?.data?.errorMsg;

    return thunkApi.rejectWithValue(errorMessage);
  }
});

export const searchMealByName = createAsyncThunk(
  "receipe/searchMealByName",
  async (data, thunkApi) => {
    try {
      return await searchByName(data);
    } catch (error) {
      const errorMessage = error?.response?.data?.errorMsg;

      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const searchSingleMeal = createAsyncThunk(
  "receipe/searchSingleMeal",
  async (data, thunkApi) => {
    try {
      return await getUniqueMeal(data);
    } catch (error) {
      const errorMessage = error?.response?.data?.errorMsg;

      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

const receipeSlice = createSlice({
  name: "receipe",
  initialState,
  reducers: {
    resetFilteredMeals: (state) => {
      state.filteredMeals = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMealCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMealCategories.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.categories = payload;
      })
      .addCase(getMealCategories.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getNewMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewMeals.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.meals = payload;
      })
      .addCase(getNewMeals.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(searchMealByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMealByName.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.filteredMeals = payload;
      })
      .addCase(searchMealByName.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(searchSingleMeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchSingleMeal.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.singleMeal = payload;
      })
      .addCase(searchSingleMeal.rejected, (state) => {
        state.status = "rejected";
      });
  }
});

export const categorySelector = (state) => state.receipe.categories;
export const mealsSelector = (state) => state.receipe.meals;
export const filteredMealsSelector = (state) => state.receipe.filteredMeals;
export const singleMealSelector = (state) => state.receipe.singleMeal;

export const { resetFilteredMeals } = receipeSlice.actions;

export default receipeSlice.reducer;
