import React, { useEffect, useState } from "react";
import Auth from "../auth/Auth";

import styles from "./Core.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import {Link} from 'react-router-dom';

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

  const [menu, setMenu] = useState<any[]>([])
  const [buyList, setBuyList] = useState<any[]>([])

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

  const makeMenu = () => {
    //recipesの中でmain,sub,soupをfilter
    const sub = recipes.filter((recipe) => {
        return recipe.recipeKind === 0;
      });
    const soup = recipes.filter((recipe) => {
        return recipe.recipeKind === 1;
      });
    const main = recipes.filter((recipe) => {
        return recipe.recipeKind === 2;
      });
    const randIntMain = Math.floor(Math.random() * (main.length));
    const randIntSub = Math.floor(Math.random() * (sub.length));
    const randIntSoup = Math.floor(Math.random() * (soup.length));
    setMenu([main[randIntMain],sub[randIntSub],soup[randIntSoup]])
    const buyList = main[randIntMain].vegetables.concat(
        sub[randIntSub].vegetables, soup[randIntSoup].vegetables,
        main[randIntMain].main, sub[randIntSub].main, soup[randIntSoup].main
    );
    setBuyList(buyList)
  }

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
            <Grid container xs={12} color="warning" style={{ margin: 20 }} >
              <h3>ルール</h3>
              <p>1. 3日ごとに献立を立てる</p>
              <p>2. 一汁二菜</p>
              <p>3. メインは3日間でかぶらないように、野菜はかぶるように</p>
            </Grid>
            <Grid container xs={12}>
                <Button color="primary"
                 onClick={() => {makeMenu()}}>Primary</Button>
            </Grid>
            <Grid container xs={4} color="error" >
              <h3>主菜</h3>
              {menu && menu[0] &&
                <h3>{menu[0].foodName}</h3>
              }
            </Grid>
            <Grid container xs={4} color="success" >
              <h3>副菜</h3>
              {menu && menu[1] &&
                <h3>{menu[1].foodName}</h3>
              }
            </Grid>
            <Grid container xs={4} color="secondary" >
              <h3>汁物</h3>
              {menu && menu[2] &&
                <h3>{menu[2].foodName}</h3>
              }
            </Grid>

            <Grid container xs={12} style={{ margin: 20 }} >
              <h3>買うもの</h3>
              {buyList && 
                // {buyList}
                <p>hi</p>
              }
            </Grid>

            <Grid container xs={12} style={{ margin: 20 }} >
                <Link to="/diary">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                    >
                        日記をかく
                    </Button>
                </Link>
            </Grid>
          </div>

        {/* </> */}
      {/* )} */}
    </div>
  );
};

export default Core;