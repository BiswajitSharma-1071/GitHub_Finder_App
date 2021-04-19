import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../Context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='userStyle'>
        {/* style={userStyle}> */}
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

// const userStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(4, 1fr)",
//   gridGap: "1rem",
// };

export default Users;
