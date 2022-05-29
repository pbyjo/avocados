import Link from "next/link";
import Image from "next/image";

/* Styles */
import main from "@styles/main.module.scss";

/* Assets */
import LogoIcon from '@images/logo-avo.png';

function Extra(props) {
    return (
        <section className={main['extra_container']}>
            <div>
                <h1>Avo</h1>
                <Image 
                    src={LogoIcon}
                    width={50}
                    height={50}
                    loading='eager'
                    alt='logo'
                />
                <h1>Store</h1>
            </div>
            <Link href="/">
                <a>
                    <p>¿Debería comer un avo hoy?</p>
                </a>
            </Link>
        </section>
    );
}

export default Extra;