import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAmount,
  useExchangeType,
  useIsAmountInvalid,
  useSelectedCurrency,
} from "@hooks";
import { ActionCreators, EActionTypes } from "@store";
import { EAmountInputType } from "@components";
import { ISubmitRequest } from "@domain";
import "./submitButton.scss";

export function SubmitButton() {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const isAmountInvalid = useIsAmountInvalid();
  const selectedCurrency = useSelectedCurrency();
  const {
    [EAmountInputType.base]: amountBase,
    [EAmountInputType.quote]: amountQuote,
  } = useAmount();
  const { isSellExchangeType } = useExchangeType();

  useEffect(() => {
    setIsDisabled(!(!!amountBase && !!amountQuote && !isAmountInvalid));
  }, [amountBase, amountQuote, isAmountInvalid]);

  function onClickHandler(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    let data;
    if (isSellExchangeType) {
      data = {
        amountBase,
        amountQuote, // I added both amounts, because i don't have access to store from api.service. but for real server i'll send only base amount because server should take actually rates
        currencyBase: selectedCurrency.base,
        currencyQuote: selectedCurrency.quote,
      };
    } else {
      data = {
        amountBase: amountQuote,
        amountQuote: amountBase,
        currencyBase: selectedCurrency.quote,
        currencyQuote: selectedCurrency.base,
      };
    }

    const emptyAmount = {
      [EAmountInputType.base]: "",
      [EAmountInputType.quote]: "",
    };

    dispatch(
      ActionCreators[EActionTypes.submitExchange](data as ISubmitRequest)
    );
    dispatch(ActionCreators[EActionTypes.saveAmount](emptyAmount));
  }

  return (
    <button
      className="submit-button"
      type="submit"
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {isSellExchangeType ? "Sell" : "Buy"} {selectedCurrency.base}{" "}
      {isSellExchangeType ? "for" : "with"} {selectedCurrency.quote}
    </button>
  );
}
