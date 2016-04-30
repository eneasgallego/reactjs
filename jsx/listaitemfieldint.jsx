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
            valor: props.valor
        };
    }
    componentDidMount(){
    }
    onClick(e, textfield) {
        return this.props.onClick.call(this, e, textfield, this);
    }
    onBlur(e, textfield) {
        return this.props.onBlur.call(this, e, textfield, this);
    }
    onKeyPress(e, textfield) {
        return this.props.onKeyPress.call(this, e, textfield, this);
    }
    render() {
        return (
            <div>
                <span>{this.props.texto}</span>
                <TextField
                    valor={this.state.valor}
                    onClick={this.onClick}
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPress}
                />
            </div>
        );
    }
}
ListaItemFieldInt.defaultProps = {
    texto: "",
    valor: "",
    onClick(){},
    onBlur(){},
    onKeyPress(){}
};

export default ListaItemFieldInt
