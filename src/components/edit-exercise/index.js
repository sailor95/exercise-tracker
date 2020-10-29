import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercise extends Component {
  state = {
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/exercises/${id}`).then(res => {
      const { username, description, duration, date } = res.data;
      this.setState({
        username,
        description,
        duration,
        date: new Date(date),
      });
    });

    axios.get('http://localhost:5000/users/').then(res => {
      if (res.data.length) {
        this.setState({
          users: res.data.map(user => user.username),
          username: res.data.find(el => el._id === id),
        });
      }
    });
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeDuration = e => {
    this.setState({
      duration: e.target.value,
    });
  };

  onChangeDate = date => {
    this.setState({
      date,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, description, duration, date } = this.state;

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);

    axios
      .post(
        `http://localhost:5000/exercises/update/${this.props.match.params.id}`,
        exercise
      )
      .then(res => console.log(res.data));

    window.location = '/';
  };

  render() {
    const { username, users, description, duration, date } = this.state;

    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              className="form-control"
              required
              value={username}
              onChange={this.onChangeUsername}
            >
              {users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              className="form-control"
              type="text"
              value={description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes): </label>
            <input
              className="form-control"
              type="text"
              value={duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker selected={date} onChange={this.onChangeDate} />
            </div>
          </div>

          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Edit" />
          </div>
        </form>
      </div>
    );
  }
}
