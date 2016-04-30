import React from 'react'
import ReactDOM from 'react-dom'

import CheckBox from './checkbox.jsx'

class ListaItemField extends React.Component {
    constructor(props) {
        super(props);

        this.onClickCheck = this.onClickCheck.bind(this);

        this.state = {
            contenido: props.contenido,
            seleccionado: props.seleccionado
        };
    }
    componentDidMount() {
        this.props.onLoad(this);
    }
    onClickCheck(e, check) {
        let seleccionado = e.currentTarget.checked;
        this.setState({seleccionado: seleccionado},()=>{
            this.props.onSelected.call(this, this);
        });
    }
    renderContenido(){
        return (typeof(this.state.contenido) === 'function') ? this.state.contenido.call(this, this) : this.state.contenido;
    }
    render(){
        return (
            <li>
                <div>
                    <CheckBox
                        valor={this.state.seleccionado}
                        onClick={this.onClickCheck}
                    />
                </div>
                {this.renderContenido()}
            </li>
        );
    }
}
ListaItemField.defaultProps = {
    contenido: undefined,
    seleccionado: false,
    onLoad(){},
    onSelected(){}
};

export default ListaItemField

