import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes } from "@store";
import { ECurrency } from "@domain";
import { useAvailableBalance, useSelectedCurrency } from "@hooks";
import "./amountInput.scss";

export enum EAmountInputType {
  base = "base",
  quote = "quote",
}

export function AmountInput({ type }: { type: EAmountInputType }) {
  const dispatch = useDispatch();
  const availableBalance = useAvailableBalance();
  const selectedCurrency = useSelectedCurrency();
  const [state, setState] = useState<string | number>("");
  const pattern = /^\d+([.]?\d){0,2}$/;

  function openCurrencyInput() {
    dispatch(ActionCreators[EActionTypes.showCurrencySelector]());
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (pattern.test(value) || value === "") {
      setState(value);
    }
  }

  function onBlurHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value).toFixed(2);
    setState(value);
    dispatch(ActionCreators[EActionTypes.saveAmount]({ [type]: value }));
  }

  return (
    <div className="amount-input-wrapper">
      <div
        className="amount-input-data"
        role="button"
        onClick={openCurrencyInput}
      >
        <div className="currency">{selectedCurrency[type]}</div>
        <div className="balance">
          Balance: {availableBalance[selectedCurrency[type] as ECurrency]}
        </div>
      </div>
      <input
        name={type}
        min="0"
        inputMode="numeric"
        pattern={pattern.toString()}
        type="number"
        value={state}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
      />
    </div>
  );
}
