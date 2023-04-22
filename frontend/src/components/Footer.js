import { Container, Row, Col, Stack } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row className='py-5 gx-5'>
                    <Col lg={6} className='d-flex flex-column align-items-center align-items-md-start'>
                        <Row className='mb-3'>
                            <h2>Contact</h2>
                        </Row>
                        <Row className='mb-5'>
                            <Col md={4} className='mb-2 d-flex flex-column align-items-center align-items-md-start'>
                                <h3>Phone</h3>
                                <p>0123456789</p>
                            </Col>
                            <Col md={4} className='mb-2 d-flex flex-column align-items-center align-items-md-start'>
                                <h3>Adress</h3>
                                <p>13 Thomas Road, Fernwood, England, United Kingdom</p>
                            </Col>
                            <Col md={4} className='mb-2 d-flex flex-column align-items-center align-items-md-start'>
                                <h3>Opening Hours</h3>
                                <p>Tue - Sat<br />8:00 a.m. - 9:00 p.m.</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} lg={3} className='d-flex flex-column align-items-center align-items-md-start'>
                        <Row className='mb-3'>
                            <h2>Follow</h2>
                        </Row>
                        <Row className='mb-5'>
                            <Stack direction='horizontal'>
                                <img src={require('../images/icon_fb.png')}/>
                                <img src={require('../images/icon_ig.png')} className="mx-3 mx-md-4"/>
                                <img src={require('../images/icon_yt.png')}/>
                            </Stack>
                        </Row>
                    </Col>
                    <Col md={6} lg={3} className='align-self-center d-flex justify-content-center'>
                        <img src={require('../images/logo_footer.png')} width="150"/>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center py-3' >
                        Copyright &copy;  2022 Hsiang Bakery
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer