import { createStore } from 'redux';
import { cleanup, fireEvent } from '@testing-library/react';

import initialState from './Landing.mock';
import Landing from '../Landing';
import render from '../../../helper/test.util';
import reducer from '../../../reducers';

describe('Landing Component', () => {
  afterEach(cleanup);

  it('should display loader when loading is true', () => {
    // Act
    const { getByTestId } = render(<Landing />, {
      initialState: { loading: true, weatherData: {} },
    });
    const element = getByTestId('loader');

    // Assert
    expect(element).toBeInTheDocument();
  });

  it('should ensure temperature selectors are visible', () => {
    // Act
    const { getByTestId } = render(<Landing />, {
      initialState,
    });
    const element = getByTestId('temp-selector');

    // Assert
    expect(element).toBeInTheDocument();
  });

  it('should ensure only three cards are displayed', () => {
    // Act
    const { getAllByTestId } = render(<Landing />, {
      initialState,
    });
    const cards = getAllByTestId('parent-container');

    // Assert
    expect(cards.length).toEqual(3);
  });

  it('should render chart when any card is clicked', () => {
    // Arrange
    const { getAllByTestId, getByTestId } = render(<Landing />, {
      initialState,
    });
    const card = getAllByTestId('parent-container')[0];

    // Act
    fireEvent.click(card);

    // Assert
    const chart = getByTestId('chart');
    expect(chart.textContent).toEqual('chart rendered');
  });

  it('should render only one chart when any card is clicked twice', () => {
    // Arrange
    const { getAllByTestId } = render(<Landing />, {
      initialState,
    });
    const card = getAllByTestId('parent-container')[0];

    // Act
    fireEvent.click(card);
    fireEvent.click(card);

    // Assert
    const chart = getAllByTestId('chart');
    expect(chart.length).toEqual(1);
  });

  it('should ensure fahrenheit is the default unit', () => {
    // Act
    const { getAllByTestId } = render(<Landing />, {
      initialState,
    });
    const unit = getAllByTestId('unit')[0];

    // Assert
    expect(unit.textContent).toEqual('F');
  });

  it('should call store.dispatch when user changes the unit of temperature', () => {
    // Arrange
    const store = createStore(reducer, initialState);
    const { getByTestId } = render(<Landing />, {
      initialState, store
    });
    const celsiusButton = getByTestId('Celsius');

    // Act
    fireEvent.click(celsiusButton);

    // Assert
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should ensure only next page pagination button is displayed on initial load', () => {
    // Act
    const { getByTestId } = render(<Landing />, {
      initialState,
    });
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Assert
    expect(prevBtnElement.className).toEqual('hidden');
    expect(nextBtnElement.className).toEqual('');
  });

  it('should ensure only prev page pagination button is displayed after clicking next page button', () => {
    // Arrange
    const { getByTestId } = render(<Landing />, {
      initialState,
    });
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Act
    fireEvent.click(nextBtnElement);

    // Assert
    expect(prevBtnElement.className).toEqual('');
    expect(nextBtnElement.className).toEqual('hidden');
  });

  it('should ensure only two cards are displayed after clicking next page button and has class of underThree', () => {
    // Arrange
    const { getAllByTestId, getByTestId } = render(<Landing />, {
      initialState,
    });
    const nextBtnElement = getByTestId('next-button');

    // Act
    fireEvent.click(nextBtnElement);
    const allCards = getAllByTestId('parent-container');
    const cardParent = getByTestId('cards');

    // Assert
    expect(allCards.length).toEqual(2);
    expect(cardParent.getAttribute('class')).toEqual('cards underThree');
  });

  it('should render error message when empty data is returned from api', () => {
    // Arrange
    const { getByTestId } = render(<Landing />, {
      initialState: { loading: false, weatherData: { dates: [] } },
    });
    const failure = getByTestId('failure-text');

    // Assert
    expect(failure.textContent).toEqual(
      'There is no weather data to display at the moment'
    );
  });

  it('should render error message when api fails and data is null', () => {
    // Arrange
    const { getByTestId } = render(<Landing />, {
      initialState: { loading: false, weatherData: {} },
    });
    const failure = getByTestId('failure-text');

    // Assert
    expect(failure.textContent).toEqual(
      'There was a problem fetching the weather data at this moment!!!'
    );
  });
});
