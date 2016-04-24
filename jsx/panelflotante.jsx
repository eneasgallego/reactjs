import React from 'react'
import ReactDOM from 'react-dom'

import Panel from './panel.jsx'

class PanelFlotante extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);

        this.state = {
            contenido: props.contenido,
            onClick: props.onClick,
            onMouseOver: props.onMouseOver,
            onMouseOut: props.onMouseOut,
            onClosePanel: props.onClosePanel
        };
    }
    onClick(e, panel){
        if (this.state.onClick) {
            this.state.onClick.call(this, e, panel, this);
        }
    }
    onMouseOut(e, panel){
        if (this.state.onMouseOut) {
            this.state.onMouseOut.call(this, e, panel, this);
        }
    }
    onMouseOver(e, panel){
        if (this.state.onMouseOver) {
            this.state.onMouseOver.call(this, e, panel, this);
        }
    }
    render(){
        return  <Panel  className="flotante"
            contenido={this.state.contenido}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
        >
        </Panel>
    }
}
PanelFlotante.defaultProps = {
    contenido: undefined,
    onClick(){},
    onMouseOver(){},
    onMouseOut(){},
    onClosePanel(){}
};

export default PanelFlotante

