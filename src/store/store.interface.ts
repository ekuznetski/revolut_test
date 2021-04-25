import { AnyFunction, INotificationState, ECurrency } from "@domain";
import { EAmountInputType } from "@components";
import { EActionTypes, EExchangeType } from "./store.enum";

export interface ISelectedCurrency {
  base?: ECurrency;
  quote?: ECurrency;
}

export type IRates = {
  [k in ECurrency]: {
    prices: { [j in ECurrency]: number };
    timestamp: number;
  };
};

export interface IDataStore {
  availableBalance: { [k in ECurrency]: number };
  rates: IRates;
}

export interface IAppStore {
  currencySelector: {
    isActive: boolean;
    relatedInputType: EAmountInputType | null;
  };
  amount: {
    [EAmountInputType.base]: string;
    [EAmountInputType.quote]: string;
  };
  isAmountInvalid: boolean;
  selectedCurrency: ISelectedCurrency;
  notification: INotificationState;
  exchangeType: EExchangeType;
}

export interface IStore {
  data: IDataStore;
  app: IAppStore;
}

export interface IAction<T = any> {
  type: EActionTypes;
  payload?: T;
  onSuccess?: AnyFunction;
  onFailure?: AnyFunction;
}
