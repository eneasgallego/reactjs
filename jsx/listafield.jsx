import React from 'react'
import ReactDOM from 'react-dom'

import ListaItemField from './listaitemfield.jsx'

class ListaField extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getSeleccionado = this.getSeleccionado.bind(this);
        this.setSeleccionado = this.setSeleccionado.bind(this);
        this.estaSeleccionado = this.estaSeleccionado.bind(this);
        this.listaitemfield = [];

        this.state = {
            valor: props.valor,
            lista: props.lista
        };
    }
    componentDidMount(){
        if (!this.state.lista.length) {
            if (this.props.dataset) {

            }
        }
    }
    onChange(seleccionado, check, lista_item){
        this.props.onChange.call(this, seleccionado, check, lista_item, this);
    }
    onMouseOver(e) {
        return this.props.onMouseOver.call(this, e, this);
    }
    onClick(e) {
        return this.props.onClick.call(this, e, this);
    }
    getSeleccionado(index) {
        return this.listaitemfield[index].getSeleccionado();
    }
    setSeleccionado(index, seleccionado) {
        this.listaitemfield[index].setSeleccionado(seleccionado);
    }
    estaSeleccionado(item){
        return !!~this.state.valor.indice('tag', item.tag);
    }
    renderListaItems(){
        let ret = [];

        for (let i = 0 ; i < this.state.lista.length ; i++) {
            let item = this.state.lista[i];
            ret.push(
                <ListaItemField
                    indice={i}
                    key={item.tag}
                    tag={item.tag}
                    ref={ref => this.listaitemfield.push(ref)}
                    seleccionado={this.estaSeleccionado(item)}
                    contenido={item.contenido}
                    onChange={this.onChange}
                />
            );
        }

        return ret;
    }
    renderLista(){
        let ret;

        if (this.state.lista.length) {
            ret =   <ul>
                        {this.renderListaItems()}
                    </ul>
        }

        return ret;
    }
    render() {
        return (
            <div    className="filtro"
                    onMouseOver={this.onMouseOver}
                    onClick={this.onClick}
            >
                {this.renderLista()}
            </div>
        );
    }
}
ListaField.defaultProps = {
    valor: [],
    lista: [],
    onChange(){},
    onClick(){},
    onMouseOver(){}
};

export default ListaField

