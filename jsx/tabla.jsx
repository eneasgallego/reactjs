window.Tabla = React.createClass({
	getInitialState() {
		return {
			filas_cargadas: false,
			cargando: false,
			filas: [],
			cols: parseCols(this.props.cols),
			combos_dataset: {},
			orden: this.props.orden instanceof Array ? this.props.orden : [this.props.orden],
			velo: false,
			anchos: [],
			alto_tabla: undefined,
			alto_body: undefined
		};
	},
	getDefaultProps() {

		return {
			id_campo: '',
			url_editar: '',
			url_crear: '',
			url: '',
			params: {},
			orden: [],
			cols: [],
			acciones: [],
			guardar: undefined,
			style: {},
			claseFila(){},
			parseData(){},
			onResize(){},
			onResizeFila(){},
			onResizeCelda(){},
			onChangeValor(){},
			onClickAcciones(){}
		};
	},
	componentWillUpdate() {
		if (this.isCombosCompletos()) {
			this.cargarFilas();
		}
	},
	componentDidMount() {
		if (this.isCombosCompletos()) {
			this.cargarFilas();
		} else {
			this.cargarCombos();
		}

		let dom = ReactDOM.findDOMNode(this);
		dom.addEventListener('resize', this.onResize);
		this.triggerResize({
			width: dom.offsetWidth,
			height: dom.offsetHeight,
			top: dom.offsetTop,
			left: dom.offsetLeft,
			index: dom.cellIndex
		});
	},
	parseData(data) {
		let ret = this.props.parseData(data, this);

		return ret ? ret : data;
	},
	triggerResize(offset) {
		this.calcAltoTabla();
		this.props.onResize(offset, this);
	},
	onResize(e) {
		this.triggerResize({
			width: e.currentTarget.offsetWidth,
			height: e.currentTarget.offsetHeight,
			top: e.currentTarget.offsetTop,
			left: e.currentTarget.offsetLeft,
			index: e.currentTarget.cellIndex
		});
	},
	onResizeCelda(offset, celda, fila) {
		let anchos = this.state.anchos;
		let ancho = anchos[offset.index];
		if ((!ancho) || ancho < offset.width) {
			anchos[offset.index] = offset.width;
			this.setState({anchos: anchos});
		}
		this.props.onResizeCelda(offset, celda, fila, this);
	},
	onResizeFila(offset, fila) {
		this.props.onResizeFila(offset, fila, this);
	},
	dimensionar() {
		this.calcAltoTabla();
	},
	calcAltoTabla() {
		let dom = ReactDOM.findDOMNode(this);
		let alto_tabla = dom.offsetHeight;
		let domMenu = dom.querySelector('.menu-tabla');
		if (domMenu) {
			alto_tabla -= domMenu.offsetHeight;
		}
		this.setState({alto_tabla: alto_tabla}, () => {
			this.calcAltoBody();
		});
	},
	calcAltoBody() {
		let dom = ReactDOM.findDOMNode(this);
		let domDiv = dom.querySelector('.tabla-div');
		let alto_body = domDiv.offsetHeight;
		let domHead = domDiv.querySelector('thead');
		alto_body -= domHead.offsetHeight;

		this.setState({alto_body: alto_body});
	},
	onChangeValor(valor, celda, fila) {
		this.props.onChangeValor(valor, celda, fila, this);
	},
	guardar(valor, field, celda, fila) {
		if (typeof(this.props.guardar) === 'function') {
			this.props.guardar(valor, field, celda, fila, this);
		}
	},
	accionMenu(tag) {
		if (tag == 'nuevo') {
			this.nuevaFila();
		}
	},
	getValorDefecto(tipo) {
		let ret;

		if (tipo == 'string') {
			ret = '';
		} else if (tipo == 'int' || tipo == 'float' || tipo == 'object') {
			ret = 0;
		} else if (tipo == 'bool') {
			ret = false;
		}

		return ret;
	},
	nuevaFila() {
		let filas = this.state.filas.slice();
		let obj = {};
		for (let i = 0 ; i < this.props.cols.length ; i++) {
			let col = this.props.cols[i];

			obj[col.campo] = this.getValorDefecto(col.tipo.tipo);
		}
		filas.push(obj);
		this.setState({
			filas: filas
		});
	},
	cargarFilas(fn) {
		if (!this.state.filas_cargadas && !this.state.cargando) {
			this.setState({cargando: true}, () => {
				ajax({
					metodo: 'get',
					params: this.props.params,
					url: this.props.url,
					success: res => {
						let data = this.parseData(res);

						this.setState({
							filas: data,
							filas_cargadas: true,
							cargando: false
						}, () => {
							if (typeof(fn) === 'function') {
								fn.call(this);
							}
						});
					}
				}, this);
			});
		}
	},
	isCombosCompletos() {
		let ret = true;
		for (let i = 0 ; i < this.state.cols.length ; i++) {
			let col = this.state.cols[i];

			if (col.tipo.tipo == 'object') {
				if (this.state.combos_dataset && !this.state.combos_dataset[col.campo]) {
					ret = false;
					break;
				}
			}
		}

		return ret;
	},
	cargarCombos() {
		let cargarCombo = col => {

			let params = {
				_sort: col.tipo.texto,
				_order: 'ASC'
			};

			ajax({
				metodo: 'get',
				url: col.tipo.url,
				params: params,
				success: response => {
					let combos_dataset = this.state.combos_dataset;
					combos_dataset[col.campo] = response;
					this.setState({combos_dataset: combos_dataset});
				}
			}, this);
		};

		for (let i = 0 ; i < this.state.cols.length ; i++) {
			let col = this.state.cols[i];

			if (col.tipo.tipo == 'object') {
				if (!this.state.combos_dataset[col.campo]) {
					cargarCombo(col);
				}
			}
		}

	},
	onClickCelda(e, celda) {
		e.preventDefault();
		if (!celda.props.header && this.props.guardar) {
			celda.setState({editar:true});
		}
	},
	onClickAcciones(tag, fila) {
		this.props.onClickAcciones(tag, fila, this);
	},
	onClickCeldaHeader(e, celda) {
		e.preventDefault();
		celda.changeOrden();
	},
	ordenar(orden, celda, fila) {

		var state = this.state.orden;

		var elOrden = state.buscar('campo', celda.props.campo);
		if (elOrden) {
			state = state.slice(elOrden);
			elOrden.desc = !elOrden.desc;
		} else {
			elOrden = {
				campo: celda.props.campo,
				desc: orden < 0
			};
		}

		state.splice(0, 0, elOrden);

		this.setState(state);
	},
	refrescar() {
		this.state.filas_cargadas = false;
		this.cargarFilas(this.forceUpdate);
	},
	renderMenu() {
		let ret;

		if (this.props.guardar) {
			let menu = [{
				texto: 'NUEVO',
				tag: 'nuevo'
			}];
			ret = <Menu ref="menu" className="menu-tabla" children={menu} accion={this.accionMenu}></Menu>
		}

		return ret;
	},
	renderFilas() {
		let filas = [];

		for (let i = 0 ; i < this.state.filas.length ; i++) {

			let fila = this.state.filas[i];
			let objFila = <Fila
				key={i}
				cols={this.state.cols}
				datos={fila}
				guardar={this.guardar}
				id_campo={this.props.id_campo}
				acciones={this.props.acciones}
				claseFila={this.props.claseFila}
				onResize={this.onResizeFila}
				onResizeCelda={this.onResizeCelda}
				onClickCelda={this.onClickCelda}
				onClickAcciones={this.onClickAcciones}
				onChangeValor={this.onChangeValor}
				combos_dataset={this.state.combos_dataset}
				anchos={this.state.anchos}
			/>

			if (this.state.orden.length) {
				let ordenar = (datos, prof) => {
					let orden = this.state.orden[prof];
					let ret = false;

					if (orden) {
						let campo = orden.campo;
						let desc = orden.desc;

						let valor1;
						let valor2;
						if (typeof(campo) === 'function') {
							valor1 = campo(datos);
							valor2 = campo(fila);
						} else {
							valor1 = parseFloat(datos[campo]);
							valor2 = parseFloat(fila[campo]);
						}

						valor1 = isNaN(valor1) ? datos[campo] : valor1;
						valor2 = isNaN(valor2) ? fila[campo] : valor2;

						ret = (((valor1 == valor2) && ordenar(datos, prof+1)) ||
						(desc && valor1 < valor2) ||
						((!desc) && valor1 > valor2));
					}

					return ret;
				};
				let index = filas.indice((v, k) => {
					return ordenar(v.props.datos, 0);
				});
				if (!~index) {
					filas.push(objFila);
				} else {
					filas.splice(index, 0, objFila);
				}
			} else {
				filas.push(objFila);
			}
		}

		return filas;
	},
	renderVelo() {
		let ret;

		if (this.state.velo) {
			ret = 	<div className="velo">
				<div className="velo-fondo" />
				<div className="velo-imagen" />
			</div>
		}

		return ret;
	},
	renderStyleBody() {
		let ret = {};

		if (this.state.alto_body) {
			ret.height = this.state.alto_body + 'px';
		}

		return ret;
	},
	renderStyleTabla() {
		let ret = {};

		if (this.state.alto_tabla) {
			ret.height = this.state.alto_tabla + 'px';
		}

		return ret;
	},
	renderTabla() {
		let ret;

		let datos_header = {};
		for (let i = 0 ; i < this.state.cols.length ; i++) {
			let col = this.state.cols[i];

			datos_header[col.campo] = col.texto;
		}

		return (
			<div className="tabla-div" style={this.renderStyleTabla()}>
				<table className="tabla">
					<thead>
						<Fila
							header={true}
							ref={this.refFilas}
							cols={this.state.cols}
							datos={datos_header}
							onResize={this.onResizeFila}
							onResizeCelda={this.onResizeCelda}
							onClickCelda={this.onClickCeldaHeader}
							onChangeDesc={this.ordenar}
							acciones={this.props.acciones}
							combos_dataset={this.state.combos_dataset}
							anchos={this.state.anchos}
							orden={this.state.orden}
						/>
					</thead>
					<tbody style={this.renderStyleBody()}>
						{this.renderFilas()}
					</tbody>
				</table>
			</div>
		);
	},
	render() {
		return (
			<div className="tabla-cont" style={this.props.style}>
				{this.renderMenu()} 
				{this.renderTabla()} 
				{this.renderVelo()}
			</div>
		);
	}
});
