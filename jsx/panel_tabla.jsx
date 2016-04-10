import React from 'react'

import Tabla from './tabla.jsx'

class PanelTabla extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alto_tabla: undefined
		};
	}
/*	getDefaultProps() {
		return {
			id: '',
			titulo: '',
			url: '',
			params: {},
			orden: {},
			id_campo: '',
			cols: [],
			acciones: [],
			claseFila(){},
			parseData(){},
			onResize(){},
			onResizeTabla(){},
			onClickAcciones(){}
		};
	},*/
	onResizeTabla(offset, tabla) {
		this.props.onResizeTabla(offset, tabla, this);
		this.props.onResize(offset, this);
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
		this.props.onClickAcciones(tag, fila, tabla, this);
	}
	parseData(data, tabla) {
		let ret = this.props.parseData(data, tabla, this);

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
			id_campo={this.props.id_campo}
			url={this.props.url}
			parseData={this.parseData}
			params={this.props.params}
			orden={this.props.orden}
			claseFila={this.props.claseFila}
			cols={this.props.cols}
			acciones={this.props.acciones}
			onResize={this.onResizeTabla}
			onClickAcciones={this.onClickAcciones}
		/>

		return this.tabla;
	}
	render() {
		return (
			<section id={this.props.id} className="panel">
				<h2 ref="titulo">{this.props.titulo}</h2>
				{this.renderTabla()}
			</section>
		);
	}
}

export default PanelTabla
