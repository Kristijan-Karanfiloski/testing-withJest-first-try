import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";
function renderComponent() {
  const users = [
    { name: "jane", email: "jane@gmail.com" },
    { name: "sam", email: "sam@gmail.com" },
  ];

  render(<UserList users={users} />);

  return {
    users,
  };
}

// beforeEach(() => {})

test("render one row per user", () => {
  //!RENDER THE COMPONENT
  // const users = [
  //   { name: "jane", email: "jane@gmail.com" },
  //   { name: "sam", email: "sam@gmail.com" },
  // ];

  renderComponent();

  //?ONE WAY
  // const { container } = render(<UserList users={users} />);
  // render(<UserList users={users} />);

  //!FIND ALL THE ROWS IN THE TABLE
  //? ONE WAY
  // const rows = screen.getAllByRole("row");
  //? SECOND WAY
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  //?THIRD BEST WAY
  // const table = container.querySelector("table");
  // console.log(table);
  // const rows = container.querySelectorAll("tbody tr");

  // screen.logTestingPlaygroundURL();

  //!ASSERTION : CORRECT NUMBER OF ROWS IN THE TABLE
  expect(rows).toHaveLength(2);
});
test("render the email and name of each user", () => {
  // const users = [
  //   { name: "jane", email: "jane@gmail.com" },
  //   { name: "sam", email: "sam@gmail.com" },
  // ];
  //
  // render(<UserList users={users} />);

  const { users } = renderComponent();

  // screen.logTestingPlaygroundURL();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
