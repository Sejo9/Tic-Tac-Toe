export default class ScoreBoard {
  constructor() {
    this._X = 0;
    this._ties = 0;
    this._O = 0;
  }

  get scores(){
    return {
      p1: this._X,
      ties: this._ties,
      p2: this._O
    }
  }

  increaseXScore() {
    this._X++;
  }

  increaseOScore() {
    this._O++;
  }

  increaseTiesScore() {
    this._ties++;
  }

  resetBoard(){
    this._X = 0;
    this._O = 0;
    this._ties = 0;
  }
}
