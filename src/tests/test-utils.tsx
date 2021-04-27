import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { store as _store } from "@store";
import { Provider } from "react-redux";
// Import your own reducer

// @ts-ignore
function render(ui, { initialState, store = _store, ...renderOptions } = {}) {
  // @ts-ignore
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  // @ts-ignore
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
