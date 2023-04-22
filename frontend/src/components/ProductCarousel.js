import { useEffect } from 'react'
//import { Carousel, Image } from 'react-bootstrap'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../redux/productActions'
import Loader from './Loader'
import Message from './Message'
import Product from './Product'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          //items: 5
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          //items: 2
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          //items: 1
          items: 1
        }
      };

    // const responsive = {
    //     desktop: {
    //       breakpoint: { max: 3000, min: 1024 },
    //       items: 3,
    //       slidesToSlide: 3 // optional, default to 1.
    //     },
    //     tablet: {
    //       breakpoint: { max: 1024, min: 464 },
    //       items: 2,
    //       slidesToSlide: 2 // optional, default to 1.
    //     },
    //     mobile: {
    //       breakpoint: { max: 464, min: 0 },
    //       items: 1,
    //       slidesToSlide: 1 // optional, default to 1.
    //     }
    // }

    return loading ? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message> 
        : (
            <Carousel
                showDots={true}
                responsive={responsive}
                infinite={true}
                centerMode={true}
                containerClass="carouselContainer"
                sliderClass='carouselItem'
                
                autoPlay={true}
                autoPlaySpeed={3000}
                // keyBoardControl={true}
                // customTransition="all .5"
                transitionDuration={1000}

                // containerClass="carousel-container"

                removeArrowOnDeviceType={["mobile"]}
                //deviceType={this.props.deviceType}
                // dotListClass="custom-dot-list-style"
                // itemClass="carousel-item-padding-40-px"
            >
                {products.map(product => (
                    <div className='d-flex justify-content-center my-5'>
                        <Product product={product} key={product.id}/>
                    </div>
                        
                        
                    
                    
                ))}
            </Carousel>
            // <Carousel pause='hover' className='bg-dark'>
            //     {products.map(product => (
            //             <Carousel.Item key={product._id}>
            //                 <div >
            //                     <Product product={product}/>
            //                 </div>
                            
            //                 {/* <Link to={`/product/${product._id}`}>
            //                     <Image src={product.image} alt={product.name} fluid />
            //                     <Carousel.Caption className='carousel-caption'>
            //                         <h2>
            //                             {product.name} (${product.price})
            //                         </h2>
            //                     </Carousel.Caption>
            //                 </Link> */}
            //             </Carousel.Item>
            //     ))}
            // </Carousel>
    )
}

export default ProductCarousel