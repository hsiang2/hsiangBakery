import { Row, Col } from "react-bootstrap"
import breads from "../breads"
import Product from "../components/Product"

const HomeScreen = () => {
    return (
        <>
            <h1>Breads</h1>
            <Row>
                {breads.map((bread) => (
                    <Col sm={6} md={3}>
                        <Product product={bread}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen