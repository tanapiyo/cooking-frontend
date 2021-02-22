import React, { useEffect } from "react";
import Auth from "../auth/Auth";

import styles from "./Core.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import { withStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

import {
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";


import {
  selectIsLoadingAuth,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
} from "../auth/authSlice";


import {
    selectDiarys,
    selectIsLoadingDiary,
    setOpenNewDiary,
    resetOpenNewDiary,
    fetchAsyncGetDiarys,
  } from "../diary/diarySlice";

import Diary from "../diary/Diary";
import NewDiary from "./NewDiary";

//material-uiのavartarからコピー（アイコンの右下にログインしていると緑色）

////////////////////////////
const DiaryCore: React.FC = () => {
  //reduxのstoreからよぶ
  const dispatch: AppDispatch = useDispatch();
  const diaries = useSelector(selectDiarys)
  const isLoadingAuth = useSelector(selectIsLoadingAuth);

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        dispatch(resetOpenSignIn());
        //あとで実装
        //const result = await dispatch(fetchAsyncGetMyProf());
        // if (fetchAsyncGetMyProf.rejected.match(result)) {
        //   dispatch(setOpenSignIn());//もしlocalJWT取れなかったらログインモーダル出す
        //   return null;
        // }
        //表示するものを全部取得
        await dispatch(fetchAsyncGetDiarys());
      }
    };
    fetchBootLoader();
  }, [dispatch]);


  return (
    <div>
      <Auth />
      <NewDiary />
      <div className={styles.core_header}>
        <h1 className={styles.core_title}>献立つくるよ</h1>
        {/* profile?.nickName ? (//nicknameあるときはカメラアイコンとlogout、アバターアイコン <>*/}
        {/* <> */}
        <div className={styles.core_logout}>
            {(isLoadingAuth) && <CircularProgress />}
            <Button
            className={styles.core_btnModal}
            onClick={() => {
              dispatch(setOpenNewDiary());
            }}
            >
            日記を書く
            </Button>
            <Button
            onClick={() => {
                localStorage.removeItem("localJWT");
                dispatch(resetOpenNewDiary());
                dispatch(setOpenSignIn());
            }}
            >
            Logout
            </Button>
              {/* <button
                className={styles.core_btnModal}
                onClick={() => {
                  dispatch(resetOpenNewDiary());
                }}
              >
              日記を書く
              </button> */}
        </div>
          {/* </> */}
        {/* ) : (//nicknameないときはsignup/login */}
          {/* <div>
            <Button
              onClick={() => {
                dispatch(setOpenSignIn());
                dispatch(resetOpenSignUp());
              }}
            >
              LogIn
            </Button>
            <Button
              onClick={() => {
                dispatch(setOpenSignUp());
                dispatch(resetOpenSignIn());
              }}
            >
              SignUp
            </Button>
          </div>
            )} */}
      </div> 

      {/* {profile?.nickName && (//ログインしていたらpost一覧を表示する（新しい順） */}
        {/* <> */}
          <div className={styles.core_posts}>
            <Grid container spacing={4}>
              {diaries//reduxからもってきたpost一覧
                //.slice(0).reverse()
                .map((diary) => (
                  <Grid key={diary.foodName} item xs={12}>
                    <Diary
                    //diary={diary}
                      foodName={diary.foodName}
                      date={diary.date.toString()}
                      memo={diary.memo}
                      userDiary={diary.userDiary}
                    />
                  </Grid>
                ))}
            </Grid>
            <Grid container xs={12} style={{ margin: 20 }} >
                <Link to="/">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        献立を作る
                    </Button>
                </Link>
            </Grid>
          </div>
        {/* </> */}
      {/* )} */}
    </div>
 );
};

export default DiaryCore;