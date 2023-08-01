import { render, screen } from "@testing-library/react";
import Application from "./Application";

describe("Application", () => {
  test("render successfully", () => {
    render(<Application />);
  });
  test("form render successfully", () => {
    render(<Application />);
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();
    const sectionElement = screen.getByRole("heading", { level: 2 });
    //!getByText will search element like div,p and span tag
    const paragraphElement = screen.getByText("All fields are required");
    expect(paragraphElement).toBeInTheDocument();
    expect(sectionElement).toBeInTheDocument();
    //**1st way
    const nameElement = screen.getByRole("textbox", {});

    expect(nameElement).toBeInTheDocument();
    //**2nd way
    const nameElement2 = screen.getByLabelText("Name:");

    expect(nameElement2).toBeInTheDocument();
    const countryElement = screen.getByRole("combobox", {});

    expect(countryElement).toBeInTheDocument();
    const termCheckboxElement = screen.getByRole("checkbox", {});
    expect(termCheckboxElement).toBeInTheDocument();
    const submitButtonElement = screen.getByRole("button", {});
    expect(submitButtonElement).toBeInTheDocument();
  });
});
