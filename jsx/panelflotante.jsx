import React from 'react'
import ReactDOM from 'react-dom'

import Panel from './panel.jsx'

class PanelFlotante extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render(){
        return <Panel className="flotante"></Panel>
    }
}
PanelFlotante.defaultProps = {
};

export default PanelFlotante

