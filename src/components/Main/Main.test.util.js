import { createStore } from "redux";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import reducer from "../../reducers/index";

const render = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export default render;
