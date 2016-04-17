import React from 'react'

import Boton from './boton.jsx'
import Menu from './menu.jsx'

class MenuItem extends React.Component {
	constructor(props) {
		super(props);

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);

		this.state = {
			mostrar_children: false
		};
	}
	accion(key, e) {
		e.stopPropagation();
		this.props.accion(key, e);
	}
	onMouseOver(e, boton) {
		this.setState({mostrar_children: true});
	}
	onMouseOut(e, boton) {
		this.setState({mostrar_children: false});
	}
	renderClassChild() {
		let ret = 'child';

		if (!this.state.mostrar_children) {
			ret += ' hidden';
		}

		return ret;
	}
	renderMenu() {
		let ret = '';
		if (this.props.menu instanceof Array && this.props.menu.length) {
			ret = <Menu className={this.renderClassChild()} children={this.props.menu} accion={this.accion}/>
		}

		return ret;
	}
	render() {
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
}
MenuItem.defaultProps = {
	texto: '',
	menu: [],
	accion(){}
};

export default MenuItem
