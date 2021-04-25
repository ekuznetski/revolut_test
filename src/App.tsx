import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { useDispatch } from "react-redux";
import {
  AmountInput,
  ChangeDirectionButton,
  CurrencySelector,
  EAmountInputType,
  Header,
  Notifications,
  SubmitButton,
} from "@components";
import { ActionCreators, EActionTypes } from "@store";
import { ECurrency } from "@domain";
import {
  useAvailableBalance,
  useRates,
  useSelectedCurrency,
  useUpdateRates,
} from "@hooks";
import "./styles.scss";

function App() {
  const availableBalance = useAvailableBalance();
  const rates = useRates();
  const selectedCurrency = useSelectedCurrency();
  const dispatch = useDispatch();
  useUpdateRates(600000);

  useEffect(() => {
    dispatch(ActionCreators[EActionTypes.fetchAvailableBalance]());
  }, []);

  useEffect(() => {
    if (availableBalance && !selectedCurrency.base) {
      const baseSelectedCurrency = Object.keys(availableBalance)[0];
      const quoteSelectedCurrency = Object.keys(availableBalance).filter(
        (e) => e !== baseSelectedCurrency
      )[0];
      dispatch(
        ActionCreators[EActionTypes.saveSelectedCurrency]({
          base: baseSelectedCurrency as ECurrency,
          quote: quoteSelectedCurrency as ECurrency,
        })
      );
    }
  }, [availableBalance]);

  return rates ? (
    <>
      <Notifications />
      <CurrencySelector />
      <Header />
      <form autoComplete="off">
        <AmountInput type={EAmountInputType.base} />
        <ChangeDirectionButton />
        <AmountInput type={EAmountInputType.quote} />
        <SubmitButton />
      </form>
    </>
  ) : (
    <>Loading...</>
  );
}

export default hot(App);
