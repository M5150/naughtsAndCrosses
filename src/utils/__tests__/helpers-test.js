jest.unmock('../helpers');
import { checkWin, buildBoard } from '../helpers';

describe('checkWin', () => {
  it('should return a winner for a solved board: X', () => {
    const board = ['X', 'X', 'X', 'O', 'O', undefined, undefined, undefined, undefined];
    expect(checkWin(board, 3)).toBe('X');
  });

  it('should return a winner for a solved board: O', () => {
    const board = ['O', 'O', 'O', 'X', 'X', undefined, undefined, undefined, undefined];
    expect(checkWin(board, 3)).toBe('O');
  });

  it('should handle minor diagonals', () => {
    const board = [undefined, undefined, 'O', undefined, 'O', 'X', 'O', undefined, 'X'];
    expect(checkWin(board, 3)).toBe('O');
  });

  it('should handle major diagonal', () => {
    const board = ['O', 'X', undefined, 'X', 'O', undefined, undefined, undefined, 'O'];
    expect(checkWin(board, 3)).toBe('O');
  });

  it('should handle horizontal', () => {
    const board = [undefined, 'O', undefined, 'X', 'X', 'X', 'O', 'O', undefined];
    expect(checkWin(board, 3)).toBe('X');
  });

  it('should handle vertical', () => {
    const board = ['O', 'X', undefined, 'O', 'X', undefined, undefined, 'X', 'O'];
    expect(checkWin(board, 3)).toBe('X');
  });

  it('should return TIE if no winner is found', () => {
    const board = ['X', 'X', 'O', 'O', 'X', 'X', 'X', 'O', 'O'];
    expect(checkWin(board, 3)).toBe('TIE');
  });

  it('should handle boards of any size', () => {
    const board = [undefined, undefined, undefined, undefined, 'O', undefined, undefined, 'O', undefined, undefined, undefined, undefined, undefined, undefined, 'O', 'X', 'X', 'O', undefined, undefined, undefined, undefined, undefined, undefined, 'X', 'O', undefined, 'O', 'X', undefined, undefined, undefined, undefined, undefined, 'X', undefined, 'X', 'O', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'O', 'X', undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'X', 'O', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'O', 'X', undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'X', 'O', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'O', 'X', undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'X', 'O', undefined, undefined];
    expect(checkWin(board, 10)).toBe('O');
  });
});

describe('buildBoard', () => {
  it('should build a board model', () => {
    const board = { 1: undefined, 2: undefined, 3: undefined, 4: undefined, 5: undefined, 6: undefined, 7: undefined, 8: undefined, 9: undefined };
    expect(buildBoard(3)).toEqual(board);
  });

  it('should build a board model of any size', () => {
    const board = { 1: undefined, 2: undefined, 3: undefined, 4: undefined, 5: undefined, 6: undefined, 7: undefined, 8: undefined, 9: undefined, 10: undefined, 11: undefined, 12: undefined, 13: undefined, 14: undefined, 15: undefined, 16: undefined };
    expect(buildBoard(4)).toEqual(board);
  });
})
