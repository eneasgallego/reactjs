window.MenuItem = React.createClass({
	getInitialState: () => {
    	return {
    		mostrar_children: false
    	};
  	},
	getDefaultProps: () => {
		return {
			texto: '',
			accion: () => {},
			menu: []
		};
	},
	accion: (key, e) => {
		e.stopPropagation();
		this.props.accion(key, e);
	},
	onMouseOver: (e, boton) => {
		this.setState({mostrar_children: true});
	},
	onMouseOut: (e, boton) => {
		this.setState({mostrar_children: false});
	},
	renderClassChild: () => {
		var ret = 'child';

		if (!this.state.mostrar_children) {
			ret += ' hidden';
		}

		return ret;
	},
	renderMenu: () => {
		var ret = '';
		if (this.props.menu.length) {
			ret = <Menu className={this.renderClassChild()} children={this.props.menu} accion={this.accion}/>
		}

		return ret;
	},
	render: () => {
		return (
			<li	className="menu-item"
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
				onClick={this.accion.bind(this, this._reactInternalInstance._currentElement.key)}
			>
				<Boton	texto={this.props.texto} 

				/>
				{this.renderMenu()}
			</li>
		);
    }
});
