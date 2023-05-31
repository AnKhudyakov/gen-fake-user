const User = ({ user, index }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{user.userId}</td>
      <td>
        <div style={{ maxWidth: "250px", wordWrap: "break-word" }}>
          {user.username}
        </div>
      </td>
      <td>
        <div style={{ maxWidth: "350px", wordWrap: "break-word" }}>
          {user.state}, {user.city}, {user.street}
        </div>
      </td>
      <td>
        <div style={{ maxWidth: "250px", wordWrap: "break-word" }}>
          {user.phone}
        </div>
      </td>
    </tr>
  );
};

export default User;
