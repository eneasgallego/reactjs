window.ListaTabla = React.createClass({
	getInitialState() {
    	return {
    		cols: parseCols(this.props.cols)
    	};
  	},
	getDefaultProps() {
		return {
			id_campo: '',
			url: '',
			cols: [],
			eliminar: false,
			setDialogo(){}
		};
	},
	acciones() {
		if (this.props.eliminar) {
			return [{
				texto: 'Eliminar',
				tag: 'eliminar'
			}];
		}
		return [];
	},
	onClickAcciones(tag) {
		var fn = this[tag];

		if (typeof(fn) === 'function') {
			fn.apply(this, arguments);
		}
	},
	eliminar(tag, fila, tabla) {

		var id = fila.getIdFila();
		if (id) {
			this.props.setDialogo({
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
							url: this.props.url + '/' + id,
							success: response => {
								var filas = tabla.state.filas.slice();
								var indice = filas.indice(item => {
									return (item[this.props.id_campo] == id);
								});
								if (!!~indice) {
									filas.splice(indice, 1);
									tabla.setState({filas: filas});
								}
								this.props.setDialogo();
							}
						}, tabla);
					} else if (tag == 'cancelar') {
						this.props.setDialogo();
					}
				}
			});
		}
	},
	guardar(valor, field, celda, fila, tabla) {
		var id = fila.getIdFila();
		var campo = celda.props.campo;
		var params = fila.props.datos;
		params[campo] = valor;
		var url = this.props.url;
		var metodo = 'post';

		var fn = response => {
			var filas = tabla.state.filas.slice();
			var indice = filas.indice(item => {
				return (item[this.props.id_campo] == id);
			});
			if (!!~indice) {
				var datos = filas[indice];
				if (metodo == 'post') {
					datos[this.props.id_campo] = response[this.props.id_campo];
				};
				datos[campo] = valor;
				filas[indice] = datos;
				tabla.setState({filas: filas});
			}
		};

		if (id) {
			for (var i = 0 ; i < this.state.cols.length ; i++) {
				var col = this.state.cols[i];

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
	},
	render() {
		return (
			<Tabla
				id_campo={this.props.id_campo}
				guardar={this.guardar}
				url={this.props.url}
				cols={this.state.cols}
				acciones={this.acciones()}
				onClickAcciones={this.onClickAcciones}
			/>
		);
    }
});
