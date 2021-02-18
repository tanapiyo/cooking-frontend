import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_NEWRECIPE } from "../types";

const apiUrlRecipe = `${process.env.REACT_APP_DEV_API_URL}api/recipe/`;


//recipe一覧取得
export const fetchAsyncGetRecipe = createAsyncThunk("post/get", async () => {
  const res = await axios.get(apiUrlRecipe, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

//newrecipeの投稿
export const fetchAsyncNewRecipe = createAsyncThunk(
  "post/post",
  async (newRecipe: PROPS_NEWRECIPE) => {
    const res = await axios.post(apiUrlRecipe, newRecipe, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);
export const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    //isLoadingRecipe = false,
    recipes: [
      {
        id: 0,
        foodName: "",
        vegetables: [0],
        main: 0,
        recipeKind: 0,
        memo: "",
        ajitsuke: "",
        cookingTime: 0,
        onomatopoeia: "",
      },
    ],
  },
  reducers: {
    // fetchRecipeStart(state) {
    //   state.isLoadingRecipe = true;
    // },
    // fetchRecipeEnd(state) {
    //   state.isLoadingRecipe = false;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetRecipe.fulfilled, (state, action) => {
      return {
        ...state,
        recipes: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewRecipe.fulfilled, (state, action) => {
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    });
  },
});

// export const {
//   reducerをここに
// } = postSlice.actions;

export const selectRecipes = (state: RootState) => state.recipe.recipes;

export default recipeSlice.reducer;