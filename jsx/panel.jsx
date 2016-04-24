import React from 'react'
import ReactDOM from 'react-dom'

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contenido: props.contenido,
            className: props.className
        };
    }
    renderContenido(){
        return typeof(this.state.contenido) === 'function' ? this.state.contenido.call(this, this) : this.state.contenido;
    }
    render(){
        return  <div className={this.state.className}>
                    {this.renderContenido()}
                </div>
    }
}
Panel.defaultProps = {
    contenido: undefined,
    className: ''
};

export default Panel

