import { Container, Nav, NavDropdown, Navbar, Offcanvas, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { IoCartOutline, IoPersonOutline, IoMenuOutline } from "react-icons/io5"
import { logout } from "../redux/userActions"

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return <header>
        <>
        <Navbar expand='md' fixed='top'>
          <Container fluid className="d-block">
            <Row className="px-md-5">
                <Col>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} >
                        <IoMenuOutline size={20} />
                    </Navbar.Toggle>
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    >
                    <Offcanvas.Header  className="customOffcanvas" closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="customOffcanvas">
                        <Nav className="pe-3">
                            <LinkContainer to='/about' className='mx-2'>
                                <Nav.Link>ABOUT</Nav.Link>
                            </LinkContainer>
                        <NavDropdown
                            title="PRODUCTS"
                            id={`offcanvasNavbarDropdown-expand-md`}
                            className='mx-2'
                        >
                            <NavDropdown.Item href="/product/category/all">ALL</NavDropdown.Item>
                            <NavDropdown.Item href="/product/category/breads">BREADS</NavDropdown.Item>
                            <NavDropdown.Item href="/product/category/cakes">CAKES</NavDropdown.Item>
                            <NavDropdown.Item href="/product/category/pastries">PASTRIES</NavDropdown.Item>
                            <NavDropdown.Item href="/product/category/biscuits">BISCUITS</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Col>
                <Col className="d-flex justify-content-center">
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={require('../images/logo_header.png')} alt="logo" />
                        </Navbar.Brand>
                    </LinkContainer>
                    
                </Col>
                <Col className="d-flex justify-content-end">
                    <Nav className="flex-row">
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                {userInfo.isAdmin && (
                                    <>
                                        <NavDropdown.Divider />
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                )}
                            </NavDropdown>
                        ) : 
                            <LinkContainer to='/login' className='mx-2'>
                                <Nav.Link>
                                    <IoPersonOutline size={20}/>
                                </Nav.Link>
                            </LinkContainer>
                        }
                        <LinkContainer to='/cart' className='mx-2'>
                            <Nav.Link>
                                <IoCartOutline size={20}/>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Col>
            </Row>           
          </Container>
        </Navbar>
    </> 
    </header>
}

export default Header