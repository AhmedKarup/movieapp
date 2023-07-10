import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="App-container  ">
      <div className=" hTitle d-flex justify-content-center ">
        <h2>MovieApp</h2>
      </div>
      <nav className="navbar navbar-expand-sm  bg- navbar-dark ">
        <ul className="navbar-nav ">
          <li className="nav-item- m-3">
            <Link
              className="btn btn-light  btn-outline-dark "
              style={{ width: "150px" }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item- m-3">
            <Link
              className="btn btn-light  btn-outline-dark "
              style={{ width: "150px" }}
              to="/movies"
            >
              Movies
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
