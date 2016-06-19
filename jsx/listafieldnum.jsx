import React from 'react'
import ReactDOM from 'react-dom'

import ListaField from './listafield.jsx'
import ListaItemFieldNum from './listaitemfieldnum.jsx'

class ListaFieldNum extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onChangeNum = this.onChangeNum.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.getValor = this.getValor.bind(this);
        this.getTitulo = this.getTitulo.bind(this);
        this.filtrar = this.filtrar.bind(this);

        this.state = {
            valor: props.valor,
            lista: [{
                texto: 'mayor que',
                tag: 'mayor',
                titulo: '>',
                compatible: ['menor'],
                filtrar(a, b) {
                    return a > b;
                }
            },{
                texto: 'menor que',
                tag: 'menor',
                titulo: '<',
                compatible: ['mayor'],
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
        };

        this.state.valor.getTitulo = this.getTitulo;
        this.state.valor.filtrar = this.filtrar;
        this.state.valor.quitarValor = this.quitarValor;
        this.state.valor.insertarValor = this.insertarValor;
    }
    insertarValor(tag, valor_actual, valor){
        if (!valor_actual) {
            valor_actual = {
                tag: tag
            }
            this.push(valor_actual);
        }
        valor_actual.valor = valor;
    }
    quitarValor(valor){
        if (typeof(valor) === 'string') {
            valor = this.buscar('tag', valor);
        }

        if (valor) {
            this.splice(this.indexOf(valor), 1);
        }
    }
    onChange(seleccionado, check, lista_item, lista){
        let tag = lista_item.props.tag;
        let valor = this.state.valor;
        let valor_actual = valor.buscar('tag', tag);

        if (seleccionado) {
            let item_lista = this.state.lista.buscar('tag', tag);
            for (let i = 0; i < valor.length; i++) {
                if (valor[i].tag != tag && (!item_lista.compatible || (item_lista.compatible && !~item_lista.compatible.indexOf(valor[i].tag)))) {
                    valor.quitarValor(valor[i].tag);
                    i--;
                }
            }
            if (!valor_actual) {
                valor.insertarValor(tag, valor_actual, 0);
            }
        } else {
            valor.quitarValor(valor_actual);
        }

        this.props.onChange.call(this, this.state.valor, this);
    }
    onChangeNum(valor, indice, textfield, listaitemfieldnum) {
        let tag = listaitemfieldnum.props.tag;
        let valor_estado = this.state.valor;
        let valor_actual = valor_estado.buscar('tag', tag);

        let seleccionado = false;
        if (isNaN(valor)) {
            valor_estado.quitarValor(valor_actual);
        } else {
            valor_estado.insertarValor(tag, valor_actual, valor);
            seleccionado = true;
        }

        this.refs.listafield.setSeleccionado(indice, seleccionado);
    }
    onClick(e, textfield, listaitemfieldnum) {
        return this.props.onClick.call(this, e, textfield, listaitemfieldnum, this);
    }
    onBlur(e, textfield, listaitemfieldnum) {
        return this.props.onBlur.call(this, e, textfield, listaitemfieldnum, this);
    }
    onKeyPress(e, textfield, listaitemfieldnum) {
        return this.props.onKeyPress.call(this, e, textfield, listaitemfieldnum, this);
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
                contenido: <ListaItemFieldNum
                    texto={item.texto}
                    key={item.tag}
                    tag={item.tag}
                    indice={i}
                    valor={this.getValor(item.tag)}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChangeNum}
                />
            }

            );
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
            />
        );
    }
}
ListaFieldNum.defaultProps = {
    valor: [],
    onClick(){},
    onBlur(){},
    onKeyPress(){},
    onChange(){}
};

export default ListaFieldNum

