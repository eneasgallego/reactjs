import React from 'react'

import Menu from './menu.jsx'

class Dialogo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titulo: props.titulo ? props.titulo : 'Diálogo',
			puedeCerrar: typeof(props.puedeCerrar) === 'boolean' ? props.puedeCerrar : true,
			contenido: props.contenido ? props.contenido : 'Inserte el contenido',
			menu: props.menu ? props.menu : [],
			accionMenu: props.accionMenu ? props.accionMenu : ()=>{},
			cerrarDialogo: props.cerrarDialogo ? props.cerrarDialogo : ()=>{},
			top: undefined,
			left: undefined
		};
	}
	componentDidMount() {
		let dom = ReactDOM.findDOMNode(this);
		dom.addEventListener('resize', () => {
			this.dimensionar();
		});
		this.dimensionar();
	}
	dimensionar() {
		let dom = ReactDOM.findDOMNode(this);
		let contenedor = ReactDOM.findDOMNode(this.refs.contenedor);
		let ancho = (dom.offsetWidth - contenedor.offsetWidth) / 2;
		let alto = (dom.offsetHeight - contenedor.offsetHeight) / 2;

		this.setState({
			left: ancho,
			top: alto
		});
	}
	accionMenu(tag) {
		this.state.accionMenu(tag, this);
	}
	cerrarDialogo() {
		this.state.cerrarDialogo();
	}
	renderMenu() {
		let ret = undefined;

		if (this.state.menu.length) {
			ret = <Menu ref="menu" children={this.state.menu} accion={this.accionMenu}/>
		}

		return ret;
	}
	renderStyleContenedor() {
		let ret = {};

		if (this.state.left) {
			ret.left = this.state.left;
		}
		if (this.state.top) {
			ret.top = this.state.top;
		}

		return ret;
	}
	renderCerrar() {
		let ret;

		if (this.state.puedeCerrar) {
			ret = <i className="icon icon-cancel" onClick={this.cerrarDialogo}></i>
		}

		return ret;
	}
	render() {
		return (
			<div className="dialogo">
				<div ref="velo" className="dialogo-velo" onClick={this.cerrarDialogo}></div>

				<div ref="contenedor" className="dialogo-contenedor" style={this.renderStyleContenedor()}>
					<header>
						<h2>
							{this.state.titulo}
							{this.renderCerrar()}
						</h2>
					</header>

					<main ref="contenido" className="dialogo-contenido">
						{this.state.contenido}
					</main>

					{this.renderMenu()}
				</div>
			</div>
		);
    }
}

export default Dialogo

