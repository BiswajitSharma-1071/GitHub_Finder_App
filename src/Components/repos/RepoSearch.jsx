import React, { useState, useContext } from "react";
import GithubContext from "../../Context/github/githubContext";
import AlertContext from "../../Context/alert/alertContext";

const RepoSearch = ({ repos, handleUpdateRepo, initialRepo }) => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  const handleSearchClick = (e) => {
    e.preventDefault();

    const updatedRepos = repos.filter((elem) => elem.name.includes(text));

    if (updatedRepos.length === 0) {
      alertContext.setAlert("Repository Not Found", "light");
      handleUpdateRepo(repos);
      githubContext.updateRepo([]);
    } else {
      githubContext.updateRepo(updatedRepos);
    }
  };

  const handleClearRepos = () => {
    setText("");
    githubContext.updateRepo(initialRepo);
    handleUpdateRepo([]);
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <input
        type='text'
        name='text'
        placeholder='Search Repos...'
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
      {text.length > 0 && (
        <button
          type='button'
          className='btn btn-light'
          onClick={handleClearRepos}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default RepoSearch;
