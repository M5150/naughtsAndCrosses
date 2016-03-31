import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { checkWin, buildBoard } from '../utils/helpers';
import Winner from './Winner';
import Tile from './Tile';
import Controls from './Controls';

export default class GameBoard extends Component {
  constructor (props) {
    super(props);

    this.removeGame = this.props.removeGame.bind(this, this.props.index);
    this.resetBoard = this.resetBoard.bind(this);
  };

  shouldComponentUpdate (nextProps, nextState) {
    return !(Immutable.is(this.state.boardModel, nextState.boardModel) &&
      Immutable.is(this.state.boardParams, nextState.boardParams) &&
      !shallowCompare(this, nextProps));
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
          removeGame = { this.removeGame }
          resetBoard = { this.resetBoard }
          winner = { boardParams.get('winner') }/>
        <div className = "naughtsAndCrosses__board--container">
          { boardParams.get('winner') ?
            <Winner
              winner = { boardParams.get('winner') }
              retry = { this.resetBoard }/> :
              this.generateTiles() }
        </div>
      </div>
    );
  };
};
