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
    const widthMod = Math.round((width / 15) / 100) * 100;
    const heightMod = Math.round((height / 15) / 100) * 100;
    const mod = Math.max(Math.max(widthMod,heightMod),100);
    let left = xOffset - (Math.round(xOffset / mod) * mod) - (size / 2);
    let top = yOffset - (Math.round(yOffset / mod) * mod) - (size / 2)
    if (!pacManWalls) {
      left += -x + (Math.round(x / mod) * mod);
      top += -y + (Math.round(y / mod) * mod);
    }
    return this.getClones(left, top, width, height, mod, size);
  }

  getClones(x,y,width,height,mod,size) {
    let result = [];
    let spacing = 100;
    for (let i = 0; i <= width; i+=spacing) {
      for (let j = 0; j <= height; j+=spacing) {
        if (i % mod === 0 && j % mod === 0) {
          result.push(this.getMarker(x+i,y+j,width,height,size));
        }
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
