import React from 'react'
import axios from 'axios';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the form DOM element
    this.form = React.createRef();
    // this.keydownHandler = this.keydownHandler.bind(this);
  }

  state = {
    aspen: "(Liz) [knows] (Jack).",
    match_present: false
  };

  keydownHandler (e) {
    if(!(e.keyCode === 13 && e.metaKey)) return;
    console.log("Triggered")
    // There should be a way to do this with a ref.
    const btn = document.getElementById('submit')
    console.log(btn);
    btn.click();
  }

  componentDidMount () {
    document.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  onChange = (event) => {
    const regex = new RegExp(/^grammar:/, 'gm')
    const source = event.target.value
    const match_present = regex.test(source)
    this.setState({ aspen: source, match_present: match_present })
  }

  handleSubmit = async (event) => {
    const api_url = process.env.API_HOST || 'http://localhost:9292'
    event.preventDefault();
    console.log("Pulling data from: " + api_url)
    const resp = await axios.post(api_url, { code: this.state.aspen });
    this.props.onSubmit(resp.data);
  };

  render() {
    return (
      <form ref={this.form} onSubmit={this.handleSubmit}>
        <textarea
          cols="70"
          rows="8"
          type="text"
          value={this.state.aspen}
          onChange={this.onChange}
          required
        />
        <br />
        {this.state.match_present &&
          <p>
            Custom grammars will only appear in the Cypher export.
            Click "Copy Cypher" after converting Aspen in order
            to see the results of the custom grammar.
          </p>
        }
        <button id="submit">Convert Aspen</button>
      </form>
    );
  }
}