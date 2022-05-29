import css from 'styled-jsx/css';

import {fonts, sizes, colors} from '@styles/config';

const globals = css.global`
    * {
        margin: 0;
        padding: 0;
    }
    
    body {
        width: 100%;
        height: 100%;
        min-height: 100vh;
        font-family: ${fonts.base};
        font-size: ${sizes.fontSize};
        color: ${colors.blackColor};
        background-color: ${colors.whiteColor};
        box-sizing: border-box;
    }

    main {
        min-height: 100vh;
    }

    header {
        width: 100%;
        height: ${sizes.heightHeader};
        display: flex;

        -webkit-box-shadow: 0px 2px 3px -2px rgba(0,0,0,0.38);
        -moz-box-shadow: 0px 2px 3px -2px rgba(0,0,0,0.38);
        box-shadow: 0px 2px 3px -2px rgba(0,0,0,0.38);
    }

    a {
        text-decoration: none;
    }

    p {
        text-align: justify;
    }
`;

export default globals;