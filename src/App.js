import React, { Component } from 'react';
import './App.css';

const W = 500, H = 500; // Size of game
const R = 20; // Radius of ball
const PW = 10, PH = 100; // Size of paddle

export default class App extends Component {
  constructor(props) {
    super(props);
    this.initGame(false);
  }

  initGame(useSetState) {
    this.state = {
      ball: {
        x: W/2 - R,
        y: H/2 - R,
        dx: Math.random() * -3 - 2,
        dy: Math.random() * 6 - 3,
      },
      left: W/2 - PH/2,
      right: W/2 - PH/2,
    };
    if(useSetState) {
      this.setState(this.state);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.gameLoop(), 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onMouseMove(e) {
    this.setState({left: e.clientY - PH});
  }

  gameLoop() {
    this.updateBall();
    // For one player game keep computer player paddle centered on ball
    this.setState({ right: this.state.ball.y + R - PH/2 });
  }

  updateBall() {
    var {x, y, dx, dy} = this.state.ball;
    var l = this.state.left, r = this.state.right;
    if(x <= 2*PW && y + 2*R >= l && y <= l + PH) {
      dx = -dx; // Hit left paddle
    } else if(x + 2*R >= W - 2*PW && y + 2*R >= r && y <= r + PH) {
      dx = -dx; // Hit right paddle
    } else if(x <= 0) {
      // TODO add point for right
      dx = -dx
    } else if(x + 2*R >= W) {
      // TODO add point for left
      dx = -dx
    }
    if(y <= 0 || y + 2*R >= H) {
      dy = -dy; // Hit top/bottom
    }
    this.setState({ ball: { x: x + dx, y: y + dy, dx: dx, dy: dy } });
  }

  render() {
    return (
      <div className="board" onMouseMove={e => this.onMouseMove(e)}>
        <div className="paddle-left"
          style={{top: this.state.left+'px'}}></div>
        <div className="paddle-right" 
          style={{top: this.state.right+'px'}}></div>
        <div className="ball"
          style={{top: this.state.ball.y+'px', left: this.state.ball.x+'px'}}>
        </div>
      </div>
    );
  }
}
