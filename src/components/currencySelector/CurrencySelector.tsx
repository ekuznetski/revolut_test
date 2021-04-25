import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes } from "@store";
import { ECurrency } from "@domain";
import { useCurrencySelector } from "@hooks";
import { CurrenciesList } from "./components/CurrenciesList";
import "./currencySelector.scss";

export function CurrencySelector() {
  const dispatch = useDispatch();
  const currencySelector = useCurrencySelector();
  const [inputState, setInputState] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ECurrency[]>(
    Object.values(ECurrency)
  );

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setInputState(value);
    if (value) {
      const filtered = Object.values(ECurrency).filter((cur: ECurrency) =>
        cur.toLowerCase().includes(value)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(Object.values(ECurrency));
    }
  }

  function hideCurrencySelector() {
    dispatch(ActionCreators[EActionTypes.hideCurrencySelector]());
  }

  function clearInput() {
    setInputState("");
    setSearchResults(Object.values(ECurrency));
  }

  return currencySelector.isActive ? (
    <div className="currency-selector-wrapper">
      <div className="currency-selector-input-wrapper">
        <div className="currency-selector-input">
          <input type="text" onChange={onChangeHandler} value={inputState} />
          <button type="button" className="close" onClick={clearInput}>
            X
          </button>
        </div>
        <button type="button" onClick={hideCurrencySelector}>
          Cancel
        </button>
      </div>
      <CurrenciesList results={searchResults} />
    </div>
  ) : null;
}
