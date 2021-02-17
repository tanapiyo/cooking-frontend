import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import styles from "./Core.module.css";

import {
  selectOpenNewDiary,
  resetOpenNewDiary,
  fetchDiaryStart,
  fetchDiaryEnd,
  fetchAsyncNewDiary,
} from "../diary/diarySlice";

import { Button, TextField } from "@material-ui/core";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 220,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};

const NewDiary: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openNewDiary = useSelector(selectOpenNewDiary);

  const [foodName, setfoodName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [memo, setMemo] = useState("");


  const NewDiary = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { foodName: foodName, date: date, memo: memo };
    await dispatch(fetchDiaryStart());
    await dispatch(fetchAsyncNewDiary(packet));
    await dispatch(fetchDiaryEnd());
    setfoodName("");
    setDate(null);
    setMemo("");
    dispatch(resetOpenNewDiary());
  };

  return (
    <>
      <Modal
        isOpen={openNewDiary}
        onRequestClose={async () => {
          await dispatch(resetOpenNewDiary());
        }}
        style={customStyles}
      >
        <form className={styles.core_signUp}>
          <h1 className={styles.core_title}>SNS clone</h1>

          <br />
          <TextField
            id="date"
            label="CookingDay"
            type="date"
            defaultValue="2021-01-01"
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
            shrink: true,
            }}
        />
          <TextField
            placeholder="なにを作りましたか"
            type="text"
            onChange={(e) => setfoodName(e.target.value)}
          />
          <TextField
            placeholder="メモ（改善点、疑問点、感想）"
            type="text"
            onChange={(e) => setMemo(e.target.value)}
          />
          <Button
            disabled={!foodName || !memo || !date}
            variant="contained"
            color="primary"
            onClick={NewDiary}
          >
            日記を書く
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewDiary;