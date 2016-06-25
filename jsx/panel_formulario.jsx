import React from 'react'
import ReactDOM from 'react-dom'

import Formulario from './formulario.jsx'
import Base from './base.jsx'

class PanelFormulario extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			campos: parseCampos(props.campos)
		};
	}
	onSubmit(e, formulario) {
		this.props.onSubmit(e, formulario, this);
	}
	renderFormulario() {
		return <Formulario
			onSubmit={this.onSubmit}
			campos={this.state.campos}
		/>
	}
	render() {
		return (
			<section id={this.props.id} className="panel">
				<h2 ref="titulo">{this.props.titulo}</h2>
				{this.renderFormulario()}
			</section>
		);
	}
}
PanelFormulario.defaultProps = {
	id: '',
	titulo: '',
	campos: [],
	onSubmit(){}
};

export default PanelFormulario
