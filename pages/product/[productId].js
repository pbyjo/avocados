import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import {useRouter} from 'next/router'
import Image from 'next/image';

/* Components */
import Layout from '@containers/Layout';

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
                <Fragment>
                    {
                        product &&
                        <article>
                            <img
                                src={product.image.src} 
/*                                 width={240} 
                                height={240}  */
                            />
                            <h1>Producto {productId}</h1>
                            <h2>{product.name}</h2>
                            <p>{product.attributes.description}</p>
                        </article>
                    }
                </Fragment>
            }
        </Layout>
    );
}

export default productPage;