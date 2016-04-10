import React from 'react'

import Celda from './celda.jsx'
import Menu from './menu.jsx'

class Fila extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id_campo: props.id_campo ? props.id_campo : '',
			datos: props.datos ? props.datos : {},
			acciones: props.acciones ? props.acciones : [],
			combos_dataset: props.combos_dataset ? props.combos_dataset : {},
			header: props.header ? props.header : false,
			anchos: props.anchos ? props.anchos : [],
			orden: props.orden ? props.orden : {},
			cols: parseCols(props.cols),
			claseFila: props.claseFila ? props.claseFila : ()=>{},
			onResize: props.onResize ? props.onResize : ()=>{},
			onResizeCelda: props.onResizeCelda ? props.onResizeCelda : ()=>{},
			onClickCelda: props.onClickCelda ? props.onClickCelda : ()=>{},
			onClickAcciones: props.onClickAcciones ? props.onClickAcciones : ()=>{},
			onChangeValor: props.onChangeValor ? props.onChangeValor : ()=>{},
			onChangeDesc: props.onChangeDesc ? props.onChangeDesc : ()=>{}
		};
	}
	componentDidMount() {
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
		this.state.onResize(offset, this);
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
	onResizeCelda(offset, celda) {
		this.state.onResizeCelda(offset, celda, this);
	}
	onChangeValor(valor, celda) {
		this.state.onChangeValor(valor, celda, this);
	}
	onChangeDesc(desc, celda) {
		this.state.onChangeDesc(desc, celda, this);
	}
	getIdFila()  {
		return this.state.datos[this.state.id_campo];
	}
	setIdFila(id) {
		this.state.datos[this.state.id_campo] = id;
	}
	guardar(valor, field, celda) {
		if (typeof(this.props.guardar) === 'function') {
			this.props.guardar(valor, field, celda, this);
		}
	}
	accionMenu(tag) {
		this.state.onClickAcciones(tag, this);
	}
	renderAcciones()  {
		let ret;

		if (this.state.acciones.length) {
			if (this.state.header) {
				ret = 
				<th key={this.state.cols.length}></th>
			} else {
				ret = 
				<td key={this.state.cols.length}>
					<Menu children={this.state.acciones} accion={this.accionMenu}/>
				</td>
			}
		}

		return ret;
	}
	orden(campo) {
		return (this.state.orden.campo == campo);
	}
	renderCeldas()  {
		let celdas = [];
		for (let i = 0 ; i < this.state.cols.length ; i++) {

			let col = this.state.cols[i];

			celdas.push(
				<Celda 
					key={i}
					datos={this.state.datos[col.campo]}
					campo={col.campo}
					guardar={this.guardar}
					onClick={this.state.onClickCelda}
					onChangeValor={this.onChangeValor}
					onChangeDesc={this.onChangeDesc}
					header={this.state.header}
					tipo={col.tipo}
					combos_dataset={this.state.combos_dataset}
					ancho={this.state.anchos[i]}
					orden={this.orden(col.campo)}
					orden_desc={this.orden(col.campo) && this.state.orden.desc}
					onResize={this.onResizeCelda}
				/>
			);
		}

		let acciones = this.renderAcciones();
		if (acciones) {
			celdas.push(acciones);
		}

		return celdas;
	}
	claseFila()  {
		let ret = this.state.header ? 'header' : '';

		let claseFila = this.state.claseFila(this.state.datos, this);
		if (claseFila) {
			ret += ' ' + claseFila;
		}

		return ret;
	}
	render() {
		return (
			<tr className={this.claseFila()} >
				{this.renderCeldas()}
			</tr>
		);
    }
}

export default Fila

