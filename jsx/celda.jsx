import React from 'react'
import ReactDOM from 'react-dom'

import Combo from './combo.jsx'
import CheckBox from './checkbox.jsx'
import TextField from './textfield.jsx'

class Celda extends React.Component {
	constructor(props) {
		super(props);

		this.accionCelda = this.accionCelda.bind(this);
		this.onKeyPressText = this.onKeyPressText.bind(this);
		this.onBlurTextField = this.onBlurTextField.bind(this);

		this.state = {
			orden: props.orden ? props.orden_desc ? -1 : 1 : 0,
			editar: false,
			tipo: parseTipo(props.tipo)
		};
	}
	componentDidMount(){
		let dom = ReactDOM.findDOMNode(this);
		dom.addEventListener('resize', this.onResize);
		this.triggerResize({
			width: dom.offsetWidth,
			height: dom.offsetHeight,
			top: dom.offsetTop,
			left: dom.offsetLeft,
			index: dom.cellIndex
		});
	}
	triggerResize(offset) {
		this.props.onResize(offset, this);
	}
	onResize(e) {
		this.triggerResize({
			width: e.currentTarget.offsetWidth,
			height: e.currentTarget.offsetHeight,
			top: e.currentTarget.offsetTop,
			left: e.currentTarget.offsetLeft,
			index: e.currentTarget.cellIndex
		});
	}
	guardar(e, field) {
		let valor;
		if (this.state.tipo.tipo == 'bool') {
			valor = e.currentTarget.checked;
		} else if (this.state.tipo.tipo == 'float' || this.state.tipo.tipo == 'int') {
			valor = 0;
			if (!isNaN(e.currentTarget.value)) {
				valor = parseFloat(e.currentTarget.value);
				if (this.state.tipo.tipo == 'int') {
					valor = ~~valor;
				}
			}
		} else {
			valor = e.currentTarget.value;
		}

		this.setState({editar: false}, () => {
			if (typeof(this.props.guardar) === 'function') {
				this.props.guardar(valor, field, this);
			}
		});
	}
	accionCelda(e) {
		this.props.onClick.call(this, e, this);
	}
	onClickField(e) {
		e.stopPropagation();
	}
	onBlurTextField(e, textfield) {
		return this.guardar(e, textfield);
	}
	onBlurField(e, field) {
		this.setState({editar: false});
	}
	onKeyPressText(e, textfield) {
		if (e.keyCode == 27 || e.charCode == 27) {
			this.setState({editar: false});
		} else if (e.keyCode == 13 || e.charCode == 13) {
			return this.guardar(e, textfield);
		}
	}
	onChangeCombo(e, combo) {
		return this.guardar(e, combo);
	}
	onClickCheck(e, check) {
		return this.guardar(e, check);
	}
	onLoadField(field) {
		field.focus();
	}
	changeOrden(){
		this.setState({
			orden: this.state.orden > 0 ? -1 : 1
		}, () => {
			this.props.onChangeDesc.call(this, this.state.orden, this);
		});
	}
	renderEditar(){
		let ret = '';

		if (this.state.editar) {
			if (this.state.tipo.tipo == 'object') {
				ret = 	<Combo 
							valor={this.props.datos}
							combo={this.props.tipo}
							onClick={this.onClickField}
							onBlur={this.onBlurField}
							onChange={this.onChangeCombo}
							onLoad={this.onLoadField}
							dataset={this.props.combos_dataset[this.props.campo]}
						/>
			} else if (this.state.tipo.tipo == 'bool') {
				ret = 	<CheckBox 
							valor={this.props.datos}
							onClick={this.onClickCheck}
							onBlur={this.onBlurField}
							onChange={this.onChangeCombo}
							onLoad={this.onLoadField}
						/>
			} else {
				ret = 	<TextField 
							valor={this.props.datos}
							onClick={this.onClickField}
							onBlur={this.onBlurTextField}
							onKeyPress={this.onKeyPressText}
							onLoad={this.onLoadField}
						/>
			}
		}

		return ret;
	}
	renderValor(){
		let ret = this.props.datos;

		if (this.state.tipo.tipo == 'object') {
			let dataset = this.props.combos_dataset[this.props.campo];

			if (dataset) {
				let item = dataset.buscar(this.state.tipo.id, ret);
				if (item) {
					ret = item[this.state.tipo.texto];
				}
			}
		} else if (this.state.tipo.tipo == 'bool') {
			ret = ret ? 'Sí' : 'No';
		}

		return ret;
	}
	renderStyle(){
		let ret = {};

		if (this.props.ancho) {
			ret.width = this.props.ancho + 'px';
		}

		if (this.state.tipo.tipo == 'int' || this.state.tipo.tipo == 'float') {
			ret.textAlign = 'right';
		} else if (this.state.tipo.tipo == 'bool') {
			ret.textAlign = 'center';
		}

		return ret;
	}
	renderCelda(){
		return <td 	style={this.renderStyle()}
					onClick={this.accionCelda}
				>
					<div className="tabla-celda-div">
						{this.renderValor()}
						{this.renderEditar()}
					</div>
				</td>
	}
	renderIconoOrden(){
		let ret = '';

		if (this.props.orden) {
			if (this.state.orden > 0) {
				ret = 'icon icon-triangle';
			} else if (this.state.orden < 0) {
				ret = 'icon icon-triangle icon-inv';
			}
		}

		return ret;
	}
	renderCeldaHeader(){
		return <th style={this.renderStyle()} onClick={this.accionCelda} ><div className="tabla-celda-div"><i className={this.renderIconoOrden()}>{this.props.orden}</i>{this.props.datos}</div></th>
	}
	render(){
		return (
			this.props.header ? this.renderCeldaHeader() : this.renderCelda()
		);
    }
}
Celda.defaultProps = {
	datos: '',
	campo: '',
	tipo: 'string',
	header: false,
	combos_dataset: {},
	orden: 0,
	orden_desc: false,
	onClick(){},
	onResize(){},
	onChangeDesc(){}
};

export default Celda

