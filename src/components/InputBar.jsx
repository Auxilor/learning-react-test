import React from 'react';
import axios from 'axios';

export default class InputBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.clearField = this.clearField.bind(this);

    this.state = {
      inputValue: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputValue } = this.state;

    this.sendMessage(inputValue);
  }

  clearField() {
    this.setState((prevState) => ({
      ...prevState,
      inputValue: '',
    }));
  }

  updateInputValue(event) {
    event.preventDefault();

    this.setState((prevState) => ({
      ...prevState,
      inputValue: event.target.value,
    }));
  }

  sendMessage(data) {
    this.clearField();

    const postOptions = {
      header: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'post',
      url: '/api/v1/messages',
      data: {
        message: data,
      },
    };

    axios(postOptions).catch((err) => err);
  }

  render() {
    const { inputValue } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={this.updateInputValue}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
