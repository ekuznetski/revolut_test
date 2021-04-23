import { IFetchRatesRequest, INotificationState } from "@domain";
import { EActionTypes } from "./store.enum";
import { IAction, IDataStore, ISelectedCurrency } from "./store.interface";

export const ActionCreators = {
  [EActionTypes.showCurrencySelector](payload: any): IAction {
    // TODO types
    return {
      type: EActionTypes.showCurrencySelector,
      payload,
    };
  },

  [EActionTypes.hideCurrencySelector](): IAction {
    return {
      type: EActionTypes.hideCurrencySelector,
    };
  },

  [EActionTypes.showNotification](
    payload: Omit<INotificationState, "visible">
  ): IAction<Omit<INotificationState, "visible">> {
    return {
      type: EActionTypes.showNotification,
      payload,
    };
  },

  [EActionTypes.hideNotification](): IAction {
    return {
      type: EActionTypes.hideNotification,
    };
  },

  [EActionTypes.saveSelectedCurrency](
    payload: ISelectedCurrency
  ): IAction<ISelectedCurrency> {
    return {
      type: EActionTypes.saveSelectedCurrency,
      payload,
    };
  },

  [EActionTypes.saveAmount](payload: any): IAction {
    // TODO types
    return {
      type: EActionTypes.saveAmount,
      payload,
    };
  },

  [EActionTypes.submitExchange](payload: any): IAction {
    // TODO types
    return {
      type: EActionTypes.submitExchange,
      payload,
    };
  },

  [EActionTypes.fetchRates](
    payload: IFetchRatesRequest
  ): IAction<IFetchRatesRequest> {
    return {
      type: EActionTypes.fetchRates,
      payload,
    };
  },

  [EActionTypes.saveRates](
    payload: IDataStore["rates"]
  ): IAction<IDataStore["rates"]> {
    return {
      type: EActionTypes.saveRates,
      payload,
    };
  },

  [EActionTypes.fetchAvailableBalance](): IAction {
    return {
      type: EActionTypes.fetchAvailableBalance,
    };
  },

  [EActionTypes.saveAvailableBalance](
    payload: IDataStore["availableBalance"]
  ): IAction<IDataStore["availableBalance"]> {
    return {
      type: EActionTypes.saveAvailableBalance,
      payload,
    };
  },
};