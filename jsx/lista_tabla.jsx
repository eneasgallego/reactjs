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
						let eliminar = ()=>{
							let filas = tabla.state.filas.slice();
							let indice = filas.indice(item => {
								return (item[this.props.id_campo] == id);
							});
							if (!!~indice) {
								filas.splice(indice, 1);
								tabla.setState({filas: filas});
							}
							this.props.setDialogo();
						};

						if (this.props.persistir) {
							ajax({
								metodo: 'delete',
								url: this.props.url + '/' + id,
								success: eliminar
							}, tabla);
						} else {
							eliminar();
						}
					} else if (tag == 'cancelar') {
						this.props.setDialogo();
					}
				}
			});
		}
	}
	guardar(valor, field, celda, fila, tabla) {
		this.props.onAccion('GUARDAR', this.props.id, fila.getIdFila(), celda.props.campo, valor, this.props.persistir)
return;
		if (this.props.persistir) {
			let id = fila.getIdFila();
			let campo = celda.props.campo;
			let params = fila.props.datos;
			params[campo] = valor;
			let url = this.props.url;
			let metodo = 'post';

			let fn = response => {
				let filas = tabla.state.filas.slice();
				let indice = filas.indice(item => {
					return (item[this.props.id_campo] == id);
				});
				if (!!~indice) {
					let datos = filas[indice];
					if (metodo == 'post') {
						datos[this.props.id_campo] = response[this.props.id_campo];
					};
					datos[campo] = valor;
					filas[indice] = datos;
					tabla.setState({filas: filas});
				}
			};

			if (id) {
				for (let i = 0 ; i < this.state.cols.length ; i++) {
					let col = this.state.cols[i];

					if (col.campo && col.campo != campo) {
						params[col.campo] = fila.props.datos[col.campo];
					}
				}
				url += '/' + id;
				metodo = 'put';
			}

			ajax({
				metodo: metodo,
				url: url,
				params: params,
				success: fn
			}, tabla);
		} else {
			let id = fila.getIdFila();
			let campo = celda.props.campo;
			let params = fila.props.datos;
			params[campo] = valor;
			if (id) {
				for (let i = 0 ; i < this.state.cols.length ; i++) {
					let col = this.state.cols[i];

					if (col.campo && col.campo != campo) {
						params[col.campo] = fila.props.datos[col.campo];
					}
				}
			}

			let filas = tabla.state.filas.slice();
			let indice = filas.indice(item => {
				return (item[this.props.id_campo] == id);
			});
			if (!!~indice) {
				let datos = filas[indice];
				if (!id) {
					let generarId = ()=>{
						let id = 1;

						while(!!~filas.indice('id', id)) {
							id++;
						}

						return id;
					};
					datos[this.props.id_campo] = generarId();
				};
				datos[campo] = valor;
				filas[indice] = datos;
				tabla.setState({filas: filas});
			}
		}
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
	onAccion(){},
	onResizeFila(){},
	onLoad(){},
	setDialogo(){}
};

export default ListaTabla

