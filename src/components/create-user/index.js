import React, { Component } from 'react';

export default class EditUser extends Component {
  state = {
    username: '',
  };

  onChangeUsername = e => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    this.setState({
      username: '',
    });
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              className="form-control"
              type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Create" />
          </div>
        </form>
      </div>
    );
  }
}
