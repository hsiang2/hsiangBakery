import ProductCarousel from "../components/ProductCarousel"
import Meta from "../components/Meta"
import { Link } from "react-router-dom"

const HomeScreen = () => {

    return (
        <>
            <Meta />
            <h1 className="text-center fontAlegreya mt-md-3 mt-md-5">Hsiang Bakery</h1>
            <h6 className="text-center fontCorinthia">Freshly baked everyday.</h6>
            <img className="banner" src={require('../images/image_banner.png')} />
            <Link to={`/`}>
                <div className="customButton">
                    <h6>SHOP NOW</h6>
                </div>
            </Link>
            <div style={{marginTop: "8rem", marginBottom: "8rem"}}>
                <h1 className="text-center fontAlegreya">Customer Favorites</h1>
                <ProductCarousel /> 
            </div>
            <div className="mb-5">
                <h1 className="text-center fontAlegreya">About Us</h1>
                <img className="imgAbout" src={require('../images/image_about.png')} />
                <Link to={`/about`}>
                <div className="customButton">
                    <h6>EXPLORE MORE</h6>
                </div>
                </Link>
            </div>

        </>
    )
}

export default HomeScreen