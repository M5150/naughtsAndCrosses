import React, { Component } from 'react';
import Immutable from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

export default class GameMenu extends Component {
  constructor (props) {
    super(props);
    this.state = { menuState: Immutable.Map({ boardSize: '3' }) };

    this.selectBoardSize = this.selectBoardSize.bind(this);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !(!shallowCompare(this, nextProps) &&
      Immutable.is(this.state.menuState, nextState.menuState));
  };

  selectBoardSize (event) {
    this.setState({ menuState: this.state.menuState.set('boardSize', event.target.value) });
  };

  render () {
    const { addGame } = this.props;
    return (
      <div className = "noughtsAndCrosses__menu">
        <select
          onChange = { this.selectBoardSize }>
          <option value = "3">Board Size</option>
          <option value = "3">3</option>
          <option value = "4">4</option>
          <option value = "5">5</option>
          <option value = "6">6</option>
          <option value = "7">7</option>
          <option value = "8">8</option>
          <option value = "9">9</option>
          <option value = "10">10</option>
        </select>
        <button
          type = "button"
          onClick = { addGame.bind(this, this.state.menuState.get('boardSize')) }>Add Game</button>
      </div>
    );
  };
};
