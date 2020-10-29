import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  state = {
    collapse: true,
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          ExerciseTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() =>
            this.setState(prevState => ({
              collapse: !prevState.collapse,
            }))
          }
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${this.state.collapse ? 'collapse' : ''} navbar-collapse`}
        >
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                All
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                New Exercise
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                New User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
