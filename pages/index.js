import { useState, useEffect } from "react";
import Link from 'next/link'

/* Components */
import InfoItem from "@components/InfoItem";
import Extra from "@components/Extra";
import Layout from "@containers/Layout";

const url = '/api/avo'

function Home(props) {
    const title = 'Home'
    const [loading, setLoading] = useState(true)
    const [productList, setProductList] = useState()

    /* ClassNames */
    const {container} = props

    useEffect(() => {
        setLoading(loading)
        const fetchData = async () => {
            try {
                const result = await fetch(url)
                const data = await result.json()
                const avoList = data.data
                console.log(avoList)
                setLoading(!loading)
                return (setProductList(avoList))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        
        /* window.fetch(url)
        .then(response => response.json())
        .then(json => console.log(json.data))
        .then(json => setProductList(json)) */
    }, [])


    return (
        <Layout title={title}>
            <Extra /> 
            <section className={container}>          
                {
                    loading ?
                    <h1>Loading...</h1> :
                    productList.map(({id, name, image, price}) => {
                        console.log(image)
                        return (
                            <article key={id}>
                                <Link href={`/product/${id}`}>
                                    <a>
                                        <img
                                            src={image}
                                            alt={name}
                                            loading='lazy'
                                        />
                                    </a>
                                </Link>
                                <InfoItem name={name} price={price} />
                            </article>
                        )
                    })
                }
            </section>
        </Layout>
    );
}

export default Home;