import React, { useState } from "react";
import styles from "./Post.module.css";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { PROPS_DIARY } from "../types";
import { selectDiarys } from "./diarySlice";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const Diary: React.FC<PROPS_DIARY> = ({
foodName,
userDiary,
date,
memo,
}) => {

  //フィルタリングしたかったけど残念ながらuserid管理してなかった
//   const diary = diaries.filter((diary) => {
//     return diary.userDiary === current.user;
//   });

  if (foodName) {//レシピ名があるときは描画、なければnull
    return (
      <div className={styles.diary}>
        <div className={styles.diary_time}>
          <h4>{date}</h4>
        </div>
        <div className={styles.diary_foodname}>
          <h4>{foodName}</h4>
        </div>
        <div className={styles.diary_memo}>
          <h4>{memo}</h4>
        </div>
      </div>
    );
  };
  return null;
};

export default Diary;
