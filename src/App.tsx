import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { useDispatch, useSelector } from "react-redux";
import {
  AmountInput,
  ChangeDirectionButton,
  EAmountInputType,
  Header,
  SubmitButton,
} from "@components";
import {
  ActionCreators,
  EActionTypes,
  IAppStore,
  IDataStore,
  IStore,
} from "@store";
import { ECurrency } from "@domain";
import "./styles.scss";

function App() {
  const { availableBalance, rates, selectedCurrency } = useSelector<
    IStore,
    {
      availableBalance: IDataStore["availableBalance"];
      rates: IDataStore["rates"];
      selectedCurrency: IAppStore["selectedCurrency"];
    }
  >((state) => ({
    availableBalance: state.data.availableBalance,
    rates: state.data.rates,
    selectedCurrency: state.app.selectedCurrency,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    // It's a wrong way. To improve performance better to do cache server on nodejs, and save all available currencies  with 10 mins interval, and when user change currency we will request rate for base currency via websocket
    dispatch(ActionCreators[EActionTypes.fetchAvailableBalance]());
    const fetchRatesInterval = setInterval(() => {
      if (selectedCurrency.base) {
        const ratesParams = {
          base: selectedCurrency.base,
          symbols: Object.values(ECurrency).filter(
            (e) => e !== selectedCurrency.base
          ),
        };
        dispatch(ActionCreators[EActionTypes.fetchRates](ratesParams));
      }
    }, 600000);

    return () => {
      clearInterval(fetchRatesInterval);
    };
  }, []);

  useEffect(() => {
    if (selectedCurrency.base) {
      const ratesParams = {
        base: selectedCurrency.base,
        symbols: Object.values(ECurrency).filter(
          (e) => e !== selectedCurrency.base
        ),
      };
      dispatch(ActionCreators[EActionTypes.fetchRates](ratesParams));
    }
  }, [selectedCurrency.base]);

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
      <Header />
      <AmountInput name={EAmountInputType.base} />
      <ChangeDirectionButton />
      <AmountInput name={EAmountInputType.quote} />
      <SubmitButton />
    </>
  ) : (
    <>Loading...</>
  );
}

export default hot(App);
