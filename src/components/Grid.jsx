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
    let {x,y} = this.props.state;
    let size = 10;
    let xPage = Math.abs(((Math.round(x / window.innerWidth) - .5) * window.innerWidth) % 100);
    let yPage = Math.abs(((Math.round(y / window.innerHeight) - .5) * window.innerHeight) % 100);
    let left = xPage - (size / 2);
    let top = yPage - (size / 2);
    return this.getClones(left, top);
  }

  getClones(x,y) {
    let result = [];
    let spacing = 100;
    for (let i = 0; i < window.innerWidth; i++) {
      for (let j = 0; j < window.innerHeight; j++) {
        result.push(this.getMarker(x+i,y+j));
        j += spacing - 1;
      }
      i += spacing - 1;
    }
    return result;
  }

  getMarker(x, y) {
    let result = [];
    if (this.isVisible(x,y)) {
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

  isVisible(left,top) {
    return ((top >= 0 && top <= window.innerHeight) || (top + 10 >= 0 && top + 10 <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + 10 >= 0 && left + 10 <= window.innerWidth))
  }
}

export default Grid;
