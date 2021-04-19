import React, { useState, useContext } from "react";
import GithubContext from "../../Context/github/githubContext";
import AlertContext from "../../Context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <input
        type='text'
        name='text'
        placeholder='Search Users...'
        value={text}
        onChange={onChange}
      />
      <span>
        <button
          type='button'
          className='btn btn-dark'
          onClick={handleSearchClick}
        >
          Search
        </button>
      </span>
      {githubContext.users.length > 0 && (
        <button
          type='button'
          className='btn btn-light'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
