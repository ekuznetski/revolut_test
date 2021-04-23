import { ECurrency } from "@domain";

export interface IFetchRatesRequest {
  base: ECurrency;
  symbols: ECurrency[];
}
