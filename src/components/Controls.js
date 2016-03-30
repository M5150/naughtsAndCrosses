import React, { Component } from 'react';
import Immutable from 'immutable';

export default class Controls extends Component {
  constructor (props) {
    super(props);
  };

  render () {
    const { winner, resetBoard, removeGame } = this.props;
    return (
      <div className = "naughtsAndCrosses__board--controls">
        <span onClick = { removeGame }>&#10006;</span>
        { !winner ?
          <span onClick = { resetBoard }>↻</span> : null }
      </div>
    );
  };
};