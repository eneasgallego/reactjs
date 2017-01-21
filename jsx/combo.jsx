import React from 'react'
import ReactDOM from 'react-dom'

class Combo extends React.Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.focus = this.focus.bind(this);
		this.onBlur = this.onBlur.bind(this);

		this.state = {
			valor: props.valor
		};
	}
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
		this.state.valor = e.currentTarget.value;
		return this.props.onChange(e, this);
	}
	getValor(){
		return this.state.valor;
	}
	getValorItem(){
		return this.props.dataset.buscar(this.props.combo.id, this.getValor());
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
				ref="combo"
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
Combo.defaultProps = {
	valor: '',
	combo: {},
	dataset: [],
	onClick(){},
	onBlur(){},
	onChange(){},
	onLoad(){}
};

export default Combo

