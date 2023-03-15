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
    return this.getClones(left,top,size);
  }

  getClones(x,y,size) {
    let result = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++){
        result.push(this.getMarker(x,y,i,j,size))
      }
    }
    return result;
  }

  getMarker(x,y,i,j,size) {
    let top = y;
    if (i > 0) {
      top -= window.innerHeight;
    }
    let left = x;
    if (j > 0) {
      left -= window.innerWidth;
    }
    if (this.isVisible(top,left,size)) {
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
      }
      return (
        <div key={`player${i}${j}`} className="medium blue circle" style={style}></div>
      );
    }
  }

  isVisible(top,left,size) {
    return ((top >= 0 && top <= window.innerHeight) || (top + size >= 0 && top + size <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + size >= 0 && left + size <= window.innerWidth))
  }
}

export default Player;
