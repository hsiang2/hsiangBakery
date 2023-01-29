import { useState, useEffect } from "react"
//import axios from "axios"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb, Row, Col, Button, Form } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { listProductDetail } from "../redux/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductDetailScreen = (history) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    //const [product, setProduct] = useState({})

    useEffect(() => {
        dispatch(listProductDetail(params.id))
        // const fetchProduct = async () => {
        //     const { data } = await axios.get(`/api/products/${params.id}`)

        //     setProduct(data)
        // }

        // fetchProduct()
    }, [dispatch])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    return <>
        <Breadcrumb>
            <LinkContainer to='/'>
                <Breadcrumb.Item>HOME</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to='/'>
                <Breadcrumb.Item>
                    PRODUCTS
                </Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        {loading ? <Loader /> : error ? 
            <Message variant='danger'>{error}</Message> : 
            <Row>
                <Col sm={12} md={6} className="d-flex justify-content-center">
                    <div style={{width: "80%"}}>
                        <img 
                            src={product.image}
                            style={{width: "100%"}}
                        />
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <h4>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h4>
                                <Form.Control
                                    as='select'
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                >
                                    {
                                        [...Array(product.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>
                                                { x + 1 }
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </div>
                            
                            <Button
                                type="button"
                                variant="outline-dark"
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                ADD TO CART
                            </Button>
                        </div>
                        
                    </div>
                    
                </Col>
                <Col sm={12} md={6}>
                    <h1>{product.name}</h1>
                    <h3>{product.price}</h3>
                    <h4>{product.description}</h4>
                </Col>
            </Row>
        }
        
    </>
}

export default ProductDetailScreen