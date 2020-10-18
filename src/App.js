import React from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import AspenForm  from './components/AspenForm.js'
import AspenError from './components/AspenError.js'
import Graph      from './components/Graph.js'
import Navbar     from './components/Navbar.js'
import ResultData from './components/ResultData.js'

export default class App extends React.Component {
  state = {
    data: {},
  };
  setResult = (resultData) => {
    this.setState(prevState => ({ data: resultData }));
  };
  render() {
    return (
      <div className="container main">
        <Navbar />
        <div className="columns">
          <div className="column is-half">
            <AspenForm onSubmit={this.setResult} error={this.state.data.type === "error"} />
          </div>
          <div className="column">
            {
              this.state.data.type === "success" &&
                <>
                  <Graph data={this.state.data} />
                  <ResultData result={this.state.data} />
                </>
            }
            {
              this.state.data.type === "error" &&
                <AspenError error={this.state.data.error} />
            }
          </div>
        </div>
      </div>
    );
  }
}