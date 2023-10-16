import "./App.css";
import UserForm from "./components/UserForm.js";
import { useState } from "react";
import UserList from "./components/UserList.js";

function App() {
  const [users, setUsers] = useState([]);

  const onUserAdd = (user) => {
    setUsers([...users, user]);
  };

  return (
    <>
      <>
        <UserForm onUserAdd={onUserAdd} />
        <hr />
        <UserList users={users} />
      </>
    </>
  );
}

export default App;
