import React from 'react';

import Form       from './components/Form.js'
import Graph      from './components/Graph.js'
import ResultData from './components/ResultData.js'

const Error = (props) => {
  return (
    <div class="error">
      <p className="error">
        <strong>{props.error.type}</strong>: {props.error.message}
      </p>
    </div>
  );
}

export default class App extends React.Component {
  state = {
    data: {},
  };
  setResult = (resultData) => {
    this.setState(prevState => ({ data: resultData }));
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.setResult} />
        {
          this.state.data.type === "success" &&
            <>
              <ResultData result={this.state.data} />
              <Graph data={this.state.data} />
            </>
        }
        {
          this.state.data.type === "error" &&
            <Error error={this.state.data.error} />
        }
      </div>
    );
  }
}