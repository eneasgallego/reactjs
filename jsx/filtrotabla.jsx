import React from 'react'
import ReactDOM from 'react-dom'

import PanelFlotante from './panelflotante.jsx'
import TextField from './textfield.jsx'
import ListaFieldNum from './listafieldnum.jsx'
import ListaFieldBool from './listafieldbool.jsx'
import ListaFieldObj from './listafieldobj.jsx'

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

        if (this.state.tipo.tipo == 'object') {
            ret = <ListaFieldObj
                valor={this.state.valor ? this.state.valor : []}
                campo_texto={this.props.filtro.texto}
                campo_valor={this.props.filtro.id}
                lista={this.props.filtro.lista}
                onChange={this.onChangeLista}
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
    filtro: {},
    onClick(){},
    onClosePanel(){},
    onMouseOver(){},
    onMouseOut(){},
    onFiltrado(){}
};

export default FiltroTabla

