import React from 'react'
import ReactDOM from 'react-dom'

import ListaField from './listafield.jsx'

class ListaFieldObj extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getTitulo = this.getTitulo.bind(this);
        this.filtrar = this.filtrar.bind(this);

        this.state = {
            valor: props.valor,
            lista: this.getValorLimpio(),
            cargado: false
        };
    }
    componentDidMount(){
        if (this.props.dataset) {
            this.cargarDataset(this.props.dataset);
        } else {
            this.setState({cargado: true});
        }
    }
    cargarDataset(dataset, params, callback){
        if (!this.state.cargado) {
            ajax({
                metodo: 'get',
                params: params,
                url: dataset,
                success: res => {
                    let lista = this.getValorLimpio();
                    for (let i = 0 ; i < res.length ; i++) {
                        lista.push(this.crearItemLista(res[i][this.props.campo_texto], res[i][this.props.campo_valor]));
                    }

                    this.setState({
                        lista: lista,
                        cargado: true
                    }, callback);
                }
            }, this);
        }
    }
    getValorLimpio(){
        let ret = [];

        ret.getTitulo = this.getTitulo;
        ret.filtrar = this.filtrar;

        return ret;
    }
    crearItemLista(texto, valor){
        return {
            texto: texto,
            tag: valor,
            valor: valor
        };
    }
    onChange(seleccionado, combo, lista_item, lista){
        let tag = lista_item.props.tag;
        let valor = this.getValorLimpio();

        if (seleccionado) {
            let item_lista = this.state.lista.buscar('tag', tag);
            valor.push({
                titulo: item_lista.texto,
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

            ret.push(item.titulo);
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
ListaFieldObj.defaultProps = {
    valor: [],
    dataset: '',
    campo_texto: '',
    campo_valor: '',
    onClick(){},
    onBlur(){},
    onKeyPress(){},
    onChange(){}
};

export default ListaFieldObj

