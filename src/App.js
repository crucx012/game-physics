import React from 'react';
import Player from './components/Player.jsx';
import './App.css';

let interval = {};

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keys: [0, 0],
      x: 0,
      y: 0,
      move: 5,
      pacManWalls: true
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.move = this.move.bind(this);
  }

  handleKeyDown(event) {
    let {keys: newKeys} = this.state;
    if (event.key === 'w' || event.key === "ArrowUp") {
      newKeys[1]--;
    } else if (event.key === 'a' || event.key === "ArrowLeft") {
      newKeys[0]--;
    } else if (event.key === 's' || event.key === "ArrowDown") {
      newKeys[1]++;
    } else if (event.key === 'd' || event.key === "ArrowRight") {
      newKeys[0]++;
    }
    this.setState({
      keys: newKeys
    })
  }

  move() {
    let {x: newX,y: newY, move, keys} = this.state;
    newX += move * keys[0];
    newY += move * keys[1];
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    if (this.state.pacManWalls) {
      newX = (newX + maxWidth) % maxWidth;
      newY = (newY + maxHeight) % maxHeight;
    }
    this.setState({
      x: newX,
      y: newY
    })
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
    interval = setInterval(() => {
      this.move()
    }, 100);
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    clearInterval(interval);
  }

  render(){
    return (
      <div className="App">
        <Player
        X={this.state.x}
        Y={this.state.y} />
      </div>
    )
  }
}

export default App;
