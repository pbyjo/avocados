import React from 'react';

/* Styles */
import main from '@styles/main.module.scss';

function Limiter(props) {
    return (
        <div className={main['limiter']}>
            {props.children}
        </div>
    );
}

export default Limiter;