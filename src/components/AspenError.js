import React from 'react'

const AspenError = (props) => {
  return (
    <div className="notification is-danger is-light">
      <button className="delete"></button>
      An <strong>{props.error.type}</strong> error occurred.<br />
      {props.error.message}
    </div>
  );
}

export default AspenError;