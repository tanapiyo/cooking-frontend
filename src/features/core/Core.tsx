import React, { useEffect } from "react";
import Auth from "../auth/Auth";

import styles from "./Core.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

// import { withStyles } from "@material-ui/core/styles";
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
  selectRecipes,
  fetchAsyncGetRecipe,
} from "../recipe/recipeSlice";



//material-uiのavartarからコピー（アイコンの右下にログインしていると緑色）

////////////////////////////
const Core: React.FC = () => {
  //reduxのstoreからよぶ
  const dispatch: AppDispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
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
        await dispatch(fetchAsyncGetRecipe());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
    <Auth />
    <div className={styles.core_header}>
      <h1 className={styles.core_title}>献立つくるよ</h1>
      {/* profile?.nickName ? (//nicknameあるときはカメラアイコンとlogout、アバターアイコン <>*/}
      {/* <> */}
      <div className={styles.core_logout}>
          {(isLoadingAuth) && <CircularProgress />}
          <Button
          onClick={() => {
              localStorage.removeItem("localJWT");
              dispatch(setOpenSignIn());
          }}
          >
          Logout
          </Button>
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
              {posts//reduxからもってきたpost一覧
                .slice(0)
                .reverse()
                .map((post) => (
                  <Grid key={post.id} item xs={12} md={4}>
                    <Post
                      postId={post.id}
                      title={post.title}
                      loginId={profile.userProfile}
                      userPost={post.userPost}
                      imageUrl={post.img}
                      liked={post.liked}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>

        {/* </> */}
      {/* )} */}
    </div>
  );
};

export default Core;