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
    let {x,y,goalX,goalY,xOffset,yOffset,pacManWalls,width,height} = this.props.state;
    let radius = 100;
    let screenLeft = x - xOffset;
    let screenTop = y - yOffset;
    if (pacManWalls) {
      screenLeft = -xOffset + Math.round(x / width) * width;
      screenTop = -yOffset + Math.round(y / height) * height;
    }
    let left = goalX - radius - screenLeft;
    let top = goalY - radius - screenTop;
    if (this.isVisible(left,top,width,height,radius*2)) {
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
      }
      return (
        <div className="goal large orange circle" style={style}></div>
      );
    }
  }

  isVisible(left,top,width,height,size) {
    return ((top >= 0 && top <= height) || (top + size >= 0 && top + size <= height))
      && ((left >= 0 && left <= width) || (left + size >= 0 && left + size <= width))
  }
}

export default Goal;
