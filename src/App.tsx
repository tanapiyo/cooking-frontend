import React from "react";

import styles from "./App.module.css";
import Core from "./features/core/Core";
import DiaryCore from "./features/core/DicaryCore";

import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Route path="/" exact component={Core} />
        <Route path="/diary" exact component={DiaryCore} />
      </div>
    </BrowserRouter>
  );
}

export default App;