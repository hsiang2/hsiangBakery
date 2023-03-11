import { Container, Nav, NavDropdown, Navbar, Offcanvas, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { IoCartOutline, IoPersonOutline } from "react-icons/io5"
import { logout } from "../redux/userActions"
import SearchBox from './SearchBox'
import { Route, Routes } from "react-router-dom"

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return <header>
        <>
        <Navbar expand='md' className="mb-3">
          <Container fluid className="d-block">
            <Row>
                <Col>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    //placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                        Offcanvas
                        </Offcanvas.Title> */}
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="pe-3">
                            <LinkContainer to='/about'>
                                <Nav.Link>ABOUT</Nav.Link>
                            </LinkContainer>
                        <NavDropdown
                            title="PRODUCTS"
                            id={`offcanvasNavbarDropdown-expand-md`}
                        >
                            <NavDropdown.Item href="/breads">BREADS</NavDropdown.Item>
                            <NavDropdown.Item href="/cakes">CAKES</NavDropdown.Item>
                            <NavDropdown.Item href="/pastries">PASTRIES</NavDropdown.Item>
                            <NavDropdown.Item href="/biscuits">BISCUITS</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Col>
                <Col className="d-flex justify-content-center">
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={require('../images/logo_pink.png')}/>
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
                            </NavDropdown>
                        ) : 
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <IoPersonOutline size={20}/>
                                </Nav.Link>
                            </LinkContainer>
                        }
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <IoCartOutline size={20}/>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Col>
            </Row>
            <SearchBox />
            
            
            
            
            
            
          </Container>
        </Navbar>
    </>
        {/* <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={require('../images/logo_pink.png')}/>
                </Navbar.Brand>
                <Nav.Link  href="#link">
                    <IoCartOutline size={20}/>
                </Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavDropdown title="PRODUCTS" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">BREADS</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">CAKES</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">PASTRIES</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">BISCUITS</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#link">ABOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            
        </Navbar> */}
        
    </header>
}

export default Header