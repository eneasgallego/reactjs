import React from 'react'

class TextField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valor: props.valor
		};
	}
/*	getDefaultProps() {
		return {
			valor: '',
			onClick(){},
			onBlur(){},
			onKeyPress(){},
			onLoad(){}
		};
	},*/
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

export default TextField

