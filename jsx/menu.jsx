import React from 'react'

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contenido: 'inicio',
			alto: undefined,
			dialogo: undefined
		};
	}
/*	getDefaultProps() {
		return {
			className: '',
			children: [],
			accion(){}
		};
	}*/
	renderChildren() {
		let ret = [];

		for (let i = 0 ; i < this.props.children.length ; i++) {
			let child = this.props.children[i];
			ret.push(<MenuItem key={child.tag} texto={child.texto} accion={this.props.accion} menu={child.menu}/>)
		}

		return ret;
	}
	render() {
		return (
			<nav className={this.props.className}>
				<ul className="menu">
					{this.renderChildren()}
				</ul>
			</nav>
		);
    }
}

export default Menu
