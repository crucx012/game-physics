import React from 'react';
import Panel from './components/Panel.jsx';
import Window from './components/Window.jsx';
import './App.css';

let interval;

class App extends React.Component {
  constructor(props){
    super(props);
    const width = Math.floor(window.innerWidth / 100) * 100;
    const height = Math.floor(window.innerHeight / 100) * 100;
    this.state = {
      directions: [0, 0],
      x: 0,
      y: 0,
      xOffset: width / 2,
      yOffset: height / 2,
      width: width,
      height: height,
      goalX: this.getRandomInt(20000) - 10000,
      goalY: this.getRandomInt(20000) - 10000,
      move: 1,
      moveMax: 30,
      freeze: false,
      freezeUntil: new Date(),
      pacManWalls: true,
      panelVisible: false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.move = this.move.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.togglePacManWalls = this.togglePacManWalls.bind(this);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  handleKeyDown(event) {
    let {directions: newDirections} = this.state;
    if (event.key === 'w' || event.key === "ArrowUp") {
      newDirections[1]++;
      newDirections[1] = Math.min(this.state.moveMax,newDirections[1]);
    } else if (event.key === 'a' || event.key === "ArrowLeft") {
      newDirections[0]--;
      newDirections[0] = Math.max(-this.state.moveMax,newDirections[0]);
    } else if (event.key === 's' || event.key === "ArrowDown") {
      newDirections[1]--;
      newDirections[1] = Math.max(-this.state.moveMax,newDirections[1]);
    } else if (event.key === 'd' || event.key === "ArrowRight") {
      newDirections[0]++;
      newDirections[0] = Math.min(this.state.moveMax,newDirections[0]);
    }
    this.setState({
      directions: newDirections
    })
  }

  move() {
    let {width, height, freeze, freezeUntil} = this.state;
    const newWidth = Math.floor(window.innerWidth / 100) * 100;
    const newHeight = Math.floor(window.innerHeight / 100) * 100;
    if (width !== newWidth || height !== newHeight) {
      this.pause(newWidth, newHeight);
      return;
    } else if (freeze) {
      if (new Date().getTime() >= freezeUntil.getTime()) {
        this.setState({
          freeze: false
        })
      } else {
        return;
      }
    }
    this.handleMove();
  }

  handleMove() {
    let {x: newX, y: newY, move, directions} = this.state;
    newX += move * directions[0];
    newY -= move * directions[1];
    this.setState({
      freeze: false,
      x: newX,
      y: newY
    })
  }

  pause(newWidth, newHeight) {
    var date = new Date();
    date.setMilliseconds(date.getMilliseconds() + 500);
    this.setState({
      freeze: true,
      freezeUntil: date,
      xOffset: newWidth / 2,
      yOffset: newHeight / 2,
      width: newWidth,
      height: newHeight
    });
  }

  togglePanel(isVisible) {
    this.setState({
      panelVisible: isVisible
    })
  }

  togglePacManWalls() {
    const newVal = !this.state.pacManWalls
    this.setState({
      pacManWalls: newVal
    })
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
    interval = setInterval(() => {
      this.move()
    }, 15);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    clearInterval(interval);
  }

  render(){
    return (
      <div className="App">
        <Panel
        state={this.state}
        togglePanel={this.togglePanel}
        togglePacManWalls={this.togglePacManWalls}/>
        <Window
        state={this.state}/>
      </div>
    )
  }
}

export default App;
