export default class ScoreBoard {
  constructor() {
    this._p1 = 0;
    this._ties = 0;
    this._p2 = 0;
  }

  get scores(){
    return {
      p1: this._p1,
      ties: this._ties,
      p2: this._p2
    }
  }

  increaseP1Score() {
    this._p1++;
  }

  increaseP2Score() {
    this._p2++;
  }

  increaseTiesScore() {
    this._ties++;
  }

  resetBoard(){
    this._p1 = 0;
    this._p2 = 0;
    this._ties = 0;
  }
}
