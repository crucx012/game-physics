import React from 'react';

class Player extends React.Component {
  render(props) {
    let markers = this.getMarkers(props);
    return (
      <>
        {markers}
      </>
    );
  }

  getMarkers(props) {
    let result = [];
    let {x,y,pacManWalls} = this.props.state;
    if (pacManWalls) {
      x = ((x % window.innerWidth) + window.innerWidth) % window.innerWidth;
      y = ((y % window.innerHeight) + window.innerHeight) % window.innerHeight;
    }
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++){
        if (i > 0) {
          y -= window.innerHeight;
        }
        if (j > 0) {
          x -= window.innerWidth;
        }
        const style = {
          'marginTop': `${y}px`,
          'marginLeft': `${x}px`,
        }
        if (this.isVisible(y,x)) {
          result.push(<div key={`player${i}${j}`} className="blue circle" style={style}></div>)
        }
      }
    }
    return result;
  }

  isVisible(top,left) {
    return ((top >= 0 && top <= window.innerHeight) || (top + 50 >= 0 && top + 50 <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + 50 >= 0 && left + 50 <= window.innerWidth))
  }
}

export default Player;
