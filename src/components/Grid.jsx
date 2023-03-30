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
    let {x,y,xOffset,yOffset,width,height,pacManWalls} = this.props.state;
    let size = 10;
    let left = xOffset - (Math.round(xOffset / 100) * 100) - (size / 2);
    let top = yOffset - (Math.round(yOffset / 100) * 100) - (size / 2)
    if (!pacManWalls) {
      left += -x + (Math.round(x / 100) * 100);
      top += -y + (Math.round(y / 100) * 100);
    }
    return this.getClones(left, top, width, height, size);
  }

  getClones(x,y,width,height,size) {
    let result = [];
    let spacing = 100;
    for (let i = 0; i <= width; i+=spacing) {
      for (let j = 0; j <= height; j+=spacing) {
        result.push(this.getMarker(x+i,y+j,width,height,size));
      }
    }
    return result;
  }

  getMarker(x, y, width, height, size) {
    let result = [];
    if (this.isVisible(x,y,width,height,size)) {
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

  isVisible(left,top,width,height,size) {
    return ((top >= 0 && top <= height) || (top + size >= 0 && top + size <= height))
      && ((left >= 0 && left <= width) || (left + size >= 0 && left + size <= width))
  }
}

export default Grid;
