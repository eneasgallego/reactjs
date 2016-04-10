import React from 'react'
import ReactDOM from 'react-dom'

class CheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valor: props.valor,
			onClick: props.onClick ? props.onClick : ()=>{},
			onBlur: props.onBlur ? props.onBlur : ()=>{},
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
	onClick(e) {
		e.stopPropagation();
		return this.state.onClick(e, this);
	}
	render() {
		return (
			<input 
				type="checkbox"
				defaultChecked={this.state.valor != '0'}
				onClick={this.onClick}
				onBlur={this.onBlur}
			/>
		);
    }
}

export default CheckBox

