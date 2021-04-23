import React from "react";
import { useExchangeType, useSelectedCurrency } from "@hooks";

export function SubmitButton() {
  const selectedCurrency = useSelectedCurrency();
  const { isSellExchangeType } = useExchangeType();
  return (
    <button type="submit">
      {isSellExchangeType ? "Sell" : "Buy"} {selectedCurrency.base}{" "}
      {isSellExchangeType ? "for" : "with"} {selectedCurrency.quote}
    </button>
  );
}
