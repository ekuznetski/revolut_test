import { Nullable } from "@domain";
import { EActionTypes } from "./store.enum";
import { IAction, IDataStore } from "./store.interface";

export const initDataStore: Nullable<IDataStore> = {
  availableBalance: null,
  rates: null,
};

export function dataStoreReducer(
  state = initDataStore as IDataStore,
  action: IAction
): IDataStore {
  switch (action.type) {
    case EActionTypes.saveRates:
      return { ...state, rates: action.payload };

    case EActionTypes.saveAvailableBalance:
      return {
        ...state,
        availableBalance: action.payload as IDataStore["availableBalance"],
      };

    default:
      return state;
  }
}
