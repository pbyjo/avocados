import Image from "next/image";
import LogoIcon from '@images/logo-avo.png';

/* Styles */
import main from "@styles/main.module.scss";

function Logo(props) {
    const {text} = props;
    return (
            <figure className={main['figure-logo']}>
                <Image 
                    src={LogoIcon}
                    width={42}
                    height={42}
                    loading='eager'
                    alt='logo'
                />
                <h3>{text}</h3>
            </figure>
    );
}

export default Logo;