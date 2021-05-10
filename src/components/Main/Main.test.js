import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Main from './Main';
import render from './Main.test.util';
import initialState from './mock-data/index.mock';

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
});
