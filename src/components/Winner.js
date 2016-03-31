import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Winner extends Component {
  constructor (props) {
    super(props);

    this.retry = this.props.retry.bind(this);
  };

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  };

  render () {
    return (
      <div className = "noughtsAndCrosses__winner">
        { this.props.winner === 'TIE' ?
            <h2>{ `${this.props.winner}!` }</h2> :
            <h2>{ `${this.props.winner} wins!` }</h2> }
        <button type = "button" onClick = { this.retry }>Try again?</button>
      </div>
    );
  };
};
