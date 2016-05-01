import React from 'react'
import ReactDOM from 'react-dom'

class CheckBox extends React.Component {
	constructor(props) {
		super(props);

		this.focus = this.focus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.getSeleccionado = this.getSeleccionado.bind(this);
		this.setSeleccionado = this.setSeleccionado.bind(this);

		this.state = {
			valor: props.valor
		};
	}
	componentDidMount() {
		this.props.onLoad.call(this, this);
	}
	focus() {
		ReactDOM.findDOMNode(this).focus();
	}
	onBlur(e) {
		this.props.onBlur.call(this, this.getSeleccionado(), this);
	}
	onChange(e) {
		this.props.onChange.call(this, this.getSeleccionado(), this);
	}
	onClick(e) {
		e.stopPropagation();
		this.props.onClick.call(this, this.getSeleccionado(), this);
	}
	getSeleccionado() {
		return this.refs.checkbox.checked;
	}
	setSeleccionado(seleccionado) {
		if (this.refs.checkbox.checked != seleccionado) {
			this.refs.checkbox.checked = seleccionado;
			this.props.onChange.call(this, seleccionado, this);
		}
	}
	render() {
		return (
			<input
				ref="checkbox"
				type="checkbox"
				defaultChecked={this.state.valor}
				onClick={this.onClick}
				onBlur={this.onBlur}
				onChange={this.onChange}
			/>
		);
	}
}
CheckBox.defaultProps = {
	valor: false,
	onClick(){},
	onBlur(){},
	onLoad(){},
	onChange(){}
};

export default CheckBox

