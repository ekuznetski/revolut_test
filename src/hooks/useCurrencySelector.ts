import { useSelector } from "react-redux";
import { IAppStore, IStore } from "@store";

export function useCurrencySelector() {
  const { currencySelector } = useSelector<
    IStore,
    {
      currencySelector: IAppStore["currencySelector"];
    }
  >((state) => ({
    currencySelector: state.app.currencySelector,
  }));
  return currencySelector;
}
