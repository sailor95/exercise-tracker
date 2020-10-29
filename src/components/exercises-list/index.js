import React, { Component } from 'react';
import axios from 'axios';

import Exercise from './exercise';

export default class ExerciseList extends Component {
  state = {
    exercises: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/exercises/')
      .then(res => {
        this.setState({
          exercises: res.data,
        });
      })
      .catch(err => console.log(err));
  }

  deleteExercise = id => {
    axios.delete(`http://localhost:5000/exercises/${id}`).then(res => {
      console.log(res.data);
      this.setState({
        exercises: this.state.exercises.filter(el => el.id !== id),
      });
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map(exe => (
              <Exercise
                exercise={exe}
                deleteExercise={this.deleteExercise}
                key={exe._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
