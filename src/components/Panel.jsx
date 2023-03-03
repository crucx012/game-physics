import React from 'react';

class Panel extends React.Component {
  render() {
    let {state, togglePanel} = this.props;
    return this.getVisiblePanel(state,togglePanel)
  }

  getVisiblePanel(state,togglePanel) {
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
        <div className="expand center" onClick={() => {togglePanel(!state.panelVisible)}}>
          <div style={arrowStyle}>{'➜'}</div>
        </div>
        <div className="full right no-overflow">
          <div className="container">
            <div>X:</div>
            <div> {state.x}</div>
          </div>
          <div className="container">
            <div>Y:</div>
            <div> {-state.y}</div>
          </div>
          <div className="container">
            <div>Vertical:</div>
            <div> {state.directions[1]}</div>
          </div>
          <div className="container">
            <div>Horiztonal: </div>
            <div> {state.directions[0]}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;
