import React, { Component } from 'react';
import Immutable from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Tile extends Component {
  constructor (props) {
    super(props);
  };

  render () {
    const { selectTile, boardSize, val } = this.props;
    return (
      <div
        onClick = { selectTile.bind(this) }
        className = { `boardTile boardTile--${boardSize}` }>{ val }
      </div>
    );
  };
};
