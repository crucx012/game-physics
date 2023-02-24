import React from 'react';

class Player extends React.Component {
  render(props) {
    const height = Math.min(50,window.innerHeight - this.props.Y);
    const width = Math.min(50,window.innerWidth - this.props.X);
    console.log(width,height)
    const style = {
      'height': `${height}px`,
      'width': `${width}px`,
      'margin-top': `${this.props.Y}px`,
      'margin-left': `${this.props.X}px`
    }
    return (
      <div className="blue" style={style}></div>
    );
  }
}

export default Player;
