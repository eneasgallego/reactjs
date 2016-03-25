window.PanelTabla = React.createClass({
	getInitialState: function() {
    	return {
			alto_tabla: undefined
    	};
  	},
	getDefaultProps: function() {
		return {
			id: '',
			titulo: '',
			url: '',
			params: {},
			id_campo: '',
			cols: [],
			acciones: [],
			claseFila: function(){},
			parseData: function(){},
			onResizeTabla: function(){},
			onClickAcciones: function(){}
		};
	},
	componentDidMount: function() {
	},
	onResizeTabla: function (offset, tabla) {
		var dom = ReactDOM.findDOMNode(this);
		var alto_panel = dom.offsetHeight;
		var dom_titulo = ReactDOM.findDOMNode(this.refs.titulo);
		var alto_titulo = dom_titulo.offsetHeight;
		var alto = alto_panel - alto_titulo;

		this.setState({alto_tabla: alto_tabla});
	},
	onClickAcciones: function (tag, fila, tabla) {
		this.props.onClickAcciones(tag, fila, tabla, this);
	},
	parseData: function (data, tabla) {
		var ret = this.props.parseData(data, tabla, this);

		return ret ? ret : data;
	},
	refrescar: function () {
		this.refs.tabla.refrescar();
	},
	renderStyleTabla: function () {

		var ret = {};

		if (this.state.alto_tabla) {
			ret.height = this.state.alto_tabla + 'px';
		}

		return ret;
	},
	renderTabla: function () {
		this.tabla = <Tabla
			ref="tabla"
			style={this.renderStyleTabla()}
			id_campo={this.props.id_campo}
			url={this.props.url}
			parseData={this.parseData}
			params={this.props.params}
			claseFila={this.props.claseFila}
			cols={this.props.cols}
			acciones={this.props.acciones}
			onResize={this.onResizeTabla}
			onClickAcciones={this.onClickAcciones}
		/>

		return this.tabla;
	},
	render: function() {
		return (
			<section id={this.props.id} className="panel">
				<h2 ref="titulo">{this.props.titulo}</h2>
				{this.renderTabla()}
			</section>
		);
    }
});
