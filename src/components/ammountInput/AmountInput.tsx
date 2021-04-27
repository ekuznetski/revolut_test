import React from "react";
import "./amountInput.scss";

export enum EAmountInputType {
  base = "base",
  quote = "quote",
}

export function AmountInput({ name }: { name: EAmountInputType }) {
  function openCurrencyInput() {
    console.log("openCurrencyInput");
  }
  return (
    <div className="amount-input-wrapper">
      <div
        className="amount-input-data"
        role="button"
        onClick={openCurrencyInput}
      >
        <div>EUR</div>
        <div>balance</div>
      </div>
      <div className="amount-input-wrapper">
        <input name={name} />
      </div>
    </div>
  );
}
