import { cleanup, fireEvent } from '@testing-library/react';
import Main from '../Main';
import render from '../../../helper/test.util';
import initialState from './Main.mock';

describe('Render Main', () => {
  afterEach(cleanup);

  it('should display loader when loading is true', () => {
    // Act
    const { getByTestId } = render(<Main />, {
      initialState: { loading: true, weatherData: {} },
    });
    const element = getByTestId('loader');

    // Assert
    expect(element).toBeInTheDocument();
  });

  it('should ensure temperature selectors are visible', () => {
    // Act
    const { getByTestId } = render(<Main />, {
      initialState,
    });
    const element = getByTestId('temp-selector');

    // Assert
    expect(element).toBeInTheDocument();
  });

  it('should ensure only three cards are displayed', () => {
    // Act
    const { getAllByTestId } = render(<Main />, {
      initialState,
    });
    const cards = getAllByTestId('parent-container');

    // Assert
    expect(cards.length).toEqual(3);
  });

  it('should render chart when any card is clicked', () => {
    // Arrange
    const { getAllByTestId, getByTestId } = render(<Main />, {
      initialState,
    });
    const card = getAllByTestId('parent-container')[0];

    // Act
    fireEvent.click(card);

    // Assert
    const chart = getByTestId('chart');
    expect(chart.textContent).toEqual('chart render');
  });

  it('should ensure fahrenheit is the default unit', () => {
    // Act
    const { getAllByTestId } = render(<Main />, {
      initialState,
    });
    const unit = getAllByTestId('unit')[0];

    // Assert
    expect(unit.textContent).toEqual('F');
  });

  it('should ensure unit changes from Fahrenheit to Celsius', () => {
    // Arrange
    const { getByTestId, getAllByTestId } = render(<Main />, {
      initialState,
    });
    const celsiusButton = getByTestId('Celsius');

    // Act
    fireEvent.click(celsiusButton);

    // Assert
    const unit = getAllByTestId('unit')[0];
    expect(unit.textContent).toEqual('C');
  });

  it('should ensure only next page pagination button is displayed on initial load', () => {
    // Act
    const { getByTestId } = render(<Main />, {
      initialState,
    });
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Assert
    expect(prevBtnElement.style.visibility).toEqual('hidden');
    expect(nextBtnElement.style.visibility).toEqual('visible');
  });

  it('should ensure only prev page pagination button is displayed after clicking next page button', () => {
    // Arrange
    const { getByTestId } = render(<Main />, {
      initialState,
    });
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Act
    fireEvent.click(nextBtnElement);

    // Assert
    expect(prevBtnElement.style.visibility).toEqual('visible');
    expect(nextBtnElement.style.visibility).toEqual('hidden');
  });

  it('should ensure only two cards are displayed after clicking next page button and has class of underThree', () => {
    // Arrange
    const { getAllByTestId, getByTestId } = render(<Main />, {
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
    const { getByTestId } = render(<Main />, {
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
    const { getByTestId } = render(<Main />, {
      initialState: { loading: false, weatherData: {} },
    });
    const failure = getByTestId('failure-text');

    // Assert
    expect(failure.textContent).toEqual(
      'There was a problem fetching the weather data at this moment!!!'
    );
  });
});
