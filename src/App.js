import React from 'react';
import Player from './components/Player.jsx';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      move: 10,
      pacManWalls: true
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    let {x: newX,y: newY} = this.state;
    if (event.key === 'w' || event.key === "ArrowUp") {
      newY -= this.state.move;
    } else if (event.key === 'a' || event.key === "ArrowLeft") {
      newX -= this.state.move;
    } else if (event.key === 's' || event.key === "ArrowDown") {
      newY += this.state.move;
    } else if (event.key === 'd' || event.key === "ArrowRight") {
      newX += this.state.move;
    }
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    newX = (newX + maxWidth) % maxWidth;
    newY = (newY + maxHeight) % maxHeight;
    this.setState({
      x: newX,
      y: newY
    })
    console.log(event.key)
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
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
