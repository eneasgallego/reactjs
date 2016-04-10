window.Combo = React.createClass({
	getInitialState() {
    	return {
			valor: this.props.valor
    	};
  	},
	getDefaultProps() {
		return {
			valor: '',
			combo: {},
			dataset: [],
			onClick(){},
			onBlur(){},
			onChange(){},
			onLoad(){}
		};
	},
	componentDidMount() {
		this.props.onLoad(this);
	},
	focus() {
		ReactDOM.findDOMNode(this).focus();
	},
	onBlur(e) {
		return this.props.onBlur(e, this);
	},
	onChange(e) {
		return this.props.onChange(e, this);
	},
	renderOptions() {
		var ret = [];

		ret.push(
			<option key={-1}></option>
		);
		for (var i = 0 ; i < this.props.dataset.length ; i++) {
			var item = this.props.dataset[i];

			ret.push(
				<option key={i} value={item[this.props.combo.id]}>{item[this.props.combo.texto]}</option>
			);
		}

		return ret;
	},
	render() {
		return (
			<select 
				defaultValue={parseInt(this.state.valor)}
				onClick={this.props.onClick}
				onBlur={this.onBlur}
				onChange={this.onChange}
			>
			{this.renderOptions()}
			</select>
		);
    }
});
