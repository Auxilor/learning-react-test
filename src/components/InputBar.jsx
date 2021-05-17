import React from 'react';
import axios from 'axios';

export default class InputBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.clearField = this.clearField.bind(this);

    this.state = {
      inputValue: 'Default',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputValue } = this.state;

    this.sendMessage(inputValue);
  }

  setData(data) {
    this.setState((prevState) => ({
      ...prevState,
      message: data,
    }));
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
      method: 'post',
      url: '/messages',
      data: {
        message: data,
      },
    };

    const getOptions = {
      method: 'get',
      url: '/messages',
      transformResponse: [(res) => {
        const json = JSON.parse(res);
        this.setData(json.messages.map((obj) => obj.message).join(', '));
        return res;
      }],
    };

    axios(postOptions);
    axios(getOptions);
  }

  render() {
    const { inputValue, message } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          {message}
        </p>
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
