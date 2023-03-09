import React from 'react';

class Player extends React.Component {
  render(props) {
    let markers = this.getMarkers(props);
    if (this.props.state.freeze) return (<></>);
    return (
      <>
        {markers}
      </>
    );
  }

  getMarkers(props) {
    let {x,y,xOffset,yOffset,pacManWalls} = this.props.state;
    let size = 50;
    x += xOffset - (size / 2);
    y += yOffset - (size / 2);
    if (pacManWalls) {
      x = ((x % window.innerWidth) + window.innerWidth) % window.innerWidth;
      y = ((y % window.innerHeight) + window.innerHeight) % window.innerHeight;
    }
    return this.getClones(x,y);
  }

  getClones(x,y) {
    let result = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++){
        result.push(this.getMarker(x,y,i,j))
      }
    }
    return result;
  }

  getMarker(x,y,i,j) {
    let top = y;
    if (i > 0) {
      top -= window.innerHeight;
    }
    let left = x;
    if (j > 0) {
      left -= window.innerWidth;
    }
    if (this.isVisible(top,left)) {
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
      }
      return (
        <div key={`player${i}${j}`} className="blue circle" style={style}></div>
      );
    }
  }

  isVisible(top,left) {
    return ((top >= 0 && top <= window.innerHeight) || (top + 50 >= 0 && top + 50 <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + 50 >= 0 && left + 50 <= window.innerWidth))
  }
}

export default Player;
