import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes, EExchangeType, IAppStore } from "@store";
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
  const { isSellExchangeType, exchangeType } = useExchangeType();
  const pattern = /^\d+([.]?\d){0,2}$/;
  const anotherType =
    type === EAmountInputType.base
      ? EAmountInputType.quote
      : EAmountInputType.base;

  function showCurrencySelector() {
    dispatch(ActionCreators[EActionTypes.showCurrencySelector](type));
  }

  function validate(value: number, selectedCur: ECurrency) {
    const validatable =
      (type === EAmountInputType.quote && exchangeType === EExchangeType.buy) ||
      (type === EAmountInputType.base && exchangeType === EExchangeType.sell);
    const isInvalid = validatable && value >= availableBalance[selectedCur];
    dispatch(
      ActionCreators[
        isInvalid ? EActionTypes.setAmountInvalid : EActionTypes.setAmountValid
      ](type)
    );
  }

  useEffect(() => {
    if (amount[type] && !!selectedCurrency[type]) {
      validate(parseFloat(amount[type]), selectedCurrency[type] as ECurrency);
    }
  }, [exchangeType, amount[type]]);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if ((pattern.test(value) && parseFloat(value) >= 0) || value === "") {
      const selectedCurrTemp = selectedCurrency[type] as ECurrency;
      const selectedCurrPrices = rates[selectedCurrTemp].prices;

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

      dispatch(ActionCreators[EActionTypes.saveAmount](newAmount));
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
    <div
      className={`amount-input-wrapper ${
        isAmountInvalid[type] ? "invalid" : ""
      }`}
    >
      <div className="amount-input-data">
        <button
          type="button"
          className="currency"
          onClick={showCurrencySelector}
        >
          {selectedCurrency[type]}
        </button>
        <div className="balance">
          Balance:{" "}
          {(availableBalance[selectedCurrency[type] as ECurrency]
            ? availableBalance[selectedCurrency[type] as ECurrency]
            : 0
          ).toFixed(2)}
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
          placeholder="0"
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
      <span className="error">exceeds balance</span>
    </div>
  );
}
