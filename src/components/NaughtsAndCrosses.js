import React, { Component } from 'react';
import Immutable from 'immutable';
import generateUUID from '../utils/helpers';
import GameMenu from './GameMenu';
import GameBoard from './GameBoard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class NaughtsAndCrosses extends Component {
  constructor () {
    super();
    this.state = { currentBoards: Immutable.Map({}) };
    this.index = 0;
  };

  addGame (boardSize) {
    const newBoard = {
      boardSize: Number(boardSize),
      index: this.index,
    };
    this.setState({ currentBoards: this.state.currentBoards.set(this.index++, newBoard) });
  };

  removeGame (index) {
    this.setState({ currentBoards: this.state.currentBoards.delete(index) });
  };

  render () {
    return (
      <div className = "naughtsAndCrosses">
        <GameMenu addGame = { this.addGame.bind(this) }/>
        <div className = "naughtsAndCrosses__boardArea">
          { this.state.currentBoards.valueSeq().map((board) => {
            return <GameBoard
              key = { board.index }
              boardSize = { board.boardSize }
              removeGame = { this.removeGame.bind(this, board.index) }
            />;
          }) }
        </div>
      </div>
    );
  };
};
