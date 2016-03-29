import React, { Component } from 'react';
import Immutable from 'immutable';
import { checkWin, buildBoard } from '../utils/helpers';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Winner from './Winner';
import Tile from './Tile';

export default class GameBoard extends Component {
  constructor (props) {
    super(props);
  };

  componentWillMount () {
    this.resetBoard();
  }

  checkGameState () {
    const gameState = checkWin(this.state.boardModel.toArray(), this.props.boardSize);
    this.setState(prev => ({ boardParams: prev.boardParams.set('winner', gameState) }));
  };

  selectTile (index, event) {
    if (!this.state.boardModel.get(index)) {
      const turn = this.state.boardParams.get('turn') ? 'X' : 'O';
      this.setState(prev => ({
      boardModel: this.state.boardModel.update(index, val => turn),
      boardParams: this.state.boardParams.set('turn', !this.state.boardParams.get('turn')),
    }), this.checkGameState);
    }
  };

  resetBoard () {
    this.setState({
      boardModel: Immutable.Map(buildBoard(this.props.boardSize)),
      boardParams: Immutable.Map({
        winner: undefined,
        turn: false,
      }),
    });
  };

  render () {
    return (
      <div>
        <div className = "naughtsAndCrosses__board--controls">
          <span
            aria-label = "Close Board"
            onClick = { this.props.removeGame.bind(this) }>&#10006;</span>
          { this.state.boardParams.get('winner') ?
            null :
            <span
              aria-label = "Restart Board"
              onClick = { this.resetBoard.bind(this) }>↻</span> }
        </div>
        <div className = "naughtsAndCrosses__board">
          { this.state.boardParams.get('winner') ?
            <Winner
              winner = { this.state.boardParams.get('winner') }
              retry = { this.resetBoard.bind(this) }/> :
            this.state.boardModel.map((value, key) => {
              return <Tile
                selectTile = { this.selectTile.bind(this, key) }
                val = { value }
                key = { key }
                boardSize = { this.props.boardSize }/>;
            })
          }
        </div>
      </div>
    );
  };
};
