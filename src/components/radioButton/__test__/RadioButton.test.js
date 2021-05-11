import { cleanup, fireEvent, render } from '@testing-library/react';

import RadioButton from '../RadioButton';

const defaultProps = {
  handleChange: jest.fn(),
  units: [
    {
      value: 'metric',
      title: 'Celsius',
    },
    {
      value: 'imperial',
      title: 'Fahrenheit',
    },
  ],
  value: 'imperial',
};

describe('RadioButton Component', () => {
  afterEach(cleanup);

  it('should render only the number of options passed to it - 2', () => {
    // Act
    const { container } = render(<RadioButton {...defaultProps} />);
    const element = container.querySelectorAll('label');

    // Assert
    expect(element.length).toEqual(2);
  });

  it('should render only the number of options passed to it - 3', () => {
    // Act
    const props = {
      ...defaultProps,
      units: [
        ...defaultProps.units,
        {
          value: 'extra',
          title: 'Extra unit',
        },
      ],
    };
    const { container } = render(<RadioButton {...props} />);
    const element = container.querySelectorAll('label');

    // Assert
    expect(element.length).toEqual(3);
  });

  it('should call handleChange when an option is clicked', () => {
    // Arrange
    const { getByTestId } = render(<RadioButton {...defaultProps} />);
    const element = getByTestId('Celsius');

    // Act
    fireEvent.click(element);

    // Assert
    expect(defaultProps.handleChange).toHaveBeenCalled();
  });
});
