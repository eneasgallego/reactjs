import React from 'react'
import ReactDOM from 'react-dom'

import Base from './base.jsx'
import Combo from './combo.jsx'

class Formulario extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			combos_dataset: {},
			campos: parseCampos(props.campos),
			velo: false
		};
	}
	componentDidMount() {
		this.setState({velo:true},()=>{
			if (this.isCombosCompletos()) {
				this.setState({velo:false});
			} else {
				this.cargarCombos();
			}
		});
	}
	onSubmit(e) {
		this.props.onSubmit(e, this);
	}
	isCombosCompletos() {

		let ret = true;
		for (let i = 0 ; i < this.state.campos.length ; i++) {
			let campo = this.state.campos[i];

			if (campo.tipo.tipo == 'object') {
				if (this.state.combos_dataset && !this.state.combos_dataset[campo.campo]) {
					ret = false;
					break;
				}
			}
		}

		return ret;
	}
	cargarCombos() {
		let cargarCombo = campo => {
			let params = {
				_sort: campo.tipo.texto,
				_order: 'ASC'
			};

			ajax({
				metodo: 'get',
				url: campo.tipo.url,
				params: params,
				success: response => {
					let combos_dataset = this.state.combos_dataset;
					combos_dataset[campo.campo] = response;
					this.setState({combos_dataset: combos_dataset});
				}
			}, this);
		};

		for (let i = 0 ; i < this.state.campos.length ; i++) {
			let campo = this.state.campos[i];

			if (campo.tipo.tipo == 'object') {
				if (!this.state.combos_dataset[campo.campo]) {
					cargarCombo(campo);
				}
			}
		}

	}
	renderCampo(campo) {
		let ret;

		if (campo.tipo == 'object') {
			ret = 	<Combo
				combo={campo.tipo}
				dataset={this.state.combos_dataset[campo.campo]}
			/>
		}

		return ret;
	}
	renderCampos() {
		let ret = [];

		for (let i = 0 ; i < this.state.campos.length ; i++) {
			ret.push(this.renderCampo(this.state.campos[i]));
		}

		return ret;
	}
	renderFormulario() {
		return (
			<form
				action="#"
				onSubmit={this.onSubmit}
			>
				{this.renderCampos()}
			</form>
		);
	}
	renderVelo() {
		let ret;

		if (this.state.velo) {
			ret = 	<div className="velo">
				<div className="velo-fondo" />
				<div className="velo-imagen" />
			</div>
		}

		return ret;
	}
	render() {
		return (
			<div className="formulario-cont" style={this.props.style}>
				{this.renderFormulario()}
				{this.renderVelo()}
			</div>
		);
	}
}
Tabla.defaultProps = {
	campos: [],
	onSubmit(){}
};

export default Tabla

