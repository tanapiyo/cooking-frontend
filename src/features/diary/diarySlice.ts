import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_NEWDIARY } from "../types";

const apiUrlDiary = `${process.env.REACT_APP_DEV_API_URL}api/diary/`;

//日記一覧
export const fetchAsyncGetDiarys = createAsyncThunk("post/get", async () => {
  const res = await axios.get(apiUrlDiary, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

//日記新規作成
export const fetchAsyncNewDiary = createAsyncThunk(
  "post/post",
  async (newPost: PROPS_NEWDIARY) => {
    const res = await axios.post(apiUrlDiary, newPost, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);


export const diarySlice = createSlice({
  name: "diary",
  initialState: {
    isLoadingDiary: false,
    openNewDiary: false,
    diaries: [
      {
        foodName: "",
        userDiary: 0,
        date: "",
        memo: "",
      },
    ],
  },
  reducers: {
    fetchDiaryStart(state) {
      state.isLoadingDiary = true;
    },
    fetchDiaryEnd(state) {
      state.isLoadingDiary = false;
    },
    setOpenNewDiary(state) {
      state.openNewDiary = true;
    },
    resetOpenNewDiary(state) {
      state.openNewDiary = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDiarys.fulfilled, (state, action) => {
      return {
        ...state,
        diaries: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewDiary.fulfilled, (state, action) => {
      return {
        ...state,
        diaries: [...state.diaries, action.payload],
      };
    });
  },
});

export const {
  fetchDiaryStart,
  fetchDiaryEnd,
  setOpenNewDiary,
  resetOpenNewDiary,
} = diarySlice.actions;

export const selectIsLoadingDiary = (state: RootState) =>
  state.diary.isLoadingDiary;
export const selectOpenNewDiary = (state: RootState) => state.diary.openNewDiary;
export const selectDiarys = (state: RootState) => state.diary.diaries;

export default diarySlice.reducer;