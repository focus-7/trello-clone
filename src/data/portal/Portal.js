import React from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.getElementById('root-portal')

class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.element = document.createElement('div')
        this.element.className = 'portal'

    }
    componentWillMount() {
    }

    componentDidMount() {
        modalRoot.appendChild(this.element)
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.element)
    }
    render() {
        return createPortal(this.props.children, this.element)
    }
}

export default Portal;