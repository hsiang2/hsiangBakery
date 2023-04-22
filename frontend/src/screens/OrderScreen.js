import { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ListGroup, Row, Col, Image, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams }from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deliverOrder, getOrderDetails, payOrder } from '../redux/orderActions'
import { orderPayReset } from '../redux/orderPay'
import { orderDeliverReset } from '../redux/orderDeliverReducer'

const OrderScreen = () => {
    
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    const orderId = params.id 

    //const orderDetails = useSelector(state => state.orderDetails)
    const orderDetails = JSON.parse(JSON.stringify(useSelector((state) => state.orderDetails)))
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        //Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num *100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(
            order.orderItems.reduce(
                (acc, item) => acc + item.price * item.qty, 0
            )
        )
    }

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }
        const addPayPalScript = async () => {
            //document.cookie = 'cookie2=value2; SameSite=None; Secure';
            //document.cookie = "SameSite=None; Secure"
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (successPay || !order || order._id !== orderId || successDeliver) {
            dispatch(orderPayReset())
            dispatch(orderDeliverReset())
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            }
        } else {
            setSdkReady(true)
        }
        
    }, [order, orderId, dispatch, successPay, successDeliver, userInfo, navigate])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : <div>
            <h3 className='my-4'>Order {order._id}</h3>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3 className='mb-3'>Shipping</h3>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Deliverd on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Deliverd</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3 className='mb-3'>Payment Method</h3>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3 className='mb-3'>Order Items</h3>
                            {order.orderItems.length === 0 
                                ? <Message>Order is empty</Message>
                                : <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row className='d-flex align-items-center'>
                                                <Col xs={2}>
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        fluid rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col xs={5}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDeliverd && (
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverHandler}
                                    >Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                    </ListGroup>
                </Col>
            </Row>
        </div>
}

export default OrderScreen