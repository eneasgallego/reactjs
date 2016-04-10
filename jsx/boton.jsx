import React from 'react'

class Boton extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<a 	href="#!" 
				onClick={this.props.accion}
			>
				{this.props.texto}
			</a> 
		);
    }
}
Boton.defaultProps = {
	texto: '',
	accion(){}
};

export default MenuItem
