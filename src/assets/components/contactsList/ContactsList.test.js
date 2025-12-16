import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import ContactsList from "./ContactsList";
import { useSelector } from "react-redux";
import { getContacts, getFilter } from "../../../redux/selectors";
import userEvent from "@testing-library/user-event";

const mockDispatch = jest.fn();
const mockDeleteContact = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
jest.mock("../../../redux/operations.js", () => ({
  deleteContact: (...args) => mockDeleteContact(...args),
}));

describe("ContactsList", () => {
  const contacts = [
    { id: 1, name: "John", number: "123-456-789" },
    { id: 2, name: "Ann", number: "123-456-789" },
  ];
  const mockUseSelector = (filter = "") =>
    useSelector.mockImplementation((selector) => {
      if (selector === getContacts) return contacts;
      if (selector === getFilter) return filter;
    });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("render of all contacts", () => {
    mockUseSelector();

    render(<ContactsList />);
    expect(screen.getByText("John - 123-456-789")).toBeInTheDocument();
    expect(screen.getByText("Ann - 123-456-789")).toBeInTheDocument();
  });

  test("render contacts with filter", () => {
    mockUseSelector("nn");

    render(<ContactsList />);
    expect(screen.getByText("Ann - 123-456-789")).toBeInTheDocument();
    expect(screen.queryByText("John - 123-456-789")).not.toBeInTheDocument();
  });

  test("render contacts with bad filter", () => {
    mockUseSelector("box");

    render(<ContactsList />);
    expect(screen.queryByText("Ann - 123-456-789")).not.toBeInTheDocument();
    expect(screen.queryByText("John - 123-456-789")).not.toBeInTheDocument();
  });

  test("delete contact", async () => {
    mockUseSelector();

    render(<ContactsList />);
    const deleteButtons = screen.getAllByText("Delete");
    await userEvent.click(deleteButtons[0]);

    expect(mockDeleteContact).toHaveBeenCalledTimes(1);
    expect(mockDeleteContact).toHaveBeenCalledWith(1);
  });
});
