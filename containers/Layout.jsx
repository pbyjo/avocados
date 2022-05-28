import Head from 'next/head';
import { Fragment } from 'react';

/* Components */
import Header from '@components/Header';

/* Styles */
import globals from "@styles/globals.js";

function Layout(props) {
    const {children, title} = props
    return (
        <Fragment>
            <Head>
                <title>Avo store | {title}</title>
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <style jsx global>{globals}</style>
        </Fragment>
    );
}

export default Layout;