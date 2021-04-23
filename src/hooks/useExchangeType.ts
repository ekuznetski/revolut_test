import { useSelector } from "react-redux";
import { EExchangeType, IAppStore, IStore } from "@store";

export function useExchangeType() {
  const { exchangeType } = useSelector<
    IStore,
    {
      exchangeType: IAppStore["exchangeType"];
    }
  >((state) => ({
    exchangeType: state.app.exchangeType,
  }));
  return {
    exchangeType,
    isSellExchangeType: exchangeType === EExchangeType.sell,
  };
}
