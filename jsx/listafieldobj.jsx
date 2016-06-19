import React from 'react'
import ReactDOM from 'react-dom'

import ListaField from './listafield.jsx'

class ListaFieldObj extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getTitulo = this.getTitulo.bind(this);
        this.filtrar = this.filtrar.bind(this);
        this.cargarLista = this.cargarLista.bind(this);

        this.state = {
            valor: this.getValorLimpio(props.valor),
            lista: this.props.lista ? this.cargarLista(this.props.lista) : this.getValorLimpio(),
            cargado: !!this.props.lista
        };
    }
    componentDidMount(){
        if (!this.state.cargado) {
            if (this.props.dataset) {
                this.cargarDataset(this.props.dataset);
            } else {
                this.setState({cargado: true});
            }
        }
    }
    cargarDataset(dataset, params, callback){
        if (!this.state.cargado) {
            ajax({
                metodo: 'get',
                params: params,
                url: dataset,
                success: res => {
                    let lista = this.cargarLista(res);

                    this.setState({
                        lista: lista,
                        cargado: true
                    }, callback);
                }
            }, this);
        }
    }
    cargarLista(lista){
        let ret = this.getValorLimpio();
        for (let i = 0 ; i < lista.length ; i++) {
            ret.push(this.crearItemLista(lista[i][this.props.campo_texto], lista[i][this.props.campo_valor]));
        }

        return ret;
    }
    getValorLimpio(array){
        let ret = array instanceof Array ? array : [];

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
    onChange(seleccionado, field, lista_item, lista){
        let tag = lista_item.props.tag;
        let valor = this.getValorLimpio(clonar.call(this.state.valor));

        let modificarValor = (item_lista, item_valor, insertar) =>{
            if (insertar) {
                if (!item_valor) {
                    item_valor = {};
                    valor.push(item_valor);
                }
                item_valor.titulo = item_lista.texto;
                item_valor.tag = item_lista.tag;
                item_valor.valor = item_lista.valor;
            } else if (item_valor) {
                valor.splice(valor.indexOf(item_valor), 1);
            }
        };

        if (seleccionado && (tag == 'todos' || tag == 'ninguno')) {
            if (tag == 'todos') {
                for (let i = 0; i < this.state.lista.length; i++) {
                    modificarValor(this.state.lista[i], valor.buscar('tag', this.state.lista[i].tag), true);
                }
            } else {
                valor = this.getValorLimpio();
            }
        } else {
            modificarValor(this.state.lista[0], valor.buscar('tag', 'todos'), false);
            modificarValor(this.state.lista[1], valor.buscar('tag', 'ninguno'), false);
            modificarValor(this.state.lista.buscar('tag', tag), valor.buscar('tag', tag), seleccionado);
        }

/*        this.setState({valor: valor},()=>{*/
            this.props.onChange.call(this, valor, this);
/*        });*/
    }
    onMouseOver(e, listafield) {
        e.persist();
        e.solo_mostrar = true;
        return this.props.onMouseOver.call(this, e, listafield, this);
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

            if (valor === item.valor) {
                return true;
            }
        }

        return false;
    }
    renderLista(){
        let ret = [{
            tag: 'todos',
            contenido: 'TODOS'
        },{
            tag: 'ninguno',
            contenido: 'NINGUNO'
        }];

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
                onMouseOver={this.onMouseOver}
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
    onChange(){},
    onMouseOver(){}
};

export default ListaFieldObj

