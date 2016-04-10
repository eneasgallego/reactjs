window.Fila = React.createClass({
	getInitialState() {
    	return {
    		cols: parseCols(this.props.cols)
    	};
  	},
	getDefaultProps() {
		return {
			id_campo: '',
			datos: {},
			cols: [],
			acciones: [],
			combos_dataset: {},
			header: false,
			guardar: undefined,
    		anchos: [],
			orden: {},
			claseFila(){},
			onResize(){},
			onResizeCelda(){},
			onClickCelda(){},
			onClickAcciones(){},
			onChangeValor(){},
			onChangeDesc(){}
		};
	},
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
	},
	triggerResize(offset) {
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
	onResizeCelda(offset, celda) {
		this.props.onResizeCelda(offset, celda, this);
	},
	onChangeValor(valor, celda) {
		this.props.onChangeValor(valor, celda, this);
	},
	onChangeDesc(desc, celda) {
		this.props.onChangeDesc(desc, celda, this);
	},
	getIdFila()  {
		return this.props.datos[this.props.id_campo];
	},
	setIdFila(id) {
		this.props.datos[this.props.id_campo] = id;
	},
	guardar(valor, field, celda) {
		if (typeof(this.props.guardar) === 'function') {
			this.props.guardar(valor, field, celda, this);
		}
	},
	accionMenu(tag) {
		this.props.onClickAcciones(tag, this);
	},
	renderAcciones()  {
		let ret;

		if (this.props.acciones.length) {
			if (this.props.header) {
				ret = 
				<th key={this.state.cols.length}></th>
			} else {
				ret = 
				<td key={this.state.cols.length}>
					<Menu children={this.props.acciones} accion={this.accionMenu}/>
				</td>
			}
		}

		return ret;
	},
	orden(campo) {
		return (this.props.orden.campo == campo);
	},
	renderCeldas()  {
		let celdas = [];
		for (let i = 0 ; i < this.state.cols.length ; i++) {

			let col = this.state.cols[i];

			celdas.push(
				<Celda 
					key={i}
					datos={this.props.datos[col.campo]}
					campo={col.campo}
					guardar={this.guardar}
					onClick={this.props.onClickCelda}
					onChangeValor={this.onChangeValor}
					onChangeDesc={this.onChangeDesc}
					header={this.props.header}
					tipo={col.tipo}
					combos_dataset={this.props.combos_dataset}
					ancho={this.props.anchos[i]}
					orden={this.orden(col.campo)}
					orden_desc={this.orden(col.campo) && this.props.orden.desc}
					onResize={this.onResizeCelda}
				/>
			);
		}

		let acciones = this.renderAcciones();
		if (acciones) {
			celdas.push(acciones);
		}

		return celdas;
	},
	claseFila()  {
		let ret = this.props.header ? 'header' : '';

		let claseFila = this.props.claseFila(this.props.datos, this);
		if (claseFila) {
			ret += ' ' + claseFila;
		}

		return ret;
	},
	render() {
		return (
			<tr className={this.claseFila()} >
				{this.renderCeldas()}
			</tr>
		);
    }
});
