import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is home page </h2>
        <Link to="/movies">Movies</Link>
      </div>
    );
  }
}
