import React from 'react'

import Boton from './boton.jsx'
import Menu from './menu.jsx'

class MenuItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			texto: props.texto ? props.texto : '',
			menu: props.menu ? props.menu : [],
			mostrar_children: false,
			accion: props.accion ? props.accion : ()=>{}
		};
	}
	accion(key, e) {
		e.stopPropagation();
		this.state.accion(key, e);
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
		if (this.state.menu instanceof Array && this.state.menu.length) {
			ret = <Menu className={this.renderClassChild()} children={this.state.menu} accion={this.accion}/>
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
				<Boton	texto={this.state.texto}

				/>
				{this.renderMenu()}
			</li>
		);
    }
}

export default MenuItem
