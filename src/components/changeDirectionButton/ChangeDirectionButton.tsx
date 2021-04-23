import React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes } from "@store";
import { useExchangeType } from "@hooks";
import "./changeDirectionButton.scss";

export function ChangeDirectionButton() {
  const dispatch = useDispatch();
  const { isSellExchangeType } = useExchangeType();

  function changeDirection() {
    dispatch(ActionCreators[EActionTypes.changeExchangeDirection]());
  }
  return (
    <div
      onClick={changeDirection}
      role="button"
      className={`change-direction-button ${
        isSellExchangeType ? "sell" : "buy"
      }`}
    >
      ↓
    </div>
  );
}
