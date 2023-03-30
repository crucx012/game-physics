import React from 'react';

class Panel extends React.Component {
  render() {
    let {state, togglePanel, togglePacManWalls} = this.props;
    return this.getVisiblePanel(state,togglePanel,togglePacManWalls)
  }

  getVisiblePanel(state,togglePanel,togglePacManWalls) {
    const left = state.panelVisible ? '0%' : '-10%'
    const style = {
      'marginLeft': left
    }
    const arrowStyle = state.panelVisible ?
    {
      'transform': 'translate(20%, -50%) scale(-1,1)'
    } : {
      'transform': 'translate(20%, -50%)'
    }
    return (
      <div className="panel" style={style}>
        <div className="expand no-overflow">
          <div className="medium circle" onClick={() => {togglePanel(!state.panelVisible)}}>
            <div className="text-center" style={arrowStyle}>{'➜'}</div>
          </div>
        </div>
        <div className="full no-overflow">
          <div className="container">
            <div>X:</div>
            <div> {state.x}</div>
          </div>
          <div className="container">
            <div>Y:</div>
            <div> {-state.y}</div>
          </div>
          <div className="container">
            <div>Move:</div>
            <div> {state.directions[0]}, {state.directions[1]}</div>
          </div>
          <div className="container" onClick={() => {togglePacManWalls()}}>
            <div>Pac-Man Walls:</div>
            <div> {state.pacManWalls ? "ON" : "OFF"}</div>
          </div>
          <div className="container">
            <div>Goal:</div>
            <div>  {state.goalX}, {-state.goalY}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;
