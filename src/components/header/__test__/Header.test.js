import { render, cleanup } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  afterEach(cleanup);

  it('should render without errors', () => {
    // Act
    const { container } = render(<Header />);
    const element = container.querySelector('img');
    const headerParent = container.querySelector('header');

    // Assert
    expect(element.getAttribute('src')).toEqual('logo.png');
    expect(headerParent.children.length).toEqual(1);
  });
});
