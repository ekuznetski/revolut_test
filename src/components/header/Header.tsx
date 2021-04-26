import React from "react";
import { useExchangeType, useRates, useSelectedCurrency } from "@hooks";
import "./header.scss";

export function Header() {
  const selectedCurrency = useSelectedCurrency();
  const rates = useRates();
  const { isSellExchangeType } = useExchangeType();

  return selectedCurrency.quote && selectedCurrency?.base ? (
    <div className="header">
      <div className="title">
        {isSellExchangeType ? "Sell" : "Buy"} {selectedCurrency.base}
      </div>
      {rates[selectedCurrency.base] && (
        <div className="market-order">
          Market order: {selectedCurrency.base} 1 = {selectedCurrency.quote}{" "}
          {rates[selectedCurrency.base][selectedCurrency.quote].toFixed(6)}
        </div>
      )}
    </div>
  ) : null;
}
