import React, { Component } from 'react';
import Immutable from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

export default class Tile extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  };

  render () {
    const { selectTile, boardSize, val, preview } = this.props;
    return (
      <div
        onClick = { selectTile }
        className = { `boardTile boardTile--${boardSize} ${val ? `boardTile--active` : `boardTile--inactive`}` }>
        { val || preview }
      </div>
    );
  };
};
