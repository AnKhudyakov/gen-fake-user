import User from "../User/User";

const Table = ({ users, locale }) => {
  return (
    <div className="table-responsive bg-light">
      <table className="table table-responsive table-borderless">
        <thead className="table-dark">
          <tr className="bg-light">
            <th scope="col" width="5%">
              №
            </th>
            <th scope="col" width="10%">
              {locale.id}
            </th>
            <th scope="col" width="30%">
              {locale.name}
            </th>
            <th scope="col" width="25%">
              {locale.address}
            </th>
            <th scope="col" width="25%">
              {locale.phone}
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
