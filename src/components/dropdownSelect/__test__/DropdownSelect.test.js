import { cleanup, render } from '@testing-library/react';

import DropdownSelect from '../DropdownSelect';

const defaultProps = {
  handleSelect: jest.fn(),
  regions: [
    'Berlin',
    'Munich',
    'Hamburg',
    'Leipzig',
    'Dresden',
    'Heidelberg',
    'Stuttgart',
  ],
  value: 'Munich',
};

describe('DropdownSelect Component', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    // Act
    const { container } = render(<DropdownSelect {...defaultProps} />);
    const element = container.querySelector('input');

    // Assert
    expect(element.value).toEqual(defaultProps.value);
  });
});
