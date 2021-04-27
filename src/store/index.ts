import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { Nullable } from "@domain";
import * as sagaMiddlewareRunners from "./sagas";
import { IStore } from "./store.interface";
import { appStoreReducer, initAppStore } from "./_app.reducer";
import { dataStoreReducer, initDataStore } from "./_data.reducer";

export const reducers = combineReducers({
  data: dataStoreReducer,
  app: appStoreReducer,
});
export const initStore: Nullable<IStore> = {
  data: initDataStore,
  app: initAppStore,
};

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
export const store = createStore<IStore>(
  reducers,
  initStore,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

Object.keys(sagaMiddlewareRunners).forEach((runner: any) => {
  sagaMiddleware.run((sagaMiddlewareRunners as any)[runner]);
});

export * from "./store.enum";
export * from "./actions";
export * from "./store.interface";
export * from "./_app.reducer";
export * from "./_data.reducer";
