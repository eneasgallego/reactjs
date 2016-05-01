import React from 'react'
import ReactDOM from 'react-dom'

import TextField from './textfield.jsx'

class ListaItemFieldInt extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.state = {
        };
    }
    componentDidMount(){
    }
    onClick(e, textfield) {
        return this.props.onClick.call(this, e, textfield, this);
    }
    onBlur(e, textfield) {
        this.props.onBlur.call(this, e, textfield, this);
        return this.props.onChange.call(this, e.currentTarget.value, this.props.indice, textfield, this);
    }
    onKeyPress(e, textfield) {
        if (e.keyCode == 13 || e.charCode == 13) {
            this.props.onChange.call(this, e.currentTarget.value, this.props.indice, textfield, this);
        }
        this.props.onKeyPress.call(this, e, textfield, this);
    }
    render() {
        return (
            <div>
                <span>{this.props.texto}</span>
                <TextField
                    valor={this.props.valor.valor}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPress}
                />
            </div>
        );
    }
}
ListaItemFieldInt.defaultProps = {
    indice: undefined,
    tag: "",
    texto: "",
    valor: "",
    onClick(){},
    onBlur(){},
    onKeyPress(){},
    onChange(){}
};

export default ListaItemFieldInt
