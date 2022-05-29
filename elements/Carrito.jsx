import Image from "next/image";
import iconCart from "@images/icon-cart.png";

/* Styles */
import main from "@styles/main.module.scss";

function Carrito(props) {
    return (
        <div className={main['carrito']}>
            <Image 
                src={iconCart}
                width={30}
                height={30}
                alt="icon-cart"
            />   
            <p>Mi carrito</p>   
        </div>
    );
}

export default Carrito;