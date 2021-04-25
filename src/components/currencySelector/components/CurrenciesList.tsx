import React from "react";
import { ECurrency } from "@domain";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes } from "@store";
import { useCurrencySelector, useSelectedCurrency } from "@hooks";
import { EAmountInputType } from "@components";
import "./currenciesList.scss";

export function CurrenciesList({ results }: { results: ECurrency[] }) {
  const dispatch = useDispatch();
  const currencySelector = useCurrencySelector();
  const selectedCurrency = useSelectedCurrency();

  function selectCurrency(currency: ECurrency) {
    const anotherInputType =
      currencySelector.relatedInputType === EAmountInputType.base
        ? EAmountInputType.quote
        : EAmountInputType.base;
    if (selectedCurrency[anotherInputType] === currency) {
      dispatch(
        ActionCreators[EActionTypes.saveSelectedCurrency]({
          [anotherInputType]: Object.values(ECurrency).find(
            (e) => e !== currency
          ),
        })
      );
      dispatch(
        ActionCreators[EActionTypes.saveSelectedCurrency]({
          [currencySelector.relatedInputType as string]: currency,
        })
      );
      console.log(111);
    } else {
      dispatch(
        ActionCreators[EActionTypes.saveSelectedCurrency]({
          [currencySelector.relatedInputType as string]: currency,
        })
      );
      console.log(222);
    }

    dispatch(ActionCreators[EActionTypes.hideCurrencySelector]());
  }

  return (
    <ul className="currencies-list">
      {results.map((e: ECurrency) => (
        <li key={e} className="results-element">
          <button type="button" onClick={() => selectCurrency(e)}>
            {e}
          </button>
        </li>
      ))}
    </ul>
  );
}
