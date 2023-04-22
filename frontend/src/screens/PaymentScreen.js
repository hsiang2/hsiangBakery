import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate }from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePayment } from '../redux/cartActions'

const PaymentScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePayment(paymentMethod))
        navigate('/placeorder')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <div className="d-flex flex-column align-items-center">
            <h2 className='my-5'>Payment Method</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' className='p-0 mt-5'>
                    <div className="customButton">
                        <h6>CONTINUE</h6>
                    </div>
                </Button>
            </Form>
        </div>
        
    </FormContainer>    
}

export default PaymentScreen