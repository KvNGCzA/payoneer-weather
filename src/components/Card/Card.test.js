import { fireEvent, render, cleanup } from "@testing-library/react";
import Card from "./Card";

const defaultProps = {
  state: "Munich",
  date: "21 May 2021",
  temp: 22,
  pressure: 100,
  humidity: 200,
  overcast: "clear skies",
  unit: "metric",
  overall: "Clouds",
  handleCardClick: jest.fn(),
  isActive: false,
};

describe("Render Card Component", () => {
  afterEach(cleanup);

  it("should call handleCardClick when user clicks anywhere in card", () => {
    // Act
    const { getByTestId } = render(<Card {...defaultProps} />);
    const element = getByTestId("parent-container");

    // Act
    fireEvent.click(element);

    // Assert
    expect(defaultProps.handleCardClick).toHaveBeenCalled();
  });

  it("should not contain class of active when isActive is false in props", () => {
    // Act
    const { getByTestId } = render(<Card {...defaultProps} />);
    const element = getByTestId("parent-container");
    const cardParentClass = element.getAttribute("class");

    // Assert
    expect(cardParentClass).toEqual("card");
  });

  it("should render pressure text correctly", () => {
    // Act
    const { getByTestId } = render(<Card {...defaultProps} />);
    const element = getByTestId("pressure");

    // Assert
    expect(element.textContent).toEqual("100 hPa");
  });

  it("should render humidity text correctly", () => {
    // Act
    const { getByTestId } = render(<Card {...defaultProps} />);
    const element = getByTestId("humidity");

    // Assert
    expect(element.textContent).toEqual("200%");
  });

  it("should render correct image element for card image", () => {
    // Act
    const { getByTestId } = render(<Card {...defaultProps} />);
    const element = getByTestId("card-image");
    const imageLink = element.getAttribute("src");

    // Assert
    expect(imageLink).toContain("clouds_day.png");
  });

  it("should render unit as C when unit metric", () => {
    // Act
    const { getByTestId } = render(<Card {...defaultProps} />);
    const element = getByTestId("unit");

    // Assert
    expect(element.textContent).toEqual("C");
  });

  it("should render unit as F when unit imperial", () => {
    // Arrange
    const props = {
      ...defaultProps,
      unit: "imperial",
    };

    // Act
    const { getByTestId } = render(<Card {...props} />);
    const element = getByTestId("unit");

    // Assert
    expect(element.textContent).toEqual("F");
  });

  it("should contain class of active when isActive is true in props", () => {
    // Arrange
    const props = {
      ...defaultProps,
      isActive: true,
    };

    // Act
    const { getByTestId } = render(<Card {...props} />);
    const element = getByTestId("parent-container");
    const cardParentClass = element.getAttribute("class");

    // Assert
    expect(cardParentClass).toEqual("card active");
  });
});
