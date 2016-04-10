import React from 'react'
import ReactDOM from 'react-dom'

class CheckBox extends React.Component {
	constructor(props) {
		super(props);
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
	onClick(e) {
		e.stopPropagation();
		return this.props.onClick(e, this);
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
CheckBox.defaultProps = {
	valor: '',
	onClick(){},
	onBlur(){},
	onLoad(){}
};

export default CheckBox

