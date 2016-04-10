import React from 'react'

class Combo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valor: props.valor,
			combo: props.combo ? props.combo : {},
			dataset: props.dataset ? props.dataset : [],
			onClick: props.onClick ? props.onClick : ()=>{},
			onBlur: props.onBlur ? props.onBlur : ()=>{},
			onChange: props.onChange ? props.onChange : ()=>{},
			onLoad: props.onLoad ? props.onLoad : ()=>{}
		};
	}
	componentDidMount() {
		this.state.onLoad(this);
	}
	focus() {
		ReactDOM.findDOMNode(this).focus();
	}
	onBlur(e) {
		return this.state.onBlur(e, this);
	}
	onChange(e) {
		return this.state.onChange(e, this);
	}
	renderOptions() {
		let ret = [];

		ret.push(
			<option key={-1}></option>
		);
		for (let i = 0 ; i < this.state.dataset.length ; i++) {
			let item = this.state.dataset[i];

			ret.push(
				<option key={i} value={item[this.state.combo.id]}>{item[this.state.combo.texto]}</option>
			);
		}

		return ret;
	}
	render() {
		return (
			<select 
				defaultValue={parseInt(this.state.valor)}
				onClick={this.state.onClick}
				onBlur={this.onBlur}
				onChange={this.onChange}
			>
			{this.renderOptions()}
			</select>
		);
    }
}

export default Combo

