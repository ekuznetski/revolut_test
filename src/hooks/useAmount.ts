import { useSelector } from "react-redux";
import { IAppStore, IStore } from "@store";

export function useAmount() {
  const { amount } = useSelector<
    IStore,
    {
      amount: IAppStore["amount"];
    }
  >((state) => ({
    amount: state.app.amount,
  }));
  return amount;
}
