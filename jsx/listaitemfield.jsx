import React from 'react'
import ReactDOM from 'react-dom'

import CheckBox from './checkbox.jsx'

class ListaItemField extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getSeleccionado = this.getSeleccionado.bind(this);
        this.setSeleccionado = this.setSeleccionado.bind(this);
        this.toggleSeleccionado = this.toggleSeleccionado.bind(this);

        this.state = {
        };
    }
    componentDidMount() {
        this.props.onLoad.call(this, this);
    }
    onChange(seleccionado, check) {
        this.props.onChange.call(this, seleccionado, check, this);
    }
    onClick(e) {
        e.preventDefault();
        this.toggleSeleccionado();
    }
    getSeleccionado() {
        return this.refs.checkbox.getSeleccionado();
    }
    setSeleccionado(seleccionado) {
        this.refs.checkbox.setSeleccionado(seleccionado);
    }
    toggleSeleccionado() {
        this.refs.checkbox.toggleSeleccionado();
    }
    renderContenido(){
        return (typeof(this.props.contenido) === 'function') ? this.props.contenido.call(this, this) : this.props.contenido;
    }
    render(){
        return (
            <li>
                <CheckBox
                    ref="checkbox"
                    valor={this.props.seleccionado}
                    onChange={this.onChange}
                />
                <div
                    className="contenido"
                    onClick={this.onClick}
                >
                    {this.renderContenido()}
                </div>
            </li>
        );
    }
}
ListaItemField.defaultProps = {
    indice: undefined,
    tag: '',
    contenido: undefined,
    seleccionado: false,
    onLoad(){},
    onChange(){}
};

export default ListaItemField

