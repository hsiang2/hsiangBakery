import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate }from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShipping } from '../redux/cartActions'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShipping({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <div className="d-flex flex-column align-items-center">
            <h2 className='my-5'>Shipping</h2>
            <Form onSubmit={submitHandler} className="w-100">
                <Form.Group controlId='address' className='formInput mb-3'>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                    
                </Form.Group>
                <Form.Group controlId='city' className='formInput mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode' className='formInput mb-3'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className='formInput mb-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' className='p-0 mt-5 d-block mx-auto'>
                    <div className="customButton">
                        <h6>CONTINUE</h6>
                    </div>
                </Button>
            </Form>
        </div>
    </FormContainer>
}

export default ShippingScreen