import React, { Fragment, useEffect, useContext, useState } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import RepoSearch from "../repos/RepoSearch";
import { Link } from "react-router-dom";
import GithubContext from "../../Context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const [repoOrder, setRepoOrder] = useState(true);
  const [starsOrder, setStarsOrder] = useState(true);
  const [watchersOrder, setwatchersOrder] = useState(true);
  const [issuesOrder, setIssuesOrder] = useState(true);
  const [initialRepo, setInitialRepo] = useState([]);

  const {
    getUser,
    loading,
    user,
    repos,
    getUserRepos,
    sortUserRepos,
    // clearUsers,
  } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);

    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;
  console.log("User: ", user);
  console.log("Repos: ", repos);

  const handleSortRepo = (option) => {
    console.log("Repo Clicked: ", option);
    if (option === "name") {
      sortUserRepos(option, repos, repoOrder);
      setRepoOrder(!repoOrder);
    } else if (option === "stargazers_count") {
      sortUserRepos(option, repos, starsOrder);
      setStarsOrder(!starsOrder);
    } else if (option === "watchers") {
      sortUserRepos(option, repos, watchersOrder);
      setwatchersOrder(!watchersOrder);
    } else if (option === "open_issues_count") {
      sortUserRepos(option, repos, issuesOrder);
      setIssuesOrder(!issuesOrder);
    }
  };

  const handleUpdateRepo = (repo) => {
    console.log("Initial Repo: ", repo);
    setInitialRepo([...repo]);
  };

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>

            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>

            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <RepoSearch
        repos={repos}
        handleUpdateRepo={handleUpdateRepo}
        initialRepo={initialRepo}
      />
      <div className='cardtable'>
        <Repos repos={repos} handleSortRepo={handleSortRepo} />
      </div>
    </Fragment>
  );
};

export default User;
