import React from 'react'
import ReactDOM from 'react-dom'

import PanelFlotante from './panelflotante.jsx'
import TextField from './textfield.jsx'
import ListaFieldNum from './listafieldnum.jsx'
import ListaFieldBool from './listafieldbool.jsx'

class FiltroTabla extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onClosePanel = this.onClosePanel.bind(this);
        this.onBlurTextField = this.onBlurTextField.bind(this);
        this.onKeyPressText = this.onKeyPressText.bind(this);
        this.onClickField = this.onClickField.bind(this);
        this.onChangeLista = this.onChangeLista.bind(this);

        this.state = {
            tipo: parseTipo(props.tipo),
            onClick: props.onClick,
            onMouseOver: props.onMouseOver,
            onMouseOut: props.onMouseOut,
            onClosePanel: props.onClosePanel,
            valor: props.valor
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
    onClickField(e) {
        e.stopPropagation();
        this.onClick.apply(this, arguments);
    }
    onBlurTextField(e, textfield) {
        return this.filtrar(e.currentTarget.value, textfield);
    }
    onKeyPressText(e, textfield) {
        if (e.keyCode == 27 || e.charCode == 27) {
            this.cerrar();
        } else if (e.keyCode == 13 || e.charCode == 13) {
            return this.filtrar(e.currentTarget.value, textfield);
        }
    }
    onLoadField(field) {
        field.focus();
    }
    onChangeLista(valor, listafieldnum) {
        this.filtrar(valor, listafieldnum);
    }
    cerrar(){
        if (this.state.onClosePanel) {
            this.state.onClosePanel.call(this, this);
        }
    }
    filtrar(valor, field) {
        this.setState({valor: valor}, () => {
            this.cerrar();
            this.props.onFiltrado.call(this, valor, field, this);
        });
    }
    renderContenido(){
        var ret;

        if (0 && this.state.tipo.tipo == 'object') {
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
            ret = 	<ListaFieldBool
                valor={this.state.valor ? this.state.valor : []}
                onChange={this.onChangeLista}
            />
        } else if (this.state.tipo.tipo == 'int') {
            ret = 	<ListaFieldNum
                        valor={this.state.valor ? this.state.valor : []}
                        onChange={this.onChangeLista}
                    />
        } else {
            ret = 	<TextField
                valor={this.state.valor}
                onClick={this.onClickField}
                onBlur={this.onBlurTextField}
                onKeyPress={this.onKeyPressText}
                onLoad={this.onLoadField}
            />
        }

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
    valor: undefined,
    onClick(){},
    onClosePanel(){},
    onMouseOver(){},
    onMouseOut(){},
    onFiltrado(){}
};

export default FiltroTabla

