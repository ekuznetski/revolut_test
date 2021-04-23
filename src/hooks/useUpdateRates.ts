import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators, EActionTypes } from "@store";
import { ECurrency } from "@domain";

export function useUpdateRates(interval = 600000) {
  const dispatch = useDispatch();

  // I did it like this because I think this way gives the best performance for client. but ofc it's highload for server, better use nodejs cache server and save all data from price feed with 10 mins interval and emit data from this server to client via event sourcing or websocket

  function fetchRates(): void {
    Object.values(ECurrency).forEach((e) => {
      const ratesParams = {
        base: e,
        symbols: Object.values(ECurrency).filter((v) => v !== e),
      };
      dispatch(ActionCreators[EActionTypes.fetchRates](ratesParams));
    });
  }

  useEffect(() => {
    fetchRates();
    const fetchRatesInterval = setInterval(() => {
      fetchRates();
    }, interval);

    return () => {
      clearInterval(fetchRatesInterval);
    };
  }, []);
}
