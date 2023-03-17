import React from 'react';

class Goal extends React.Component {
  render(props) {
    if (this.props.state.freeze) return (<></>);
    return (
      <>
        {this.getMarker(props)}
      </>
    );
  }

  getMarker(props) {
    let {x,y,goalX,goalY,xOffset,yOffset,pacManWalls} = this.props.state;
    let radius = 100;
    let left = goalX + xOffset - radius;
    let top = goalY + yOffset - radius;
    let screenLeft = x - xOffset;
    let screenTop = y - yOffset;
    if (pacManWalls) {
      left = ((left % window.innerWidth) + window.innerWidth) % window.innerWidth;
      top = ((top % window.innerHeight) + window.innerHeight) % window.innerHeight;
      screenLeft = -xOffset + Math.round(x / window.innerWidth) * window.innerWidth;
      screenTop = -yOffset + Math.round(y / window.innerHeight) * window.innerHeight;
    } else {
      left -= x;
      top -= y;
    }
    if (this.isVisible(screenLeft,screenTop,goalX,goalY,radius*2)) {
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
      }
      return (
        <div className="goal large orange circle" style={style}></div>
      );
    }
  }

  isVisible(screenLeft,screenTop,left,top,size) {
    return ((top >= screenTop && top <= screenTop + window.innerHeight) || (top + size >= screenTop && top + size <= screenTop + window.innerHeight))
      && ((left >= screenLeft && left <= screenLeft + window.innerWidth) || (left + size >= screenLeft && left + size <= screenLeft + window.innerWidth))
  }
}

export default Goal;
