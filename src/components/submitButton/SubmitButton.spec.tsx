import React from "react";
import { initCurrencies, mockStore, render } from "@utils";
import { SubmitButton } from "@components";
import { EExchangeType } from "@store";
import { cleanup, fireEvent } from "@testing-library/react";

const selectedCurrency = mockStore.app?.selectedCurrency;
const availableBalance = mockStore.data?.availableBalance;
const rates = mockStore.data?.rates;

let submitButton: ReturnType<typeof render>;
beforeEach(() => {
  submitButton = render(<SubmitButton />, {
    initialState: mockStore,
  });
});

describe("SubmitButton render test", () => {
  it("should have sell word if exchange type is sell", () => {
    expect(submitButton.getByText(/sell/i)).toBeInTheDocument();
  });

  it("should have buy word if exchange type is sell", () => {
    cleanup();
    Object.assign(mockStore.app, {
      exchangeType: EExchangeType.buy,
    });
    submitButton = render(<SubmitButton />, {
      initialState: mockStore,
    });
    expect(submitButton.getByText(/buy/i)).toBeInTheDocument();
  });

  it("should have currencies", () => {
    const { base, quote } = initCurrencies.selectedCurrency;
    expect(
      submitButton.getByText(new RegExp(base.toLowerCase(), "i"))
    ).toBeInTheDocument();
    expect(
      submitButton.getByText(new RegExp(quote.toLowerCase(), "i"))
    ).toBeInTheDocument();
  });
});

