import { useState } from "react";
import User from "../User/User";

const Table = ({ users }) => {
  return (
    <div className="table-responsive bg-light">
      <table
        className="table table-responsive table-borderless"
      >
        <thead className="table-dark">
          <tr className="bg-light">
            <th scope="col" width="5%">№</th>
            <th scope="col" width="10%">id</th>
            <th scope="col" width="30%">
              Full Name
            </th>
            <th scope="col" width="25%">
              Address
            </th>
            <th scope="col" width="25%">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User user={user} index={index} key={user.userId} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
