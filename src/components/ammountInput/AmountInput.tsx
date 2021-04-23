import React from "react";
import "./amountInput.scss";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes } from "@store";
import { ECurrency } from "@domain";
import { useAvailableBalance, useSelectedCurrency } from "@hooks";

export enum EAmountInputType {
  base = "base",
  quote = "quote",
}

export function AmountInput({ type }: { type: EAmountInputType }) {
  const dispatch = useDispatch();
  const availableBalance = useAvailableBalance();
  const selectedCurrency = useSelectedCurrency();
  function openCurrencyInput() {
    dispatch(ActionCreators[EActionTypes.showCurrencySelector]());
  }
  return (
    <div className="amount-input-wrapper">
      <div
        className="amount-input-data"
        role="button"
        onClick={openCurrencyInput}
      >
        <div>{selectedCurrency[type]}</div>
        <div>
          Balance: {availableBalance[selectedCurrency[type] as ECurrency]}
        </div>
      </div>
      <input name={type} />
    </div>
  );
}
