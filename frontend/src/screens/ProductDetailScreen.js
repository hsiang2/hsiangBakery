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
import Meta from "../components/Meta"

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
        <Breadcrumb className="mb-5">
            <LinkContainer to='/'>
                <Breadcrumb.Item>HOME</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to={`/product/category/${product.category}`}>
                <Breadcrumb.Item>
                    {product.category?.toUpperCase()}
                </Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>{product.name?.toUpperCase()}</Breadcrumb.Item>
        </Breadcrumb>
        {loading ? <Loader /> : error ? 
            <Message variant='danger'>{error}</Message> : 
            <>
                <Meta title={product.name} />
                <Row>
                    <Col sm={12} md={6} className="d-flex justify-content-center">
                        <img 
                            src={product.image}
                            className="productImage mb-3"
                        /> 
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        
                        <h2 className="mt-4 mt-md-0">{product.name}</h2>
                        <h5 className="my-3">${product.price}</h5>
                        <Rating 
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        />
                        <p className="mt-4">{product.description}</p>
                        <div className="mt-4" style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <h6>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h6>
                                <Form.Select
                                    // as='select'
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
                                </Form.Select>
                            </div>
                            
                            <Button
                                type="button"
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                                className="p-0"
                            >
                                <div className="customButton">
                                    <h6>ADD TO CART</h6>
                                </div>
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="px-lg-5">
                    
                    <div className="mt-5">
                        <h2 className="mt-5">Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant="flush">
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong className="d-block my-3">{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p style={{fontSize: "1.125rem"}} className="mt-2">{review.comment}</p>
                                    <p style={{fontSize: "0.875rem", color: "#ECD9CE90"}}>{review.createdAt.substring(0, 10)}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h5 className="mt-4">Write a Customer Review</h5>
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label className="my-3">Rating</Form.Label>
                                            <Form.Select value={rating} onChange={(e) => setRating(e.target.value)} >
                                                <option value=''>Select...</option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <FormGroup controlId="comment">
                                            <Form.Label className="mt-4 mb-3">Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                style={{color: "#314642", backgroundColor: "#F6EFEA"}}
                                            ></Form.Control>
                                            <Button type="submit" className="p-0 mt-5">
                                                <div className="customButton">
                                                    <h6>Submit</h6>
                                                </div>
                                            </Button>
                                            {/* <Button type="submit">
                                                Submit
                                            </Button> */}
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
                    </div>
                </Row>
            </>
            
            
        }
        
    </>
}

export default ProductDetailScreen