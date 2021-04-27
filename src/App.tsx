import React from "react";
import { hot } from "react-hot-loader/root";
import {
  AmountInput,
  ChangeDirectionButton,
  Header,
  SubmitButton,
  EAmountInputType,
} from "@components";

import "./styles.scss";

function App() {
  return (
    <div>
      <Header />
      <AmountInput name={EAmountInputType.base} />
      <ChangeDirectionButton />
      <AmountInput name={EAmountInputType.quote} />
      <SubmitButton />
    </div>
  );
}

export default hot(App);
