const User = ({ user, index }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{user.userId}</td>
      <td>{user.username}</td>
      <td>{user.state}, {user.city}, {user.street}</td>
      <td>{user.phone}</td>
    </tr>
  );
};

export default User;
