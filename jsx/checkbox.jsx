window.CheckBox = React.createClass({
	getInitialState: () => {
    	return {
			valor: this.props.valor,
    	};
  	},
	getDefaultProps: () => {
		return {
			valor: '',
			onClick: () => {},
			onBlur: () => {},
			onLoad: () => {}
		};
	},
	componentDidMount: () => {
		this.props.onLoad(this);
	},
	focus: () => {
		ReactDOM.findDOMNode(this).focus();
	},
	onBlur: e => {
		return this.props.onBlur(e, this);
	},
	onClick: e => {
		e.stopPropagation();
		return this.props.onClick(e, this);
	},
	render: () => {
		return (
			<input 
				type="checkbox"
				defaultChecked={this.state.valor != '0'}
				onClick={this.onClick}
				onBlur={this.onBlur}
			/>
		);
    }
});
