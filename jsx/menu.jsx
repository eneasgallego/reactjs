import React from 'react'

import MenuItem from './menu_item.jsx'

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			className: props.className ? props.className : '',
			children: props.children ? props.children : [],
			accion: props.accion ? props.accion : ()=>{}
		};
	}
	renderChildren() {
		let ret = [];

		for (let i = 0 ; i < this.state.children.length ; i++) {
			let child = this.state.children[i];
			ret.push(<MenuItem key={child.tag} texto={child.texto} accion={this.state.accion} menu={child.menu}/>)
		}

		return ret;
	}
	render() {
		return (
			<nav className={this.state.className}>
				<ul className="menu">
					{this.renderChildren()}
				</ul>
			</nav>
		);
    }
}

export default Menu
