import React from 'react';

import './Backdrop.css';

const backdrop = ({ show }) => (
    show ? <div
        className='Backdrop'
        onClick={props.clicked}></div> : null
);

export default backdrop;