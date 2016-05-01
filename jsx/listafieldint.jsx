import React from 'react'
import ReactDOM from 'react-dom'

import ListaField from './listafield.jsx'
import ListaItemFieldInt from './listaitemfieldint.jsx'

class ListaFieldInt extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onChangeInt = this.onChangeInt.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.getValor = this.getValor.bind(this);
        this.getTitulo = this.getTitulo.bind(this);
        this.filtrar = this.filtrar.bind(this);

        this.state = {
            valor: props.valor,
            lista: []
        };

        this.state.valor.getTitulo = this.getTitulo;
        this.state.valor.filtrar = this.filtrar;
    }
    componentDidMount(){
        this.setState({
            lista: [{
                texto: 'mayor que',
                tag: 'mayor',
                titulo: '>',
                filtrar(a, b) {
                    return a > b;
                }
            },{
                texto: 'menor que',
                tag: 'menor',
                titulo: '<',
                filtrar(a, b) {
                    return a < b;
                }
            },{
                texto: 'igual que',
                tag: 'igual',
                titulo: '=',
                filtrar(a, b) {
                    return a == b;
                }
            },{
                texto: 'distinto que',
                tag: 'distinto',
                titulo: '!=',
                filtrar(a, b) {
                    return a != b;
                }
            }]
        });
    }
    onChange(valor, listafield){
        this.props.onChange.call(this, valor, this);
    }
    onChangeInt(valor, indice, textfield, listaitemfieldint) {
        let tag = listaitemfieldint.props.tag;
        let valor_estado = this.state.valor;
        let valor_actual = valor_estado.buscar('tag', tag);

        let seleccionado = false;
        if (isNaN(valor)) {
            if (valor_actual) {
                valor_estado.splice(valor_estado.indexOf(valor_actual), 1);
            }
        } else {
            if (!valor_actual) {
                valor_actual = {
                    tag: tag
                }
                valor_estado.push(valor_actual);
            }
            valor_actual.valor = valor;
            seleccionado = true;
        }

        this.refs.listafield.setSeleccionado(indice, seleccionado);
    }
    onClick(e, textfield, listaitemfieldint) {
        return this.props.onClick.call(this, e, textfield, listaitemfieldint, this);
    }
    onBlur(e, textfield, listaitemfieldint) {
        return this.props.onBlur.call(this, e, textfield, listaitemfieldint, this);
    }
    onKeyPress(e, textfield, listaitemfieldint) {
        return this.props.onKeyPress.call(this, e, textfield, listaitemfieldint, this);
    }
    getValor(tag) {
        return this.state.valor.buscar('tag', tag);
    }
    getTitulo() {
        let ret = [];

        for (let i = 0 ; i < this.state.valor.length ; i++) {
            let item = this.state.valor[i];
            let item_lista = this.state.lista.buscar('tag', item.tag);

            ret.push(item_lista.titulo + item.valor);
        }

        return ret.join(';');
    }
    filtrar(valor) {
        for (let i = 0 ; i < this.state.valor.length ; i++) {
            let item = this.state.valor[i];
            let item_lista = this.state.lista.buscar('tag', item.tag);

            if (!item_lista.filtrar(valor, item.valor)) {
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
                contenido: <ListaItemFieldInt
                    texto={item.texto}
                    key={item.tag}
                    tag={item.tag}
                    indice={i}
                    valor={this.getValor(item.tag)}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChangeInt}
                />
            }

            );
        }

        return ret;
    }
    render() {
        console.log('4 - listafieldint.render: ');
        console.log(this.state.valor);
        return (
            <ListaField
                ref="listafield"
                valor={this.state.valor}
                lista={this.renderLista()}
                className="filtronumerico"
                onChange={this.onChange}
            />
        );
    }
}
ListaFieldInt.defaultProps = {
    valor: [],
    onClick(){},
    onBlur(){},
    onKeyPress(){},
    onChange(){}
};

export default ListaFieldInt

