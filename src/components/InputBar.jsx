import React from 'react';
import axios from 'axios';

export default class InputBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);

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

  updateInputValue(event) {
    event.preventDefault();

    this.setState((prevState) => ({
      ...prevState,
      inputValue: event.target.value,
    }));
  }

  sendMessage(data) {
    const options = {
      method: 'post',
      url: '/api',
      data: {
        message: data,
      },
      transformResponse: [(res) => {
        const json = JSON.parse(res);
        this.setData(json.message);
        return res;
      }],
    };

    axios(options);
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
