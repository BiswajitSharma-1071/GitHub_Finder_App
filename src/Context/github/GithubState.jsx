import React, { useReducer, useContext } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SORT_REPOS,
  UPDATE_REPOS,
} from "../types";
import AlertContext from "../alert/alertContext";

const githubClientId = process.env.APP_GITHUB_CLIENT_ID;
const githubClientSecret = process.env.APP_GITHUB_CLIENT_SECRET;

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const alertContext = useContext(AlertContext);

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&per_page=50&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    if (res.data.items && res.data.items.length > 0) {
      dispatch({
        type: SEARCH_USERS,
        payload: res.data.items,
      });
    } else {
      alertContext.setAlert("User Not Found", "light");
      setLoading(false);
      clearUsers();
    }
  };

  // Get User
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading(true);
    // const res = await axios.get(
    //   `https://api.github.com/users/${username}/repos`
    // );

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Sort Repos
  const sortUserRepos = (option, repos, order) => {
    // const updatedRepo = repos.sort((a, b) => a[option] > b[option]);
    let updatedRepo;
    if (order) {
      updatedRepo = repos.sort((a, b) =>
        a[option] > b[option] ? 1 : b[option] > a[option] ? -1 : 0
      );
    } else {
      updatedRepo = repos.sort((a, b) =>
        a[option] > b[option] ? -1 : b[option] > a[option] ? 1 : 0
      );
    }

    dispatch({
      type: SORT_REPOS,
      payload: updatedRepo,
    });
  };

  const updateRepo = (updatedRepos) => {
    dispatch({
      type: UPDATE_REPOS,
      payload: updatedRepos,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = (load) => dispatch({ type: SET_LOADING, payload: load });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        sortUserRepos,
        updateRepo,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
