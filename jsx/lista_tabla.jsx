import React from 'react'

import Tabla from './tabla.jsx'

class ListaTabla extends React.Component {
	constructor(props) {
		super(props);

		this.guardar = this.guardar.bind(this);
		this.onClickAcciones = this.onClickAcciones.bind(this);
		this.onResizeFila = this.onResizeFila.bind(this);
		this.dimensionar = this.dimensionar.bind(this);
		this.onNuevaFila = this.onNuevaFila.bind(this);

		this.state = {
			cols: parseCols(props.cols)
		};
	}
	componentDidMount() {
		this.props.onLoad(this);
	}
	dimensionar(alto) {
		this.refs.tabla.dimensionar(alto);
	}
	acciones() {
		if (this.props.eliminar) {
			return [{
				texto: 'Eliminar',
				tag: 'eliminar'
			}];
		}
		return [];
	}
	onResizeFila(offset, fila, tabla) {
		this.props.onResizeFila(offset, fila, tabla, this);
	}
	onNuevaFila(obj) {
		this.props.onNuevaFila(this.props.id, obj);
	}
	onClickAcciones(tag) {
		let fn = this[tag];

		if (typeof(fn) === 'function') {
			fn.apply(this, arguments);
		}
	}
	getValor(){
		return this.refs.tabla.getValor();
	}
	eliminar(tag, fila, tabla) {
		let id = fila.getIdFila();
		if (id) {
			this.props.setDialogo({
				titulo: 'Eliminar',
				puedeCerrar: false,
				contenido: '¿Seguro de querer eliminar la fila?',
				menu: [{
					texto: 'Aceptar',
					tag: 'aceptar'
				}, {
					texto: 'Cancelar',
					tag: 'cancelar'
				}],
				accionMenu: tag => {
					if (tag == 'aceptar') {
						this.props.onEliminar(this.props.id, id, this.props.persistir);
					}
					this.props.setDialogo();
				}
			});
		}
	}
	guardar(valor, field, celda, fila, tabla) {
		this.props.onAccion('GUARDAR', this.props.id, fila.getIdFila(), celda.props.campo, valor, this.props.persistir)
	}
	render() {
		return (
			<Tabla
				ref="tabla"
				id_campo={this.props.id_campo}
				guardar={this.guardar}
				url={this.props.url}
				cols={this.state.cols}
				acciones={this.acciones()}
				onClickAcciones={this.onClickAcciones}
				onResizeFila={this.onResizeFila}
				onNuevaFila={this.onNuevaFila}
				bd={this.props.bd}
				filas={this.props.filas}
			/>
		);
	}
}
ListaTabla.defaultProps = {
	cols: [],
	id_campo: '',
	url: '',
	bd: {},
	filas: [],
	eliminar: false,
	persistir: true,
	onNuevaFila(){},
	onEliminar(){},
	onAccion(){},
	onResizeFila(){},
	onLoad(){},
	setDialogo(){}
};

export default ListaTabla

