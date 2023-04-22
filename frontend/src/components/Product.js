import { Link } from "react-router-dom"

const Product = (props) => {
    return(
        <div 
            // className="d-flex flex-column align-items-center"
        >
            <Link to={`/product/id/${props.product._id}`}>
                <img 
                    src={props.product.image}
                    style={{width: "100%",  maxWidth: 312, maxHeight: 363}}
                />
            </Link>
            <Link to={`/product/id/${props.product._id}`} style={{textDecoration: "none"}}>
                <h5 className="mt-3">{props.product.name}</h5>
                <p style={{fontSize: "0.875rem"}}>${props.product.price}</p>
            </Link>
            
        </div>
    )
}

export default Product