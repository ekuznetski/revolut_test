import {
  IFetchRatesRequest,
  INotificationState,
  ISubmitRequest,
} from "@domain";
import { EAmountInputType } from "@components";
import { EActionTypes } from "./store.enum";
import {
  IAction,
  IAppStore,
  IDataStore,
  ISelectedCurrency,
} from "./store.interface";

export const ActionCreators = {
  [EActionTypes.showCurrencySelector](
    payload: EAmountInputType
  ): IAction<EAmountInputType> {
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
    payload: Omit<INotificationState, "isVisible">
  ): IAction<Omit<INotificationState, "isVisible">> {
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

  [EActionTypes.setAmountInvalid](
    payload: EAmountInputType
  ): IAction<EAmountInputType> {
    return {
      type: EActionTypes.setAmountInvalid,
      payload,
    };
  },

  [EActionTypes.setAmountValid](
    payload: EAmountInputType
  ): IAction<EAmountInputType> {
    return {
      type: EActionTypes.setAmountValid,
      payload,
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

  [EActionTypes.saveAmount](
    payload: IAppStore["amount"]
  ): IAction<IAppStore["amount"]> {
    return {
      type: EActionTypes.saveAmount,
      payload,
    };
  },

  [EActionTypes.submitExchange](
    payload: ISubmitRequest
  ): IAction<ISubmitRequest> {
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

  [EActionTypes.changeExchangeDirection](): IAction {
    return {
      type: EActionTypes.changeExchangeDirection,
    };
  },
};
