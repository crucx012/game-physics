import React from 'react';
import Player from './components/Player.jsx';
import Panel from './components/Panel.jsx';
import './App.css';

let interval;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      directions: [0, 0],
      x: 0,
      y: 0,
      xOffset: (window.innerWidth / 2) - (50 / 2),
      yOffset: (window.innerHeight / 2) - (50 / 2),
      move: 5,
      pacManWalls: true,
      panelVisible: false
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.move = this.move.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
  }

  handleKeyDown(event) {
    let {directions: newDirections} = this.state;
    if (event.key === 'w' || event.key === "ArrowUp") {
      newDirections[1]++;
    } else if (event.key === 'a' || event.key === "ArrowLeft") {
      newDirections[0]--;
    } else if (event.key === 's' || event.key === "ArrowDown") {
      newDirections[1]--;
    } else if (event.key === 'd' || event.key === "ArrowRight") {
      newDirections[0]++;
    }
    this.setState({
      directions: newDirections
    })
  }

  move() {
    let {x: newX,y: newY, move, directions} = this.state;
    newX += move * directions[0];
    newY -= move * directions[1];
    const newXOffset = (window.innerWidth / 2) - (50 / 2);
    const newYOffset = (window.innerHeight / 2) - (50 / 2);
    this.setState({
      x: newX,
      y: newY,
      xOffset: newXOffset,
      yOffset: newYOffset
    })
  }

  togglePanel(isVisible) {
    this.setState({
      panelVisible: isVisible
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
        togglePanel={this.togglePanel}/>
        <Player
        state={this.state} />
      </div>
    )
  }
}

export default App;
