import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

let props = null;
describe("Render Card", () => {
  let eleContainer;

  beforeEach(() => {
    props = {
      state: "Munich",
      date: "21 May 2021",
      temp: 22,
      pressure: 100,
      humidity: 200,
      overcast: "clear skies",
      unit: "Celsius",
      overall: "Clouds",
      handleCardClick: jest.fn(),
      isActive: false,
    };

    const { container } = render(<Card {...props} />);
    eleContainer = container;
  });

  it("should call handleCardClick when user clicks anywhere in card", () => {
    // Arrange
    const element = screen.getByText(/Munich/i);

    // Act
    fireEvent.click(element);

    // Assert
    expect(props.handleCardClick).toHaveBeenCalled();
  });

  it("should not contain class of active when isActive is false in props", () => {
    // Arrange
    const cardElement = eleContainer.getElementsByClassName("card active")[0];

    // Assert
    expect(cardElement).toBeUndefined();
  });

  it("should contain class of active when isActive is true in props", () => {
    // Arrange
    props.isActive = true;

    // Act
    const { container } = render(<Card {...props} />);
    eleContainer = container;

    // Assert
    const cardElement = eleContainer.getElementsByClassName("card active")[0];
    expect(cardElement).not.toBeEmptyDOMElement();
  });

  it("should render pressure text correctly", () => {
    // Arrange
    const element = screen.getByText(/100 hPa/i);

    // Assert
    expect(element).toBeInTheDocument();
  });

  it("should render humidity text correctly", () => {
    // Arrange
    const element = screen.getByText(/200%/i);

    // Assert
    expect(element).toBeInTheDocument();
  });

  it("should render correct image element for card image", () => {
    // Arrange
    const image = eleContainer.getElementsByTagName("img")[0];

    // Assert
    expect(image.src).toContain("clouds_day.png");
  });
});
