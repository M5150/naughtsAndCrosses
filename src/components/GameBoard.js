import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { checkWin, buildBoard } from '../utils/helpers';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Winner from './Winner';
import Tile from './Tile';
import Controls from './Controls';

export default class GameBoard extends Component {
  constructor (props) {
    super(props);
  };

  componentWillMount () {
    this.resetBoard();
  };

  checkGameState () {
    const gameState = checkWin(this.state.boardModel.toArray(), this.props.boardSize);
    this.setState(prev => ({ boardParams: prev.boardParams.set('winner', gameState) }));
  };

  selectTile (index, event) {
    const { boardParams, boardModel } = this.state;
    if (!boardModel.get(index)) {
      event.target.classList.add('boardTile--active');
      const turn = boardParams.get('turn') ? 'X' : 'O';
      this.setState(prev => ({
        boardModel: boardModel.update(index, val => turn),
        boardParams: boardParams.set('turn', !boardParams.get('turn')),
      }), this.checkGameState);
    }
  };

  generateTiles () {
    const results = [];
    this.state.boardModel.forEach((value, key) => {
      results.push(<Tile
        selectTile = { this.selectTile.bind(this, key) }
        preview = { this.state.boardParams.get('turn') ? 'X' : 'O' }
        val = { value }
        key = { key }
        boardSize = { this.props.boardSize }/>);
    });
    return results;
  };

  resetBoard () {
    if (this.state) {
      let tiles = [...ReactDOM.findDOMNode(this).querySelectorAll('.boardTile')];
      tiles.forEach(node => node.classList.remove('boardTile--active'));
    }

    this.setState({
      boardModel: Immutable.Map(buildBoard(this.props.boardSize)),
      boardParams: Immutable.Map({
        winner: undefined,
        turn: false,
      }),
    });
  };

  render () {
    const { boardParams, boardModel } = this.state;
    return (
      <div className = "naughtsAndCrosses__board">
        <Controls
          removeGame = { this.props.removeGame.bind(this) }
          resetBoard = { this.resetBoard.bind(this) }
          winner = { boardParams.get('winner') }/>
        <div className = "naughtsAndCrosses__board--container">
          { boardParams.get('winner') ?
            <Winner
              winner = { boardParams.get('winner') }
              retry = { this.resetBoard.bind(this) }/> :
              this.generateTiles() }
        </div>
      </div>
    );
  };
};
