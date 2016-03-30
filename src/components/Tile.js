import React, { Component } from 'react';
import Immutable from 'immutable';

export default class Tile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tileState: Immutable.Map({ mouseOver: false }),
    };
  };

  mouseOverHandler () {
    this.setState({ tileState: this.state.tileState.set('mouseOver', true) });
  };

  mouseOutHandler () {
    this.setState({ tileState: this.state.tileState.set('mouseOver', false) });
  };

  render () {
    const { selectTile, boardSize, val, preview } = this.props;
    return (
      <div
        onClick = { selectTile }
        ref = "tile"
        onMouseEnter = { this.mouseOverHandler.bind(this) }
        onMouseLeave = { this.mouseOutHandler.bind(this) }
        className = { `boardTile boardTile--${boardSize}` }>
          { !val && this.state.tileState.get('mouseOver') ? preview : val }
      </div>
    );
  };
};
