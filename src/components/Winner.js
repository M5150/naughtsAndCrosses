import React, { Component } from 'react';

export default class Winner extends Component {
  constructor (props) {
    super(props);
  };

  render () {
    return (
      <div className = "naughtsAndCrosses__winner">
        { this.props.winner === 'TIE' ?
            <h2>{ `${this.props.winner}!` }</h2> :
            <h2>{ `${this.props.winner} wins!` }</h2> }
        <button type = "button" onClick = { this.props.retry.bind(this) }>Try again?</button>
      </div>
    );
  };
};
