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
    let screenLeft = x - xOffset;
    let screenTop = y - yOffset;
    if (pacManWalls) {
      screenLeft = -xOffset + Math.round(x / window.innerWidth) * window.innerWidth;
      screenTop = -yOffset + Math.round(y / window.innerHeight) * window.innerHeight;
    }
    let left = goalX - radius - screenLeft;
    let top = goalY - radius - screenTop;
    if (this.isVisible(left,top,radius*2)) {
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
      }
      return (
        <div className="goal large orange circle" style={style}></div>
      );
    }
  }

  isVisible(left,top,size) {
    return ((top >= 0 && top <= window.innerHeight) || (top + size >= 0 && top + size <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + size >= 0 && left + size <= window.innerWidth))
  }
}

export default Goal;
