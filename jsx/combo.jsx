import React from 'react'

class Combo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valor: props.valor
		};
	}
/*	getDefaultProps() {
		return {
			valor: '',
			combo: {},
			dataset: [],
			onClick(){},
			onBlur(){},
			onChange(){},
			onLoad(){}
		};
	},*/
	componentDidMount() {
		this.props.onLoad(this);
	}
	focus() {
		ReactDOM.findDOMNode(this).focus();
	}
	onBlur(e) {
		return this.props.onBlur(e, this);
	}
	onChange(e) {
		return this.props.onChange(e, this);
	}
	renderOptions() {
		let ret = [];

		ret.push(
			<option key={-1}></option>
		);
		for (let i = 0 ; i < this.props.dataset.length ; i++) {
			let item = this.props.dataset[i];

			ret.push(
				<option key={i} value={item[this.props.combo.id]}>{item[this.props.combo.texto]}</option>
			);
		}

		return ret;
	}
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
}

export default Combo

