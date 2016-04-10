import React from 'react'

class Boton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			texto: props.texto ? props.texto : '',
			accion: props.accion ? props.accion : ()=>{}
		};
	}
	render() {
		return (
			<a 	href="#!" 
				onClick={this.state.accion}
			>
				{this.state.texto}
			</a> 
		);
    }
}

export default Boton
