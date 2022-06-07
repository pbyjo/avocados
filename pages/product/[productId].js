import { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import Image from 'next/image';

import { server, api } from '@config/index.js';

/* Styles */
import main from '@styles/main.module.scss'

/* Components */
import Layout from '@containers/Layout';
import Limiter from '@containers/Limiter';
import Loading from '@components/Loading';

export const getStaticPaths = async () => {
    const res = await fetch(`${server}${api}`)
    const data = await res.json()
    const paths = data.data.map(product => ({
        params: {
            productId: product.id
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}) => {
    const res = await fetch(`${server}${api}/${params?.productId}`)
    const product = await res.json()
    const avoItem = product.item
    return {
        props: {
            avoItem
        }
    }
}

function productPage(props) {
    const {query: {productId}} = useRouter()
    const [loading, setLoading] = useState(false)
    const {avoItem} = props
    
    console.log(avoItem)

    useEffect(() => {
        setLoading(true)
        if(avoItem === undefined) {
            setLoading(loading)
        } else {
            setLoading(false)
        }
    }, [])
    return (
        <Layout>
            {
                loading ?
                <Loading /> :
                <Limiter>
                    {
                        avoItem &&
                        <article className={main['item_container-page']}>
                            <figure>
                                <Image
                                    src={avoItem.image} 
                                    width={320}
                                    height={320} 
                                    alt={avoItem.name}
                                    loading='lazy'
                                />
                            </figure>
                            <div>
                                <h1>{avoItem.name}</h1>
                                <span>
                                    <p>{avoItem.price}</p>
                                    <p>La unidad</p>
                                </span>
                                <h3>Product-id {productId}</h3>
                                <p>{avoItem.attributes.description}</p>
                            </div>
                        </article>
                    }
                </Limiter>
            }
        </Layout>
    );
}

/* 
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
*/

export default productPage;