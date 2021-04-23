import { call, put, takeEvery } from "redux-saga/effects";
import { ENotificationType } from "@domain";
import { EActionTypes } from "./store.enum";
import { Requests } from "../services/api.service";
import { IAction } from "./store.interface";
import { ActionCreators } from "./actions";

function* fetchRatesMiddleware({ payload }: IAction) {
  try {
    const { base, rates } = yield call(
      Requests[EActionTypes.fetchRates],
      payload
    );
    yield put(ActionCreators[EActionTypes.saveRates]({ base, rates }));
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

export function* fetchRatesSaga() {
  yield takeEvery(EActionTypes.fetchRates, fetchRatesMiddleware);
}

export function* fetchAvailableBalanceSaga() {
  yield takeEvery(
    EActionTypes.fetchAvailableBalance,
    fetchAvailableBalanceMiddleware
  );
}
