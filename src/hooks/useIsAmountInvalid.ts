import { useSelector } from "react-redux";
import { IAppStore, IStore } from "@store";

export function useIsAmountInvalid() {
  const { isAmountInvalid } = useSelector<
    IStore,
    {
      isAmountInvalid: IAppStore["isAmountInvalid"];
    }
  >((state) => ({
    isAmountInvalid: state.app.isAmountInvalid,
  }));
  return isAmountInvalid;
}
