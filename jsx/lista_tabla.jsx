import React from 'react'

import Tabla from './tabla.jsx'

class ListaTabla extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id_campo: props.id_campo ? props.id_campo : '',
			url: props.url ? props.url : '',
			eliminar: props.eliminar ? props.eliminar : false,
			cols: parseCols(props.cols),
			setDialogo: props.setDialogo ? props.setDialogo : ()=>{}
		};
	}
	acciones() {
		if (this.state.eliminar) {
			return [{
				texto: 'Eliminar',
				tag: 'eliminar'
			}];
		}
		return [];
	}
	onClickAcciones(tag) {
		let fn = this[tag];

		if (typeof(fn) === 'function') {
			fn.apply(this, arguments);
		}
	}
	eliminar(tag, fila, tabla) {

		let id = fila.getIdFila();
		if (id) {
			this.state.setDialogo({
				titulo: 'Eliminar',
				puedeCerrar: false,
				contenido: '¿Seguro de querer eliminar la fila?',
				menu: [{
					texto: 'Aceptar',
					tag: 'aceptar'
				},{
					texto: 'Cancelar',
					tag: 'cancelar'
				}],
				accionMenu: tag => {
					if (tag == 'aceptar') {
						ajax({
							metodo: 'delete',
							url: this.state.url + '/' + id,
							success: response => {
								let filas = tabla.state.filas.slice();
								let indice = filas.indice(item => {
									return (item[this.state.id_campo] == id);
								});
								if (!!~indice) {
									filas.splice(indice, 1);
									tabla.setState({filas: filas});
								}
								this.state.setDialogo();
							}
						}, tabla);
					} else if (tag == 'cancelar') {
						this.state.setDialogo();
					}
				}
			});
		}
	}
	guardar(valor, field, celda, fila, tabla) {
		let id = fila.getIdFila();
		let campo = celda.props.campo;
		let params = fila.props.datos;
		params[campo] = valor;
		let url = this.state.url;
		let metodo = 'post';

		let fn = response => {
			let filas = tabla.state.filas.slice();
			let indice = filas.indice(item => {
				return (item[this.state.id_campo] == id);
			});
			if (!!~indice) {
				let datos = filas[indice];
				if (metodo == 'post') {
					datos[this.state.id_campo] = response[this.state.id_campo];
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
	}
	render() {
		return (
			<Tabla
				id_campo={this.state.id_campo}
				guardar={this.guardar}
				url={this.state.url}
				cols={this.state.cols}
				acciones={this.acciones()}
				onClickAcciones={this.onClickAcciones}
			/>
		);
    }
}

export default ListaTabla

