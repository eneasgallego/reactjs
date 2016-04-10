window.Menu = React.createClass({
	getDefaultProps() {
		return {
			className: '',
			children: [],
			accion(){}
		};
	},
	renderChildren() {
		var ret = [];

		for (var i = 0 ; i < this.props.children.length ; i++) {
			var child = this.props.children[i];
			ret.push(<MenuItem key={child.tag} texto={child.texto} accion={this.props.accion} menu={child.menu}/>)
		}

		return ret;
	},
	render() {
		return (
			<nav className={this.props.className}>
				<ul className="menu">
					{this.renderChildren()}
				</ul>
			</nav>
		);
    }
});
