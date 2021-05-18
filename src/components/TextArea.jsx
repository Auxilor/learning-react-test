import React from 'react';
import axios from 'axios';
import './textarea.scss';

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  setData(messages) {
    this.setState((prevState) => ({
      ...prevState,
      messages,
    }));
  }

  updateMessages() {
    const getOptions = {
      header: {
        Accept: 'application/json',
      },
      method: 'get',
      url: '/api/messages',
      transformResponse: [(res) => {
        const json = JSON.parse(res);
        this.setData(json.messages.map((obj) => obj.message));
        return res;
      }],
    };

    axios(getOptions);
  }

  render() {
    const { messages } = this.state;

    this.updateMessages();

    return (
      <div className="text-area">
        {messages.join(', ')}
      </div>
    );
  }
}
