import { useSelector } from "react-redux";
import { IAppStore, IStore } from "@store";

export function useSelectedCurrency() {
  const { selectedCurrency } = useSelector<
    IStore,
    {
      selectedCurrency: IAppStore["selectedCurrency"];
    }
  >((state) => ({
    selectedCurrency: state.app.selectedCurrency,
  }));
  return selectedCurrency;
}
