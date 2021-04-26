import React from "react";
import { ECurrency, ECurrencyName } from "@domain";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes } from "@store";
import {
  useAvailableBalance,
  useCurrencySelector,
  useSelectedCurrency,
} from "@hooks";
import { EAmountInputType } from "@components";
import "./currenciesList.scss";

export function CurrenciesList({
  results,
  clearInput,
}: {
  results: ECurrency[];
  clearInput: () => void;
}) {
  const dispatch = useDispatch();
  const currencySelector = useCurrencySelector();
  const selectedCurrency = useSelectedCurrency();
  const availableBalance = useAvailableBalance();

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
    } else {
      dispatch(
        ActionCreators[EActionTypes.saveSelectedCurrency]({
          [currencySelector.relatedInputType as string]: currency,
        })
      );
    }

    dispatch(ActionCreators[EActionTypes.hideCurrencySelector]());
    clearInput();
  }

  return (
    <ul className="currencies-list">
      {results.map((e: ECurrency) => (
        <li key={e} className="results-element">
          <button type="button" onClick={() => selectCurrency(e)}>
            <div>
              <span className="currency">{e}</span>
              {availableBalance[e] !== 0 && (
                <span className="balance">
                  {" "}
                  - {availableBalance[e].toFixed(2)}
                </span>
              )}
              <div className="currency-name">{ECurrencyName[e]}</div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
