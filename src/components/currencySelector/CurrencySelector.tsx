import React from "react";
import { useSelector } from "react-redux";
import { IAppStore, IStore } from "@store";

export function CurrencySelector() {
  const { isCurrencySelectorActive } = useSelector<
    IStore,
    {
      isCurrencySelectorActive: IAppStore["isCurrencySelectorActive"];
    }
  >((state) => ({
    isCurrencySelectorActive: state.app.isCurrencySelectorActive,
  }));

  return isCurrencySelectorActive ? (
    <div>
      <input />
    </div>
  ) : null;
}
