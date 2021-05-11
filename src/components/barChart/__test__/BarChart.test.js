import { cleanup, render } from '@testing-library/react';

import BarChart from '../BarChart';

describe('BarChart Component', () => {
  afterEach(cleanup);

  it('should render chart without error', () => {
    // Act
    const { getByText } = render(<BarChart />);
    const chart = getByText(/chart rendered/);

    // Assert
    expect(chart).toBeInTheDocument();
  });
});
