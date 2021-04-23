export enum EActionTypes {
  // App
  saveSelectedCurrency = "[APP] Save selected currency",
  saveAmount = "[APP] Save amount",
  submitExchange = "[APP] Submit exchange",
  showCurrencySelector = "[APP] Show currency selector",
  hideCurrencySelector = "[APP] Hide currency selector",
  showNotification = "[APP] Show notification",
  hideNotification = "[APP] Hide notification",

  // Data
  fetchRates = "[DATA] Fetch rates",
  saveRates = "[DATA] Save rates",
  fetchAvailableBalance = "[DATA] Fetch available balance",
  saveAvailableBalance = "[DATA] Save available balance",
}
