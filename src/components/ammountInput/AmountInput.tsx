import React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes, IAppStore } from "@store";
import { ECurrency, ECurrencySymbol } from "@domain";
import {
  useAmount,
  useAvailableBalance,
  useExchangeType,
  useIsAmountInvalid,
  useRates,
  useSelectedCurrency,
} from "@hooks";
import "./amountInput.scss";

export enum EAmountInputType {
  base = "base",
  quote = "quote",
}

export function AmountInput({ type }: { type: EAmountInputType }) {
  const dispatch = useDispatch();
  const availableBalance = useAvailableBalance();
  const selectedCurrency = useSelectedCurrency();
  const isAmountInvalid = useIsAmountInvalid();
  const amount = useAmount();
  const rates = useRates();
  const { isSellExchangeType } = useExchangeType();
  const pattern = /^\d+([.]?\d){0,2}$/;
  const anotherType =
    type === EAmountInputType.base
      ? EAmountInputType.quote
      : EAmountInputType.base;

  function openCurrencyInput() {
    dispatch(ActionCreators[EActionTypes.showCurrencySelector]());
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if ((pattern.test(value) && parseFloat(value) >= 0) || value === "") {
      const selectedCur = selectedCurrency[type] as ECurrency;
      const selectedCurrPrices = rates[selectedCur].prices;

      const anotherSelectedCurrency = selectedCurrency[
        anotherType
      ] as ECurrency;

      const thisAmount = value;
      const anotherAmount =
        Number(value) * selectedCurrPrices[anotherSelectedCurrency];

      const newAmount = {
        [type]: thisAmount,
        [anotherType]: anotherAmount ? anotherAmount.toFixed(2) : "",
      } as IAppStore["amount"];

      const isInvalid = parseFloat(value) >= availableBalance[selectedCur];

      dispatch(ActionCreators[EActionTypes.saveAmount](newAmount));
      dispatch(
        ActionCreators[
          isInvalid
            ? EActionTypes.setAmountInvalid
            : EActionTypes.setAmountValid
        ]()
      );
    }
  }

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    return ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  }

  function onBlurHandler() {
    dispatch(
      ActionCreators[EActionTypes.saveAmount]({
        [EAmountInputType.base]:
          amount[EAmountInputType.base] &&
          Number(amount[EAmountInputType.base]).toFixed(2),
        [EAmountInputType.quote]:
          amount[EAmountInputType.quote] &&
          Number(amount[EAmountInputType.quote]).toFixed(2),
      })
    );
  }

  let sign;

  if (type === EAmountInputType.base) {
    sign = isSellExchangeType ? "-" : "+";
  } else {
    sign = isSellExchangeType ? "+" : "-";
  }

  return (
    <div className={`amount-input-wrapper ${isAmountInvalid ? "invalid" : ""}`}>
      <div
        className="amount-input-data"
        role="button"
        onClick={openCurrencyInput}
      >
        <div className="currency">{selectedCurrency[type]}</div>
        <div className="balance">
          Balance:{" "}
          {availableBalance[selectedCurrency[type] as ECurrency].toFixed(2)}
        </div>
      </div>
      <div className="input-wrapper">
        {amount[EAmountInputType.base] && amount[EAmountInputType.quote] && (
          <div>
            {sign}
            {ECurrencySymbol[selectedCurrency[type] as ECurrency]}
          </div>
        )}
        <input
          name={type}
          inputMode="numeric"
          pattern={pattern.toString()}
          type="number"
          value={amount[type] ?? ""}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
      </div>
    </div>
  );
}
