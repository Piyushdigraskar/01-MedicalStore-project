import React, {Fragment} from "react";
import classes from './Modal.module.css';
import reactDom from 'react-dom';

const BackDrop = (props)=>{
    return <div className={classes.backdrop}>{props.children}</div>
}

const ModalOverlays = (props)=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

const Modal = (props)=>{
    return <Fragment>
        {reactDom.createPortal(<BackDrop onClose={props.onClose}/>,portalElement)}
        {reactDom.createPortal(<ModalOverlays>{props.children}</ModalOverlays>,portalElement)}
    </Fragment>
}

export default Modal;