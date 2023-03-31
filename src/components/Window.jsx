import React from 'react';
import Grid from './Grid.jsx';
import Goal from './Goal.jsx';
import Player from './Player.jsx';
import Guide from './Guide.jsx';

class Window extends React.Component {
  render() {
    let {state} = this.props;
    return this.getVisibleWindow(state)
  }

  getVisibleWindow(state) {
    const style = {
      'width': `${state.width}px`,
      'height': `${state.height}px`,
    }
    return (
      <div className="center no-overflow">
        <div className="no-overflow" style={style}>
          <Grid
          state={state}/>
          <Goal
          state={state}/>
          <Player
          state={state} />
          <Guide
          state={state} />
        </div>
      </div>
    );
  }
}

export default Window;
