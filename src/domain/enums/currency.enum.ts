export enum ECurrency {
  eur = "EUR",
  gbp = "GBP",
  usd = "USD",
  jpy = "JPY",
  czk = "CZK",
}

export const ECurrencyName = {
  [ECurrency.eur]: "Euro",
  [ECurrency.gbp]: "British Pound",
  [ECurrency.usd]: "US Dollar",
  [ECurrency.jpy]: "Japanese Yen",
  [ECurrency.czk]: "Czech Koruna",
};

export const ECurrencySymbol = {
  [ECurrency.eur]: "€",
  [ECurrency.gbp]: "£",
  [ECurrency.usd]: "$",
  [ECurrency.jpy]: "¥",
  [ECurrency.czk]: "Kč",
};
