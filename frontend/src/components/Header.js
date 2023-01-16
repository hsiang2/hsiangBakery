import { Container, Nav, NavDropdown, Navbar, Offcanvas, Form, Button, Row, Col } from "react-bootstrap"
import { IoCartOutline, IoPersonOutline } from "react-icons/io5"

const Header = () => {
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
                        <Nav.Link href="/about">ABOUT</Nav.Link>
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
                    <Navbar.Brand href="/">
                        <img src={require('../images/logo_pink.png')}/>
                    </Navbar.Brand>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Nav className="flex-row">
                        <Nav.Link href="/login">
                            <IoPersonOutline size={20}/>
                        </Nav.Link>
                        <Nav.Link href="/cart">
                            <IoCartOutline size={20}/>
                        </Nav.Link>
                    </Nav>
                </Col>
            </Row>
            
            
            
            
            
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