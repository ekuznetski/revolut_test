import React from "react";
import { mockStore, render } from "@utils";
import { AmountInput, EAmountInputType } from "@components";
import { ECurrency } from "@domain";
import { fireEvent } from "@testing-library/react";

const selectedCurrency = mockStore.app?.selectedCurrency;
const availableBalance = mockStore.data?.availableBalance;
const rates = mockStore.data?.rates;
const type = EAmountInputType.base;

let amountInput: ReturnType<typeof render>;
beforeEach(() => {
  amountInput = render(<AmountInput type={type} />, {
    initialState: mockStore,
  });
});

describe("AmountInput render test", () => {
  if (selectedCurrency && availableBalance) {
    it("should render currency in the input", () => {
      expect(
        amountInput.getByLabelText("open-currency-selector").textContent
      ).toEqual(selectedCurrency[type]);
    });

    it("should render available balance", () => {
      const balance = availableBalance[selectedCurrency[type] as ECurrency];
      expect(
        amountInput.getByLabelText("available-balance").textContent
      ).toContain(balance);
    });
  }
});

describe("AmountInput validation and calculation test", () => {
  if (selectedCurrency && availableBalance) {
    beforeEach(() => {
      let value = availableBalance[selectedCurrency[type] as ECurrency];
      if (value) value += 100;
      const input = amountInput.getByLabelText(`amount-${type}-input`, {
        selector: "input",
      });
      fireEvent.change(input, { target: { value } });
    });

    it("should render error if amount bigger than balance", () => {
      expect(amountInput.getByText(/exceeds balance/i)).toBeInTheDocument();
    });

    it("should set in store isAmountInvalid to true", () => {
      expect(mockStore.app?.isAmountInvalid).toBeTruthy();
    });

    it("should correct calculate quote amount", () => {
      const value = amountInput
        .getByLabelText(`amount-${type}-input`, {
          selector: "input",
        })
        .getAttribute("value");
      expect(mockStore.app?.amount?.quote).toEqual(
        // @ts-ignore
        (value * rates[selectedCurrency.base][selectedCurrency.quote]).toFixed(
          2
        )
      );
    });
  }
});
