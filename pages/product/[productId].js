import { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import Image from 'next/image';

/* Styles */
import main from '@styles/main.module.scss'

/* Components */
import Layout from '@containers/Layout';
import Limiter from '@containers/Limiter';

function productPage() {
    const {query: {productId}} = useRouter()
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(false)

    const url = `/api/avo/${productId}`

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const result = await fetch(url)
                const data = await result.json()
                console.log(data)
                setLoading(false)
                return setProduct(data.item)
            } catch (error) {
                setLoading(false)
                console.error(error => error.message)
            }
        }
        fetchData()
    }, [productId]);

    return (
        <Layout>
            {
                loading ?
                <h1>Loading...</h1> :
                <Limiter>
                    {
                        product &&
                        <article className={main['item_container-page']}>
                            <figure>
                                <Image
                                    src={product.image} 
                                    width={320}
                                    height={320} 
                                    alt={product.name}
                                    loading='lazy'
                                />
                            </figure>
                            <div>
                                <h1>{product.name}</h1>
                                <span>
                                    <p>{product.price}</p>
                                    <p>La unidad</p>
                                </span>
                                <h3>Product-id {productId}</h3>
                                <p>{product.attributes.description}</p>
                            </div>
                        </article>
                    }
                </Limiter>
            }
        </Layout>
    );
}

export default productPage;