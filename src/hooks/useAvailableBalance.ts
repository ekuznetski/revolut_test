import { useSelector } from "react-redux";
import { IDataStore, IStore } from "@store";

export function useAvailableBalance() {
  const { availableBalance } = useSelector<
    IStore,
    {
      availableBalance: IDataStore["availableBalance"];
    }
  >((state) => ({
    availableBalance: state.data.availableBalance,
  }));
  return availableBalance;
}
