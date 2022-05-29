/* Styles */
import main from '@styles/main.module.scss'

function InfoItem(props) {
    const {name, price} = props
    return (
        <div className={main['info_container']}>
            <h2>{name}</h2>
            <p>{price}</p>
        </div>
    );
}

export default InfoItem;