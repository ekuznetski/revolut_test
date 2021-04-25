import { Nullable } from "@domain";
import { EAmountInputType } from "@components";
import { IAction, IAppStore } from "./store.interface";
import { EActionTypes, EExchangeType } from "./store.enum";

export const initAppStore: Nullable<IAppStore> = {
  currencySelector: {
    isActive: false,
    relatedInputType: null,
  },
  amount: {
    [EAmountInputType.base]: null,
    [EAmountInputType.quote]: null,
  },
  isAmountInvalid: false,
  selectedCurrency: {
    base: null,
    quote: null,
  },
  notification: {
    isVisible: false,
    type: null,
    timeout: null,
    message: null,
  },
  exchangeType: EExchangeType.sell,
};

export function appStoreReducer(
  state = initAppStore as IAppStore,
  action: IAction
): IAppStore {
  switch (action.type) {
    case EActionTypes.saveAmount:
      return {
        ...state,
        amount: Object.assign(state.amount, action.payload),
      };
    case EActionTypes.saveSelectedCurrency:
      return {
        ...state,
        selectedCurrency: Object.assign(state.selectedCurrency, action.payload),
      };
    case EActionTypes.showCurrencySelector:
      return {
        ...state,
        currencySelector: {
          isActive: true,
          relatedInputType: action.payload,
        },
      };
    case EActionTypes.hideCurrencySelector:
      return {
        ...state,
        currencySelector: {
          isActive: false,
          relatedInputType: null,
        },
      };
    case EActionTypes.showNotification:
      return {
        ...state,
        notification: {
          ...state.notification,
          ...action.payload,
          isVisible: true,
        },
      };
    case EActionTypes.hideNotification:
      return {
        ...state,
        notification: {
          ...state.notification,
          isVisible: false,
        },
      };
    case EActionTypes.changeExchangeDirection:
      return {
        ...state,
        exchangeType:
          state.exchangeType === EExchangeType.sell
            ? EExchangeType.buy
            : EExchangeType.sell,
      };
    case EActionTypes.setAmountInvalid:
      return {
        ...state,
        isAmountInvalid: true,
      };
    case EActionTypes.setAmountValid:
      return {
        ...state,
        isAmountInvalid: false,
      };
    default:
      return state;
  }
}
