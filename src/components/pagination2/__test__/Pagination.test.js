import { fireEvent, render, cleanup } from '@testing-library/react';
import Pagination from '../Pagination';

const defaultProps = {
  handlePagination: jest.fn(),
  pageIndex: 0,
};

describe('Render Pagination', () => {
  afterEach(cleanup);

  it('should not display previous button and should display next button when pageIndex is 0', () => {
    // Act
    const { getByTestId } = render(<Pagination {...defaultProps} />);
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Assert
    expect(prevBtnElement.style.visibility).toEqual('hidden');
    expect(nextBtnElement.style.visibility).toEqual('visible');
  });

  it('should display prev button and should not display next button when pageIndex is 1', () => {
    // Arrange
    const props = { ...defaultProps, pageIndex: 1 };

    // Act
    const { getByTestId } = render(<Pagination {...props} />);
    const prevBtnElement = getByTestId('prev-button');
    const nextBtnElement = getByTestId('next-button');

    // Assert
    expect(prevBtnElement.style.visibility).toEqual('visible');
    expect(nextBtnElement.style.visibility).toEqual('hidden');
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
