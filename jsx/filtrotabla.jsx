import React from 'react'
import ReactDOM from 'react-dom'

import PanelFlotante from './panelflotante.jsx'

class FiltroTabla extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    render(){
        return <PanelFlotante></PanelFlotante>
    }
}
FiltroTabla.defaultProps = {
};

export default FiltroTabla

