import React, { Component } from 'react';
import Immutable from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

export default class Controls extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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