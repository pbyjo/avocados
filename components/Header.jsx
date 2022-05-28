import Link from 'next/link';
import { Fragment } from 'react';

/* Components */
import Logo from '@elements/Logo';
import Limiter from '@containers/Limiter';

/* styles */
import utilStyles from '@styles/utils';
import main from '@styles/main.module.scss';

function Header(props) {
    return (
        <Fragment>
            <header className='flex_row-center'>
                <Limiter className={main['limiter']}>
                    <Link href="/">
                        <a>
                            <Logo />
                        </a>
                    </Link>
                </Limiter>
            </header>
            <style jsx>{utilStyles}</style>
        </Fragment>
    );
}

export default Header;