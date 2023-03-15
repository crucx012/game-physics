import React from 'react';

class Player extends React.Component {
  render(props) {
    if (this.props.state.freeze) return (<></>);
    return (
      <>
        {this.getMarkers(props)}
      </>
    );
  }

  getMarkers(props) {
    let {x,y,xOffset,yOffset,pacManWalls} = this.props.state;
    let size = 50;
    let left = xOffset - (size / 2);
    let top = yOffset - (size / 2);
    if (pacManWalls) {
      left += ((x % window.innerWidth) + window.innerWidth) % window.innerWidth;
      top += ((y % window.innerHeight) + window.innerHeight) % window.innerHeight;
    }
    return this.getClones(left,top);
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
        <div key={`player${i}${j}`} className="medium blue circle" style={style}></div>
      );
    }
  }

  isVisible(top,left) {
    return ((top >= 0 && top <= window.innerHeight) || (top + 50 >= 0 && top + 50 <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + 50 >= 0 && left + 50 <= window.innerWidth))
  }
}

export default Player;
