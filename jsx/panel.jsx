import React from 'react'
import ReactDOM from 'react-dom'

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);

        this.state = {
            contenido: props.contenido,
            className: props.className,
            onClick: props.onClick,
            onMouseOver: props.onMouseOver,
            onMouseOut: props.onMouseOut
        };
    }
    onClick(e){
        if (this.state.onClick) {
            this.state.onClick.call(this, e, this);
        }
    }
    onMouseOut(e){
        if (this.state.onMouseOut) {
            this.state.onMouseOut.call(this, e, this);
        }
    }
    onMouseOver(e){
        if (this.state.onMouseOver) {
            this.state.onMouseOver.call(this, e, this);
        }
    }
    renderContenido(){
        return typeof(this.state.contenido) === 'function' ? this.state.contenido.call(this, this) : this.state.contenido;
    }
    render(){
        return  <div    className={this.state.className}
            onClick={this.onClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
        >
                    {this.renderContenido()}
        </div>
    }
}
Panel.defaultProps = {
    contenido: undefined,
    className: '',
    onClick(){},
    onMouseOver(){},
    onMouseOut(){}
};

export default Panel

