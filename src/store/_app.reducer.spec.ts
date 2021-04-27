import { ECurrency, ENotificationType } from "@domain";
import { EAmountInputType } from "@components";
import { appStoreReducer, initAppStore } from "./_app.reducer";
import { ActionCreators } from "./actions";
import { EActionTypes } from "./store.enum";
import { IAppStore } from "./store.interface";

describe("app.reducer", () => {
  it("should return state with empty amount and reset isAmountInvalid", () => {
    const action = ActionCreators[EActionTypes.saveSelectedCurrency]({
      base: ECurrency.gbp,
    });
    Object.assign(initAppStore);
    initAppStore.amount = {
      base: "111",
      quote: "222",
    };
    initAppStore.isAmountInvalid = {
      base: true,
      quote: true,
    };
    expect(
      !!appStoreReducer(initAppStore as IAppStore, action).amount.base
    ).toBeFalsy();
    expect(
      !!appStoreReducer(initAppStore as IAppStore, action).amount.base
    ).toBeFalsy();
    expect(
      appStoreReducer(initAppStore as IAppStore, action).isAmountInvalid.base
    ).toBeFalsy();
    expect(
      appStoreReducer(initAppStore as IAppStore, action).isAmountInvalid.quote
    ).toBeFalsy();
  });

  it("should return amount", () => {
    const actData = {
      base: "123",
      quote: "321",
    };
    const action = ActionCreators[EActionTypes.saveAmount](actData);
    expect(
      appStoreReducer(initAppStore as IAppStore, action).amount.base
    ).toEqual(actData.base);
    expect(
      appStoreReducer(initAppStore as IAppStore, action).amount.quote
    ).toEqual(actData.quote);
  });

  it("should showCurrencySelector", () => {
    const actData = EAmountInputType.base;
    const action = ActionCreators[EActionTypes.showCurrencySelector](actData);
    expect(
      appStoreReducer(initAppStore as IAppStore, action).currencySelector
        .isActive
    ).toBeTruthy();
    expect(
      appStoreReducer(initAppStore as IAppStore, action).currencySelector
        .relatedInputType
    ).toEqual(actData);
  });

  it("should hideCurrencySelector", () => {
    const action = ActionCreators[EActionTypes.hideCurrencySelector]();
    expect(
      appStoreReducer(initAppStore as IAppStore, action).currencySelector
        .isActive
    ).toBeFalsy();
    expect(
      appStoreReducer(initAppStore as IAppStore, action).currencySelector
        .relatedInputType
    ).toBeNull();
  });

  it("should showNotification", () => {
    const actData = {
      type: ENotificationType.success,
      message: "success",
    };
    const action = ActionCreators[EActionTypes.showNotification](actData);
    expect(
      appStoreReducer(initAppStore as IAppStore, action).notification.type
    ).toEqual(actData.type);
    expect(
      appStoreReducer(initAppStore as IAppStore, action).notification.message
    ).toEqual(actData.message);
    expect(
      appStoreReducer(initAppStore as IAppStore, action).notification.isVisible
    ).toBeTruthy();
  });

  it("should hideNotification", () => {
    const action = ActionCreators[EActionTypes.hideNotification]();
    expect(
      appStoreReducer(initAppStore as IAppStore, action).notification.isVisible
    ).toBeFalsy();
  });

  it("should changeExchangeDirection", () => {
    const action = ActionCreators[EActionTypes.changeExchangeDirection]();
    expect(
      appStoreReducer(initAppStore as IAppStore, action).exchangeType
    ).not.toEqual(initAppStore.exchangeType);
  });

  it("should setAmountInvalid", () => {
    const action = ActionCreators[EActionTypes.setAmountInvalid](
      EAmountInputType.base
    );
    expect(
      appStoreReducer(initAppStore as IAppStore, action).isAmountInvalid.base
    ).toBeTruthy();
  });

  it("should setAmountValid", () => {
    const action = ActionCreators[EActionTypes.setAmountValid](
      EAmountInputType.quote
    );
    expect(
      appStoreReducer(initAppStore as IAppStore, action).isAmountInvalid.quote
    ).toBeFalsy();
  });
});
