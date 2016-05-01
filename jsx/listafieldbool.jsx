import React from 'react'
import ReactDOM from 'react-dom'

import ListaField from './listafield.jsx'

class ListaFieldBool extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getTitulo = this.getTitulo.bind(this);
        this.filtrar = this.filtrar.bind(this);

        this.state = {
            valor: props.valor,
            lista: this.getValorLimpio()
        };
    }
    componentDidMount(){
        this.setState({
            lista: [{
                texto: 'Sí',
                tag: 'si',
                valor: true
            },{
                texto: 'No',
                tag: 'no',
                valor: false
            }]
        });
    }
    getValorLimpio(){
        let ret = [];

        ret.getTitulo = this.getTitulo;
        ret.filtrar = this.filtrar;

        return ret;
    }
    onChange(seleccionado, check, lista_item, lista){
        let tag = lista_item.props.tag;
        let valor = this.getValorLimpio();

        if (seleccionado) {
            let item_lista = this.state.lista.buscar('tag', tag);
            valor.push({
                tag: tag,
                valor: item_lista.valor
            });
        }

        this.setState({valor: valor},()=>{
            this.props.onChange.call(this, valor, this);
        });
    }
    onClick(e, listafield) {
        return this.props.onClick.call(this, e, listafield, this);
    }
    getTitulo() {
        let ret = [];

        for (let i = 0 ; i < this.state.valor.length ; i++) {
            let item = this.state.valor[i];
            let item_lista = this.state.lista.buscar('tag', item.tag);

            ret.push(item.tag);
        }

        return ret.join(';');
    }
    filtrar(valor) {
        for (let i = 0 ; i < this.state.valor.length ; i++) {
            let item = this.state.valor[i];
            let item_lista = this.state.lista.buscar('tag', item.tag);

            if (valor !== item.valor) {
                return false;
            }
        }

        return true;
    }
    renderLista(){
        let ret = [];

        for (let i = 0 ; i < this.state.lista.length ; i++) {
            let item = this.state.lista[i];

            ret.push({
                tag: item.tag,
                contenido: item.texto
            });
        }

        return ret;
    }
    render() {
        return (
            <ListaField
                ref="listafield"
                valor={this.state.valor}
                lista={this.renderLista()}
                onChange={this.onChange}
                onClick={this.onClick}
            />
        );
    }
}
ListaFieldBool.defaultProps = {
    valor: [],
    onClick(){},
    onBlur(){},
    onKeyPress(){},
    onChange(){}
};

export default ListaFieldBool

