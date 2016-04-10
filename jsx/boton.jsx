import React from 'react'

class Boton extends React.Component {
	constructor(props) {
		super(props);
	}
	/*getDefaultProps() {
		return {
			texto: '',
			accion(){}
		};
	},*/
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

export default MenuItem
