import React from 'react'
import ReactDOM from 'react-dom'

class TextField extends React.Component {
	constructor(props) {
		super(props);

		this.focus = this.focus.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);

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
	onFocus() {
		ReactDOM.findDOMNode(this).select();
	}
	onBlur(e) {
		return this.props.onBlur(e, this);
	}
	onKeyPress(e) {
		return this.props.onKeyPress(e, this);
	}
	render() {
		return (
			<input 
				defaultValue={this.state.valor}
				onClick={this.props.onClick}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyPress}
				onFocus={this.onFocus}
			/>
		);
    }
}
TextField.defaultProps = {
	valor: '',
	onClick(){},
	onBlur(){},
	onKeyPress(){},
	onLoad(){}
};

export default TextField

