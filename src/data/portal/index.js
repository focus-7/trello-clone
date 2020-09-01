import React, { useEffect } from 'react'
import Portal from './Portal'
import './modal.css'

const BasePortal = (props) => {
    return (
        <>
            <div className='background-container'
            // onClick={props.callback}
            />
        </>
    )
}
const ModalBase = ({ component: Component, ...rest }) => {
    return (
        <Portal>
            <BasePortal {...rest} />
            <div className='modal-container' >
                <Component   {...rest} />
            </div>
        </Portal>
    )
}
const Modal = ({ component: Component, object, hook }) => {
    const [state, setState] = hook
    const callback = () => setState(!state)
    useEffect(() => {

        return () => {
        }
    }, [state])
    return (
        <div>
            {state ? <ModalBase hook={hook} callback={callback} object={object} component={Component} /> : null}
        </div>
    )
}
export default Modal