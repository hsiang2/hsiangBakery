import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "react-bootstrap"
//import axios from 'axios'
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts } from "../redux/productActions"

const HomeScreen = () => {
    //const [products, setProducts] = useState([])
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
        // const fetchProducts = async () => {
        //     const { data } = await axios.get('/api/products')

        //     setProducts(data)
        // }

        // fetchProducts()
    }, [dispatch])

    return (
        <>
            <h1>Breads</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                <Row>
                    {products.map((product) => (
                        <Col sm={6} md={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default HomeScreen