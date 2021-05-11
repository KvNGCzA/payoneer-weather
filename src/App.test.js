import App from './App';
import render from './helper/test.util';

describe('Render App', () => {
  it('should render without error', () => {
    // Act
    const { container } = render(<App />);
    const element = container.querySelector('header');

    // Assert
    expect(element).toBeInTheDocument();
  });
});
