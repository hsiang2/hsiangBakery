import { useState, useEffect } from "react"
//import axios from "axios"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb, Row, Col, Button, Form, ListGroup, FormGroup } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { createProductReview, listProductDetail } from "../redux/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Rating from "../components/Rating"
import { productCreateReviewReset } from "../redux/productReviewCreateReducer"

const ProductDetailScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        success: successProductReview,
        error: errorProductReview
    } = productReviewCreate

    //const [product, setProduct] = useState({})

    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch(productCreateReviewReset())
        }
        dispatch(listProductDetail(params.id))
        // const fetchProduct = async () => {
        //     const { data } = await axios.get(`/api/products/${params.id}`)

        //     setProduct(data)
        // }

        // fetchProduct()
    }, [dispatch, params, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(params.id, {
            rating,
            comment
        }))
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
                    <Rating 
                        value={product.rating}
                        text={`${product.numReviews} reviews`}

                    />

                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant="flush">
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)} >
                                            <option value=''>Select...</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <FormGroup controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            row='3'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                        <Button type="submit" variant="primary">
                                            Submit
                                        </Button>
                                    </FormGroup>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to='/login'>sign in</Link> to write a review
                                    {' '}
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                    
                </Col>
            </Row>
            
        }
        
    </>
}

export default ProductDetailScreen