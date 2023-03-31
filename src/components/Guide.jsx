import React from 'react';

class Guide extends React.Component {
  render(props) {
    if (this.props.state.freeze) return (<></>);
    return (
      <>
        {this.getMarker(props)}
      </>
    );
  }

  getMarker(props) {
    let {x,y,goalX,goalY,xOffset,yOffset,width,height} = this.props.state;
    let radius = 25;
    const a = goalX - x;
    const b = goalY - y;
    const c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    const deg = Math.atan2(b, a) * 180 / Math.PI + 90;
    let left = xOffset - radius;
    let top = yOffset - (radius / 2);
    if (this.isVisible(left,top,width,height,radius*2) && c > 125) {
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
        'transform': `rotate(${deg}deg) translateY(-50px)`
      }
      return (
        <div className="triangle" style={style}></div>
      );
    }
  }

  isVisible(left,top,width,height,size) {
    return ((top >= 0 && top <= height) || (top + size >= 0 && top + size <= height))
      && ((left >= 0 && left <= width) || (left + size >= 0 && left + size <= width))
  }
}

export default Guide;
