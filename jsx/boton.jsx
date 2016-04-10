window.Boton = React.createClass({
	getDefaultProps: () => {
		return {
			texto: '',
			accion: () => {}
		};
	},
	render: () => {
		return (
			<a 	href="#!" 
				onClick={this.props.accion}
			>
				{this.props.texto}
			</a> 
		);
    }
});
