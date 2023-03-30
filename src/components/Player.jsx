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
    let {x,y,xOffset,yOffset,width,height,pacManWalls} = this.props.state;
    let size = 50;
    let left = xOffset - (size / 2);
    let top = yOffset - (size / 2);
    if (pacManWalls) {
      left += ((x % width) + width) % width;
      top += ((y % height) + height) % height;
    }
    return this.getClones(left,top,width,height,size);
  }

  getClones(x,y,width,height,size) {
    let result = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++){
        result.push(this.getMarker(x,y,i,j,width,height,size))
      }
    }
    return result;
  }

  getMarker(x,y,i,j,width,height,size) {
    let top = y;
    if (i > 0) {
      top -= height;
    }
    let left = x;
    if (j > 0) {
      left -= width;
    }
    if (this.isVisible(top,left,width,height,size)) {
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
      }
      return (
        <div key={`player${i}${j}`} className="medium blue circle" style={style}></div>
      );
    }
  }

  isVisible(top,left,width,height,size) {
    return ((top >= 0 && top <= height) || (top + size >= 0 && top + size <= height))
      && ((left >= 0 && left <= width) || (left + size >= 0 && left + size <= width))
  }
}

export default Player;
