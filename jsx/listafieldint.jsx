import React from 'react'
import ReactDOM from 'react-dom'

import ListaField from './listafield.jsx'
import ListaItemFieldInt from './listaitemfieldint.jsx'

class ListaFieldInt extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            valor: props.valor,
            lista: []
        };
    }
    componentDidMount(){
        this.setState({
            lista: [{
                texto: 'mayor que',
                tag: 'mayor'
            },{
                texto: 'menor que',
                tag: 'menor'
            },{
                texto: 'igual que',
                tag: 'igual'
            },{
                texto: 'distinto que',
                tag: 'distinto'
            }]
        });
    }
    onChange(listafield){
        let valor = [];

        for (let i = 0 ; i < listafield.state.valor.length ; i++) {
            let item = listafield.state.valor[i];

            valor.push({
                tag: item.tag,
                valor: item.contenido.state.valor
            });
        }

        this.setState({valor: valor}, ()=>{
            this.props.onChange.call(this, listafield, this);
        });
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
    renderLista(){
        let ret = [];

        for (let i = 0 ; i < this.state.lista.length ; i++) {
            let item = this.state.lista[i];

            ret.push({
                tag: item.tag,
                contenido: <ListaItemFieldInt
                    texto={item.texto}
                    key={item.tag}
                    valor={this.state.valor}
                    onClick={this.onClickField}
                    onBlur={this.onBlurTextField}
                    onKeyPress={this.onKeyPressText}
                />
            }

            );
        }

        return ret;
    }
    render() {
        return (
            <ListaField
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
    onChange(){}
};

export default ListaFieldInt

