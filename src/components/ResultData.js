import React from 'react'
import Clipboard from 'react-clipboard.js';

const ResultData = (props) => (
  <div style={{width: '300px'}}>
    {/*<textarea cols="70" rows="8" value={JSON.stringify(props.result.json)} />*/}

    {props.result.json &&
      <Clipboard data-clipboard-text={JSON.stringify(props.result.json)}>Copy JSON</Clipboard>
    }
    {props.result.cypher &&
      <Clipboard data-clipboard-text={props.result.cypher}>Copy Cypher</Clipboard>
    }
    {props.result.gexf &&
      <Clipboard data-clipboard-text={props.result.gexf}>Copy GEXF</Clipboard>
    }
  </div>
);

export default ResultData