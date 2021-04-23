import React from "react";
import { useExchangeType, useRates, useSelectedCurrency } from "@hooks";

export function Header() {
  const selectedCurrency = useSelectedCurrency();
  const rates = useRates();
  const { isSellExchangeType } = useExchangeType();

  return selectedCurrency.quote && selectedCurrency?.base ? (
    <div>
      <div>
        {isSellExchangeType ? "Sell" : "Buy"} {selectedCurrency.base}
      </div>
      {rates[selectedCurrency.base] && (
        <div>
          Market order: {selectedCurrency.base} 1 = {selectedCurrency.quote}{" "}
          {rates[selectedCurrency.base].prices[selectedCurrency.quote].toFixed(
            2
          )}
        </div>
      )}
    </div>
  ) : null;
}
