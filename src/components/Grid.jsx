import React from 'react';

class Grid extends React.Component {
  render(props) {
    if (this.props.state.freeze) return (<></>);
    return (
      <div>
        {this.getMarkers(props)}
      </div>
    );
  }

  getMarkers(props) {
    let {x,y,xOffset,yOffset,pacManWalls} = this.props.state;
    let size = 10;
    let left = xOffset - (Math.round(xOffset / 100) * 100) - (size / 2);
    let top = yOffset - (Math.round(yOffset / 100) * 100) - (size / 2)
    if (!pacManWalls) {
      left += -x + (Math.round(x / 100) * 100);
      top += -y + (Math.round(y / 100) * 100);
    }
    return this.getClones(left, top, size);
  }

  getClones(x,y,size) {
    let result = [];
    let spacing = 100;
    for (let i = 0; i < window.innerWidth; i++) {
      for (let j = 0; j < window.innerHeight; j++) {
        result.push(this.getMarker(x+i,y+j,size));
        j += spacing - 1;
      }
      i += spacing - 1;
    }
    return result;
  }

  getMarker(x, y, size) {
    let result = [];
    if (this.isVisible(x,y,size)) {
      const style = {
        'marginTop': `${y}px`,
        'marginLeft': `${x}px`,
      }
      result.push(
        <div key={`grid${x}${y}`} className="small gray circle" style={style}></div>
      );
    }
    return result;
  }

  isVisible(left,top,size) {
    return ((top >= 0 && top <= window.innerHeight) || (top + size >= 0 && top + size <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + size >= 0 && left + size <= window.innerWidth))
  }
}

export default Grid;
