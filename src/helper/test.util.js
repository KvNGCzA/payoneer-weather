import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../reducers/';

const render = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  store.dispatch = jest.fn();

  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export default render;
