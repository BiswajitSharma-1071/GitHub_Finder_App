import React from "react";
import PropTypes from "prop-types";

const Repos = ({ repos, handleSortRepo }) => {
  return (
    <table>
      <thead>
        <tr>
          <th
            tabIndex='-1'
            onClick={(e) => handleSortRepo("name")}
            style={{ outline: "none" }}
          >
            Repository
          </th>
          <th
            tabIndex='-1'
            onClick={(e) => handleSortRepo("stargazers_count")}
            style={{ outline: "none" }}
          >
            Stars
          </th>
          <th
            tabIndex='-1'
            onClick={(e) => handleSortRepo("watchers")}
            style={{ outline: "none" }}
          >
            Watchers
          </th>
          <th
            tabIndex='-1'
            onClick={(e) => handleSortRepo("open_issues_count")}
            style={{ outline: "none" }}
          >
            Open Issues
          </th>
        </tr>
      </thead>
      <tbody>
        {repos &&
          repos.length > 0 &&
          repos.map((item) => (
            <tr key={item.id}>
              <td>
                <a href={item.html_url}>{item.name}</a>
              </td>
              <td>{item.stargazers_count}</td>
              <td>{item.watchers}</td>
              <td>{item.open_issues_count}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
