
import main from '@styles/main.module.scss';
import Limiter from '@containers/Limiter';
import Logo from '@elements/Logo';

function Loading(props) {
    return (
        <section className={main['loading']}>
            <figure>
                <Logo text={'loading'} />
            </figure>
        </section>
    );
}

export default Loading;