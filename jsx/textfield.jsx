import React from 'react'
import ReactDOM from 'react-dom'

class TextField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valor: props.valor,
			onClick: props.onClick ? props.onClick : ()=>{},
			onBlur: props.onBlur ? props.onBlur : ()=>{},
			onKeyPress: props.onKeyPress ? props.onKeyPress : ()=>{},
			onLoad: props.onLoad ? props.onLoad : ()=>{}
		};
	}
	componentDidMount() {
		this.state.onLoad(this);
	}
	focus() {
		ReactDOM.findDOMNode(this).focus();
	}
	onFocus() {
		ReactDOM.findDOMNode(this).select();
	}
	onBlur(e) {
		return this.state.onBlur(e, this);
	}
	onKeyPress(e) {
		return this.state.onKeyPress(e, this);
	}
	render() {
		return (
			<input 
				defaultValue={this.state.valor}
				onClick={this.state.onClick}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyPress}
				onFocus={this.onFocus}
			/>
		);
    }
}

export default TextField

