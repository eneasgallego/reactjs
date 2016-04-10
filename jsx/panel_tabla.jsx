import React from 'react'
import ReactDOM from 'react-dom'

import Tabla from './tabla.jsx'

class PanelTabla extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id ? props.id : '',
			titulo: props.titulo ? props.titulo : '',
			url: props.url ? props.url : '',
			id_campo: props.id_campo ? props.id_campo : '',
			params: props.params ? props.params : {},
			orden: props.orden ? props.orden : {},
			cols: props.cols ? props.cols : [],
			acciones: props.acciones ? props.acciones : [],
			alto_tabla: undefined,
			claseFila: props.claseFila ? props.claseFila : ()=>{},
			parseData: props.parseData ? props.parseData : ()=>{},
			onResize: props.onResize ? props.onResize : ()=>{},
			onResizeTabla: props.onResizeTabla ? props.onResizeTabla : ()=>{},
			onClickAcciones: props.onClickAcciones ? props.onClickAcciones : ()=>{}
		};
	}
	onResizeTabla(offset, tabla) {
		this.state.onResizeTabla(offset, tabla, this);
		this.state.onResize(offset, this);
	}
	dimensionar() {
		let dom = ReactDOM.findDOMNode(this);
		let alto_panel = dom.offsetHeight;
		let dom_titulo = ReactDOM.findDOMNode(this.refs.titulo);
		let alto_titulo = dom_titulo.offsetHeight;
		let alto_tabla = alto_panel - alto_titulo;

		this.setState({alto_tabla: alto_tabla}, () => {
			for (let i in this.refs) {
				let ref = this.refs[i];

				if (typeof(ref.dimensionar) === 'function') {
					ref.dimensionar();
				}
			}
		});
	}
	onClickAcciones(tag, fila, tabla) {
		this.state.onClickAcciones(tag, fila, tabla, this);
	}
	parseData(data, tabla) {
		let ret = this.state.parseData(data, tabla, this);

		return ret ? ret : data;
	}
	refrescar() {
		this.refs.tabla.refrescar();
	}
	renderStyleTabla() {

		let ret = {};

		if (this.state.alto_tabla) {
			ret.height = this.state.alto_tabla + 'px';
		}

		return ret;
	}
	renderTabla() {
		this.tabla = <Tabla
			ref="tabla"
			style={this.renderStyleTabla()}
			id_campo={this.state.id_campo}
			url={this.state.url}
			parseData={this.parseData}
			params={this.state.params}
			orden={this.state.orden}
			claseFila={this.state.claseFila}
			cols={this.state.cols}
			acciones={this.state.acciones}
			onResize={this.onResizeTabla}
			onClickAcciones={this.onClickAcciones}
		/>

		return this.tabla;
	}
	render() {
		return (
			<section id={this.state.id} className="panel">
				<h2 ref="titulo">{this.state.titulo}</h2>
				{this.renderTabla()}
			</section>
		);
	}
}

export default PanelTabla
