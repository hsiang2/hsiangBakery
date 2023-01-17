import { Link } from "react-router-dom"

const Product = (props) => {
    return(
        <>
            <Link to={`/product/${props.product._id}`}>
                <img 
                    src={props.product.image}
                    style={{width: "100%"}}
                />
            </Link>
            <Link to={`/product/${props.product._id}`} style={{textDecoration: "none"}}>
                <h4>{props.product.name}</h4>
                <h6>{props.product.price}</h6>
            </Link>
            
        </>
    )
}

export default Product