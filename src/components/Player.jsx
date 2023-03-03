import React from 'react';

class Player extends React.Component {
  render(props) {
    let markers = this.getMarkers(props);
    return (
      <>
        {markers}
      </>
    );
  }

  getMarkers(props) {
    let result = [];
    let {X,Y,PacManWalls} = this.props;
    if (PacManWalls) {
      X = ((X % window.innerWidth) + window.innerWidth) % window.innerWidth;
      Y = ((Y % window.innerHeight) + window.innerHeight) % window.innerHeight;
    }
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++){
        const size = 50;
        let top = Y;
        if (i > 0) {
          top -= window.innerHeight;
        }
        let left = X;
        if (j > 0) {
          left -= window.innerWidth;
        }
        const style = {
          'height': `${size}px`,
          'width': `${size}px`,
          'marginTop': `${top}px`,
          'marginLeft': `${left}px`,
          'borderRadius': `50%`
        }
        if (this.isVisible(top,left,size)) {
          result.push(<div key={`player${i}${j}`} className="blue" style={style}></div>)
        }
      }
    }
    return result;
  }

  isVisible(top,left,size) {
    return ((top >= 0 && top <= window.innerHeight) || (top + size >= 0 && top + size <= window.innerHeight))
      && ((left >= 0 && left <= window.innerWidth) || (left + size >= 0 && left + size <= window.innerWidth))
  }
}

export default Player;
