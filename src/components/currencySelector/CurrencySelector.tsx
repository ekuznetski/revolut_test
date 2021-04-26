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

  function clearInput() {
    setInputState("");
    setSearchResults(Object.values(ECurrency));
  }

  function hideCurrencySelector() {
    clearInput();
    dispatch(ActionCreators[EActionTypes.hideCurrencySelector]());
  }

  return currencySelector.isActive ? (
    <>
      <div className="overlay" onClick={hideCurrencySelector} />
      <div className="currency-selector-wrapper">
        <div className="currency-selector-input-wrapper">
          <div className="currency-selector-input">
            <input type="text" onChange={onChangeHandler} value={inputState} />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" className="close" onClick={clearInput} />
          </div>
          <button type="button" onClick={hideCurrencySelector}>
            Cancel
          </button>
        </div>
        <CurrenciesList clearInput={clearInput} results={searchResults} />
      </div>
    </>
  ) : null;
}
