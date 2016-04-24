import React from 'react'
import ReactDOM from 'react-dom'

import PanelFlotante from './panelflotante.jsx'

class FiltroTabla extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onClosePanel = this.onClosePanel.bind(this);

        this.state = {
            tipo: parseTipo(props.tipo),
            onClick: props.onClick,
            onMouseOver: props.onMouseOver,
            onMouseOut: props.onMouseOut,
            onClosePanel: props.onClosePanel
        };
    }
    onClick(e, panel, panelflotante){
        if (this.state.onClick) {
            this.state.onClick.call(this, e, panel, panelflotante, this);
        }
    }
    onClosePanel(e, panel, panelflotante){
        if (this.state.onClosePanel) {
            this.state.onClosePanel.call(this, e, panel, panelflotante, this);
        }
    }
    onMouseOut(e, panel, panelflotante){
        if (this.state.onMouseOut) {
            this.state.onMouseOut.call(this, e, panel, panelflotante, this);
        }
    }
    onMouseOver(e, panel, panelflotante){
        if (this.state.onMouseOver) {
            this.state.onMouseOver.call(this, e, panel, panelflotante, this);
        }
    }
    renderContenido(){
        var ret;
        /*
         if (this.state.tipo.tipo == 'object') {
         ret = 	<Combo
         valor={this.props.datos}
         combo={this.props.tipo}
         onClick={this.onClickField}
         onBlur={this.onBlurField}
         onChange={this.onChangeCombo}
         onLoad={this.onLoadField}
         dataset={this.props.combos_dataset[this.props.campo]}
         />
         } else if (this.state.tipo.tipo == 'bool') {
         ret = 	<CheckBox
         valor={this.props.datos}
         onClick={this.onClickCheck}
         onBlur={this.onBlurField}
         onChange={this.onChangeCombo}
         onLoad={this.onLoadField}
         />
         } else {
         ret = 	<TextField
         valor={this.props.datos}
         onClick={this.onClickField}
         onBlur={this.onBlurTextField}
         onKeyPress={this.onKeyPressText}
         onLoad={this.onLoadField}
         />
         }
         */
        return ret;
    }
    render(){
        return  <PanelFlotante
            contenido={this.renderContenido()}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onClosePanel={this.onClosePanel}
        >
        </PanelFlotante>
    }
}
FiltroTabla.defaultProps = {
    tipo: 'string',
    onClick(){},
    onClosePanel(){},
    onMouseOver(){},
    onMouseOut(){}
};

export default FiltroTabla

