import React from 'react'
import ReactDOM from 'react-dom'

import Combo from './combo.jsx'
import CheckBox from './checkbox.jsx'
import TextField from './textfield.jsx'
import FiltroTabla from './filtrotabla.jsx'

class Celda extends React.Component {
	constructor(props) {
		super(props);

		this.accionCelda = this.accionCelda.bind(this);
		this.onKeyPressText = this.onKeyPressText.bind(this);
		this.onBlurTextField = this.onBlurTextField.bind(this);
		this.onChangeCombo = this.onChangeCombo.bind(this);
		this.onClickCheck = this.onClickCheck.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOutPanel = this.onMouseOutPanel.bind(this);
		this.onMouseOverPanel = this.onMouseOverPanel.bind(this);
		this.onClickPanel = this.onClickPanel.bind(this);
		this.onClosePanel = this.onClosePanel.bind(this);
		this.onFiltroFijado = this.onFiltroFijado.bind(this);
		this.setStateDelay = this.setStateDelay.bind(this);
		this.onFiltrado = this.onFiltrado.bind(this);

		this.state = {
			orden: props.orden ? props.orden_desc ? -1 : 1 : 0,
			editar: false,
			tipo: parseTipo(props.tipo),
			filtro: parseFiltro(props.filtro, props.tipo),
			mostrar_filtros_over: false,
			mostrar_filtros_over_panel: false,
			mostrar_filtros_click: false,
			onFiltroFijado: props.onFiltroFijado
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
	guardar(valor, field) {
		if (typeof(valor) === 'string' && (this.state.tipo.tipo == 'float' || this.state.tipo.tipo == 'int')) {
			if (!isNaN(valor)) {
				valor = parseFloat(valor);
				if (this.state.tipo.tipo == 'int') {
					valor = ~~valor;
				}
			}
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
	onMouseOver(e) {
		this.setStateDelay({mostrar_filtros_over: true}, 100);
	}
	onMouseOut(e) {
		this.setStateDelay({mostrar_filtros_over: false}, 100);
	}
	onMouseOverPanel(e, panel, panelflotante, filtrotabla) {
		this.setStateDelay({mostrar_filtros_over_panel: true}, 100);
	}
	onMouseOutPanel(e, panel, panelflotante, filtrotabla) {
		this.setStateDelay({mostrar_filtros_over_panel: false}, 100);
	}
	onFiltrado(valor, field, filtrotabla){
		let filtro = this.state.filtro;
		filtro.valor = valor;
		this.setState({filtro: filtro},()=>{
			this.props.onFiltrado.call(this, valor, field, filtrotabla, this);
		});
	}
	onFiltroFijado() {
		if (this.state.onFiltroFijado) {
			this.state.onFiltroFijado.call(this, this.state.mostrar_filtros_click ? this.props.campo : false, this);
		}
	}
	onClickPanel(e) {
		e.stopPropagation();
		if (!e.solo_mostrar || !this.state.mostrar_filtros_click) {
			this.setState({mostrar_filtros_click: !this.state.mostrar_filtros_click}, this.onFiltroFijado);
		}
		if (e.solo_mostrar) {
			delete e.solo_mostrar;
		}
	}
	onClosePanel(e) {
		this.setState({
			mostrar_filtros_over: false,
			mostrar_filtros_over_panel: false,
			mostrar_filtros_click: false
		},this.onFiltroFijado);
	}
	onClickField(e) {
		e.stopPropagation();
	}
	onBlurTextField(e, textfield) {
		return this.guardar(e.currentTarget.value, textfield);
	}
	onBlurField(e, field) {
		this.setState({editar: false});
	}
	onKeyPressText(e, textfield) {
		if (e.keyCode == 27 || e.charCode == 27) {
			this.setState({editar: false});
		} else if (e.keyCode == 13 || e.charCode == 13) {
			return this.guardar(e.currentTarget.value, textfield);
		}
	}
	onChangeCombo(e, combo) {
		return this.guardar(e.currentTarget.value, combo);
	}
	onClickCheck(valor, check) {
		return this.guardar(valor, check);
	}
	onLoadField(field) {
		field.focus();
	}
	setStateDelay(state, delay, callback){
		setTimeout(() => {
			this.setState(state, callback);
		}, delay);
	}
	changeOrden(){
		this.setState({
			orden: this.state.orden > 0 ? -1 : 1
		}, () => {
			this.props.onChangeDesc.call(this, this.state.orden, this);
		});
	}
	mostrarFiltros(){
		return this.state.mostrar_filtros_over || this.state.mostrar_filtros_over_panel || this.state.mostrar_filtros_click;
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
	renderFiltros(){
		let ret;

		if (this.state.filtro && this.props.mostrarFiltro(this) && this.mostrarFiltros()) {
			let filtro = clonar.call(this.state.filtro);
			filtro.lista = this.props.combos_dataset[this.props.campo];
			ret = 	<FiltroTabla
				tipo={this.state.filtro.tipo}
				valor={this.state.filtro.valor}
				filtro={filtro}
				onClick={this.onClickPanel}
				onClosePanel={this.onClosePanel}
				onMouseOver={this.onMouseOverPanel}
				onMouseOut={this.onMouseOutPanel}
				onFiltrado={this.onFiltrado}
			/>
		}

		return ret;
	}
	renderTitle(){
		let ret = '';

		if (this.state.filtro && this.state.filtro.valor) {
			if (typeof(this.state.filtro.valor) === 'string') {
				ret = this.state.filtro.valor;
			} else if (typeof(this.state.filtro.valor) === 'object') {
				if (this.state.filtro.tipo == 'int') {
					ret = this.state.filtro.valor.getTitulo();
				}
			}
		}

		return ret;
	}
	renderClassHeader(){
		let ret = '';

		if (this.state.filtro && this.state.filtro.valor && ((this.state.filtro.valor instanceof Array && this.state.filtro.valor.length) || !(this.state.filtro.valor instanceof Array))) {
			ret = 'filtrado';
		}

		return ret;
	}
	renderCeldaHeader(){
		return <th 	style={this.renderStyle()}
			onMouseOver={this.onMouseOver}
			onMouseOut={this.onMouseOut}
			onClick={this.accionCelda}
			title={this.renderTitle()}
			className={this.renderClassHeader()}
		>

			<div 	className="tabla-celda-div">
				<i 	className={this.renderIconoOrden()}>
							{this.props.orden}
				</i>
						{this.props.datos}
			</div>
					{this.renderFiltros()}
		</th>
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
	filtro: undefined,
	onClick(){},
	onResize(){},
	onChangeDesc(){},
	onFiltroFijado(){},
	mostrarFiltro(){},
	onFiltrado(){}
};

export default Celda

