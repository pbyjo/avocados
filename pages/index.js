import {useEffect , useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
/* Server and api */
import fetch from 'isomorphic-unfetch'
import {server, api} from "@config/index.js";

/* Components */
import InfoItem from "@components/InfoItem";
import Extra from "@components/Extra";
import Layout from "@containers/Layout";
import Loading from '@components/Loading';


export const getServerSideProps = async () => {
    const res = await fetch(`${server}${api}`)
    const data = await res.json()
    const avoList = data.data
    console.log(data)
    return {
        props: {
            productList : avoList,
        }
    }
}

function Home(props) {
    const title = 'Home'
    const [loading, setLoading] = useState(true)

    const {container, productList} = props

    useEffect(() => {
        setLoading(loading)
        if(productList.length > 0){
            setLoading(false)
        }
    }, [])

    return (
        <Layout title={title}>
            <Extra /> 
        {
            loading ?
            <Loading /> :
            <section className={container}>   
                {
                    productList.map(({id, name, image, price}) => {
                        return (
                            <article key={id}>
                                <Link href={`/product/${id}`}>
                                    <a>
                                        <figure>
                                            <Image
                                                src={image}
                                                alt={name}
                                                width={280}
                                                height={280}
                                                loading='lazy'
                                                layout='intrinsic'
                                            />
                                        </figure>
                                    </a>
                                </Link>
                                <InfoItem name={name} price={price} />
                            </article>
                        )
                    })
                }
            </section>
        }
        </Layout>
    );
}

/* useEffect(() => {
    setLoading(loading)
    const fetchData = async () => {
        try {
            const result = await fetch(api)
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
    
    window.fetch(api)
    .then(response => response.json())
    .then(json => console.log(json.data))
    .then(json => setProductList(json))
}, []) */

export default Home;