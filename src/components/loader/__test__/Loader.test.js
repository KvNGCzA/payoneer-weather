import { cleanup, render } from '@testing-library/react';

import Loader from '../Loader';

describe('Loader Component', () => {
  afterEach(cleanup);

  it('should render without errors', () => {
    // Act
    const { getByTestId } = render(<Loader />);
    const element = getByTestId('loader');

    // Assert
    expect(element).toBeInTheDocument();
    expect(element.children.length).toEqual(1);
  });
});
