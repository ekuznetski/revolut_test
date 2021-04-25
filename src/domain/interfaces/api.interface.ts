import { ECurrency } from "@domain";

export interface IFetchRatesRequest {
  base: ECurrency;
  symbols: ECurrency[];
}

export interface ISubmitRequest {
  amountBase: string;
  amountQuote: string;
  currencyBase: ECurrency;
  currencyQuote: ECurrency;
}
