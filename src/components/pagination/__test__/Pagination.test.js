import { cleanup, fireEvent, render } from '@testing-library/react';

import Pagination from '../Pagination';

const defaultProps = {
  handlePagination: jest.fn(),
  pageIndex: 0,
};

describe('Pagination Component', () => {
  afterEach(cleanup);

  it('should not display previous button and should display next button when pageIndex is 0', () => {
    // Act
    const { getByTestId } = render(<Pagination {...defaultProps} />);
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Assert
    expect(prevBtnElement.className).toEqual('hidden');
    expect(nextBtnElement.className).toEqual('');
  });

  it('should display prev button and should not display next button when pageIndex is 1', () => {
    // Arrange
    const props = { ...defaultProps, pageIndex: 1 };

    // Act
    const { getByTestId } = render(<Pagination {...props} />);
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Assert
    expect(prevBtnElement.className).toEqual('');
    expect(nextBtnElement.className).toEqual('hidden');
  });

  it('should trigger handlePagination when next button is clicked', () => {
    // Arrange
    const { getByTestId } = render(<Pagination {...defaultProps} />);
    const nextBtnElement = getByTestId('next-button');

    // Act
    fireEvent.click(nextBtnElement);

    // Assert
    expect(defaultProps.handlePagination).toHaveBeenCalled();
  });

  it('should trigger handlePagination when prev button is clicked', () => {
    // Arrange
    const props = { ...defaultProps, pageIndex: 1 };
    const { getByTestId } = render(<Pagination {...props} />);
    const prevBtnElement = getByTestId('next-button');

    // Act
    fireEvent.click(prevBtnElement);

    // Assert
    expect(defaultProps.handlePagination).toHaveBeenCalled();
  });
});
