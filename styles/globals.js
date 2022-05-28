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

    header {
        width: 100%;
        height: ${sizes.heightHeader};
        display: flex;
    }

    a {
        text-decoration: none;
    }
`;

export default globals;