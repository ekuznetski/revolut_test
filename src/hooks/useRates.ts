import { useSelector } from "react-redux";
import { IDataStore, IStore } from "@store";

export function useRates() {
  const { rates } = useSelector<
    IStore,
    {
      rates: IDataStore["rates"];
    }
  >((state) => ({
    rates: state.data.rates,
  }));
  return rates;
}
