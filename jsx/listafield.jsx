import React from 'react'
import ReactDOM from 'react-dom'

import ListaItemField from './listaitemfield.jsx'

class ListaField extends React.Component {
    constructor(props) {
        super(props);

        this.estaSeleccionado = this.estaSeleccionado.bind(this);
        this.onSelectedItem = this.onSelectedItem.bind(this);

        this.state = {
            valor: props.valor
        };
    }
    onSelectedItem(lista_item){
        let valor = this.state.valor;
        let index = valor.indexOf(lista_item.state.contenido);

        if (lista_item.state.valor && !!~index) {
            valor.push(lista_item.state.contenido);
        } else if (!lista_item.state.valor && !~index) {
            valor.splice(index, 1);
        }

        let arr = [];
        for (let i = 0 ; i < valor.length ; i++) {
            arr.push(valor[i]);
        }

        this.setState({valor: arr}, ()=>{
           this.props.onChange.call(this, this);
        });
    }
    estaSeleccionado(item){
        return !!~this.state.valor.indice('tag', item.tag);
    }
    renderListaItems(){
        let ret = [];

        for (let i = 0 ; i < this.props.lista.length ; i++) {
            let item = this.props.lista[i];
            ret.push(
                <ListaItemField
                    key={item.tag}
                    seleccionado={this.estaSeleccionado(item)}
                    contenido={item.contenido}
                    onSelected={this.onSelectedItem}
                />
            );
        }

        return ret;
    }
    renderLista(){
        let ret;

        if (this.props.lista.length) {
            ret =   <ul>
                        {this.renderListaItems()}
                    </ul>
        }

        return ret;
    }
    render() {
        return (
            <div>
                {this.renderLista()}
            </div>
        );
    }
}
ListaField.defaultProps = {
    valor: [],
    lista: [],
    onChange(){}
};

export default ListaField

