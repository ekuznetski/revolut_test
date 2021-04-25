import { call, put, takeEvery } from "redux-saga/effects";
import { ENotificationType, EResponseStatus } from "@domain";
import { EActionTypes } from "./store.enum";
import { Requests } from "../services/api.service";
import { IAction, IRates } from "./store.interface";
import { ActionCreators } from "./actions";

function* fetchRatesMiddleware({ payload }: IAction) {
  try {
    const { base, rates } = yield call(
      Requests[EActionTypes.fetchRates],
      payload
    );
    const preparedRates = {
      [base]: {
        timestamp: new Date().getTime(),
        prices: rates,
      },
    };
    yield put(ActionCreators[EActionTypes.saveRates](preparedRates as IRates));
  } catch (e) {
    yield put(
      ActionCreators[EActionTypes.showNotification]({
        type: ENotificationType.failure,
        message:
          "OOPS... we have server error. If you hacker, pls stop hack us.",
      })
    );
  }
}

function* fetchAvailableBalanceMiddleware() {
  try {
    const { response } = yield call(
      Requests[EActionTypes.fetchAvailableBalance]
    );
    yield put(ActionCreators[EActionTypes.saveAvailableBalance](response));
  } catch (e) {
    yield put(
      ActionCreators[EActionTypes.showNotification]({
        type: ENotificationType.failure,
        message:
          "OOPS... we have server error. If you hacker, pls stop hack us.",
      })
    );
  }
}

function* submitExchangeMiddleware(action: IAction) {
  try {
    const { status } = yield call(
      Requests[EActionTypes.submitExchange],
      action.payload
    );
    if (status === EResponseStatus.success) {
      console.log("success submit");
      yield put(ActionCreators[EActionTypes.fetchAvailableBalance]());
    }
    yield put(
      ActionCreators[EActionTypes.showNotification]({
        type: ENotificationType.success,
        message: "success",
      })
    );
  } catch (e) {
    yield put(
      ActionCreators[EActionTypes.showNotification]({
        type: ENotificationType.failure,
        message:
          "OOPS... we have server error. If you hacker, pls stop hack us.",
      })
    );
  }
}

export function* fetchRatesSaga() {
  yield takeEvery(EActionTypes.fetchRates, fetchRatesMiddleware);
}

export function* fetchAvailableBalanceSaga() {
  yield takeEvery(
    EActionTypes.fetchAvailableBalance,
    fetchAvailableBalanceMiddleware
  );
}

export function* submitExchangeSaga() {
  yield takeEvery(EActionTypes.submitExchange, submitExchangeMiddleware);
}
