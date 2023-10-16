import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm.js";

// ! THE TEST FUNCTION IS PROVIDED BY JEST THE TEST RUNNER

test("it shows two inputs nad a button", () => {
  //! RENDER THE COMPONENT
  render(<UserForm />);
  //! MANIPULATE THE COMPONENT OR FIND AN ELEMENT IN IT
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  //! ASSERTION  make sure the component is doing what we expect to do

  expect(inputs).toHaveLength(2);
  //! toHaveLength() IS A MATCHER FUNCTION
  //? THE ASSERTION EXPECTS TO FIND 2 INPUTS IN THE COMPONENT

  expect(button).toBeInTheDocument();
  //? THE ASSERTION EXPECTS A BUTTON TO BE VISIBLE ON THE SCREEN OR PRESENT IN THE DOCUMENT
});

test("it calls onUserAdd when the form is submitted", () => {
  //! NOT THE BEST IMPLEMENTATION
  //? STEPS THAT WILL WE TAKE
  // const argList = [];
  // const callback = (...args) => {
  //   argList.push(args);
  // };

  const mock = jest.fn();

  //! TRY TO RENDER MY COMPONENT
  render(<UserForm onUserAdd={mock} />);

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //!FIND THE TWO INPUTS
  // const [nameInput, emailInput] = screen.getAllByRole("textbox");
  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //!SIMULATE TYPING IN A NAME
  user.click(nameInput);
  user.keyboard("jane");

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //!SIMULATE TYPING IN AN EMAIL
  user.click(emailInput);
  user.keyboard("jane@jane.com");
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //!FIND THE BUTTON
  const button = screen.getByRole("button");

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //!SIMULATE CLICKING THE BUTTON
  user.click(button);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //! ASSERTION TO MAKE SURE 'onUserAdd' GETS CALLED WITH EMAIL/NAME
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@jane.com" });
});
