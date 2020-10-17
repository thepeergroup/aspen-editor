import React from 'react'
import axios from 'axios';

export default class Form extends React.Component {
  state = { aspen: "(Liz) [knows] (Jack)." };

  handleSubmit = async (event) => {
    const api_url = process.env.API_HOST || 'http://localhost:9292'
    event.preventDefault();
    console.log("Pulling data from: " + api_url)
    const resp = await axios.post(api_url, { code: this.state.aspen });
    this.props.onSubmit(resp.data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          cols="70"
          rows="8"
          type="text"
          value={this.state.aspen}
          onChange={event => this.setState({ aspen: event.target.value })}
          required
        />
        <br />
        <button>Convert Aspen</button>
      </form>
    );
  }
}