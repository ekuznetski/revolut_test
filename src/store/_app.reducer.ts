import { Nullable } from "@domain";
import { IAction, IAppStore } from "./store.interface";
import { EActionTypes } from "./store.enum";

export const initAppStore: Nullable<IAppStore> = {
  isCurrencySelectorActive: false,
  amount: null,
  selectedCurrency: {
    base: null,
    quote: null,
  },
  notification: {
    visible: false,
    type: null,
    timeout: null,
    message: null,
  },
};

export function appStoreReducer(
  state = initAppStore as IAppStore,
  action: IAction
): IAppStore {
  switch (action.type) {
    case EActionTypes.saveSelectedCurrency:
      return {
        ...state,
        selectedCurrency: Object.assign(state.selectedCurrency, action.payload),
      };
    default:
      return state;
  }
}
