import { Link } from "react-router-dom"
import { Breadcrumb, Row, Col, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useParams } from "react-router-dom"
import breads from "../breads"

const ProductDetailScreen = () => {
    const params = useParams()

    const product = breads.find(p => p._id === params.id)
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
        <Row>
            <Col sm={12} md={6} className="d-flex justify-content-center">
                <div style={{width: "80%"}}>
                    <img 
                        src={product.image}
                        style={{width: "100%"}}
                    />
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <h4>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h4>
                        <Button
                            type="button"
                            variant="outline-dark"
                            disabled={product.countInStock === 0}
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
            </Col>
        </Row>
    </>
}

export default ProductDetailScreen