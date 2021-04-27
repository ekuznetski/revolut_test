import { initStore, IRates } from "@store";
import { ECurrency } from "@domain";

export const initCurrencies = {
  selectedCurrency: {
    base: ECurrency.usd,
    quote: ECurrency.gbp,
  },
};

export const initAvailableBalance = {
  availableBalance: {
    GBP: 20,
    USD: 50,
    EUR: 100,
    JPY: 0,
    CZK: 0,
  },
};
export const initRates = {
  rates: {
    EUR: {
      GBP: 0.86905,
      CZK: 25.847,
      JPY: 129.98,
      USD: 1.2066,
    },
    JPY: {
      EUR: 0.0076934913,
      USD: 0.0092829666,
      CZK: 0.1988536698,
      GBP: 0.0066860286,
    },
    GBP: {
      EUR: 1.150681779,
      CZK: 29.7416719406,
      JPY: 149.5656176284,
      USD: 1.3884126345,
    },
    CZK: {
      EUR: 0.0386892096,
      USD: 0.0466824003,
      JPY: 5.0288234611,
      GBP: 0.0336228576,
    },
    USD: {
      EUR: 0.8287750704,
      CZK: 21.4213492458,
      JPY: 107.7241836566,
      GBP: 0.720246975,
    },
  },
};

Object.assign(initStore.app, initCurrencies);
Object.assign(initStore.data, initAvailableBalance, initRates);

export const mockStore = initStore;
