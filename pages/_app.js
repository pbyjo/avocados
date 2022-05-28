/* Styles */
import main from "@styles/main.module.scss";

function myApp ({Component, pageProps}) {
    /* Providers - Context/Providers, Theme, data */
    /* Layout */
    /* Props adicionales */
    return <Component 
                container={main['main-container']}
                figureLogo={main['figure-logo']} 
                {...pageProps} 
            />
}

export default myApp;

