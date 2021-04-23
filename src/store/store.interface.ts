import { AnyFunction, INotificationState, ECurrency } from "@domain";
import { EActionTypes } from "./store.enum";

export interface ISelectedCurrency {
  base?: ECurrency;
  quote?: ECurrency;
}

export interface IDataStore {
  availableBalance: { [k in ECurrency]: number };
  rates: any;
}

export interface IAppStore {
  isCurrencySelectorActive: boolean;
  amount: number;
  selectedCurrency: ISelectedCurrency;
  notification: INotificationState;
}

export interface IStore {
  data: IDataStore;
  app: IAppStore;
}

export interface IAction<T = { [k: string]: any }> {
  type: EActionTypes;
  payload?: T;
  onSuccess?: AnyFunction;
  onFailure?: AnyFunction;
}
