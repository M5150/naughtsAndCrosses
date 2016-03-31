import React, { Component } from 'react';
import Immutable from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';
import GameMenu from './GameMenu';
import GameBoard from './GameBoard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class NaughtsAndCrosses extends Component {
  constructor () {
    super();
    this.state = { boards: Immutable.Map({}) };
    this.index = 0;

    this.addGame = this.addGame.bind(this);
    this.removeGame = this.removeGame.bind(this);
  };

  shouldComponentUpdate (nextProps, nextState) {
    return !Immutable.is(this.state.boards, nextState.boards);
  };

  addGame (boardSize) {
    const newBoard = Immutable.Map({
      boardSize: Number(boardSize),
      index: this.index,
    });
    this.setState({ boards: this.state.boards.set(this.index++, newBoard) });
  };

  removeGame (index) {
    this.setState(prev => ({ boards: prev.boards.delete(index) }));
  };

  generateBoards () {
    const results = [];
    this.state.boards.forEach((value, key) => {
      results.push(<GameBoard
        key = { value.get('index') }
        index = { value.get('index') }
        boardSize = { value.get('boardSize') }
        removeGame = { this.removeGame }/>);
    });
    return results;
  };

  render () {
    return (
      <div className = "naughtsAndCrosses">
        <GameMenu addGame = { this.addGame }/>
        <ReactCSSTransitionGroup
          transitionName = "board__transition"
          component = "div"
          className = "naughtsAndCrosses__boardArea"
          transitionEnterTimeout = { 500 }
          transitionLeaveTimeout = { 300 }>
          { this.state.boards ? this.generateBoards() : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  };
};
