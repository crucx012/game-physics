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
    let {x,y,goalX,goalY,xOffset,yOffset,pacManWalls} = this.props.state;
    let radius = 25;
    const a = goalX - x;
    const b = goalY - y;
    const c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    if (c > 100) {
      const deg = Math.atan2(b, a) * 180 / Math.PI + 90;
      let left = xOffset - radius;
      let top = yOffset - (radius / 2);
      let transform = `rotate(${deg}deg)`;
      if (!pacManWalls) {
        transform += ` translateY(-50px)`;
      } else {
        const distance = this.getVariableDistance(this.props.state);
        transform += ` translateY(${distance}px)`;
      }
      const style = {
        'marginTop': `${top}px`,
        'marginLeft': `${left}px`,
        'transform': transform
      }
      return (
        <div className="triangle" style={style}></div>
      );
    }
  }

  getVariableDistance(state) {
    let {x,y,goalX,goalY,xOffset,yOffset,width,height} = this.props.state;
    let rise = -(goalY - y);
    let run = goalX - x;
    let slope = rise / run;
    let pageSlope = height / width;
    let distance = 0;
    if (rise === 0 ) {
      distance = -(xOffset - 50);
    } else if (run === 0) {
      distance = -(yOffset - 50);
    } else if ((slope > pageSlope && slope > 0)
      || (-slope > pageSlope && slope < 0)) {
      distance = -Math.sqrt(Math.pow(yOffset,2) + Math.pow(yOffset * (1 / slope),2)) + 50;
    } else {
      distance = -Math.sqrt(Math.pow(xOffset,2) + Math.pow(xOffset * slope,2)) + 50;
    }
    return distance;
  }
}

export default Guide;
