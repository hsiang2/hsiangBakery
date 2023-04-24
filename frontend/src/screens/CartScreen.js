import { useEffect } from 'react'
import { Button, Col, ListGroup, Row, Image, Form, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { IoTrashOutline } from "react-icons/io5"
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../redux/cartActions'

const CartScreen = () => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const productId = params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate(`/login?redirect=${"/shipping"}`)
    }

    return <>
        <h2 className='my-5 text-center fontAlegreya'>Shopping Cart</h2>
        <Row>
            <Col md={8} className='mt-3'>
                {cartItems.length === 0 ? (
                    <div className='d-flex flex-column text-center align-items-md-start'>
                        <Message>
                            Your cart is empty 
                        </Message>
                        <Link to='/'>
                            <div className="customButton">
                                <h6>GO BACK</h6>
                            </div>
                        </Link>
                    </div>
                    
                ): (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row className='d-flex align-items-center'>
                                    <Col xs={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col xs={3}>
                                        <Link to={`/product/id/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col xs={2}>${item.price}</Col>
                                    <Col xs={2}>
                                        <Form.Select
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        { x + 1 }
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Col xs={2}>
                                        <Button 
                                            type='button' variant='light' 
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <IoTrashOutline />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} className='mt-5 mt-md-0 d-flex flex-column align-items-center'>
                {/* <Card> */}
                    {/* <ListGroup variant='flush'>
                        <ListGroup.Item> */}
                        <div>
                            <h4 className='mb-2'>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items
                            </h4>
                            $
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                            
                        {/* </ListGroup.Item>
                        <ListGroup.Item> */}
                            
                                <Button
                                    type='button'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    <div className="customButton mt-4">
                                        <h6>CHECKOUT</h6>
                                    </div>
                                </Button>
                        {/* </ListGroup.Item>
                    </ListGroup> */}
                {/* </Card> */}
            </Col>
        </Row>
    </>
    
}

export default CartScreen