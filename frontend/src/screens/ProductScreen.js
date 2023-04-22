import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Route, NavLink, Routes } from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { Row, Col, Button, Breadcrumb } from "react-bootstrap"
//import axios from 'axios'
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts } from "../redux/productActions"
import Paginate from "../components/Paginate"
import SearchBox from "../components/SearchBox"

const ProductScreen = () => {
    const params = useParams()
    const category = params.category || "all"

    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, category))
        // const fetchProducts = async () => {
        //     const { data } = await axios.get('/api/products')

        //     setProducts(data)
        // }

        // fetchProducts()
    }, [dispatch, keyword, pageNumber, category])

    return (
        <>
            {/* <Routes>
                <Route render={() => <SearchBox category={category} />} />
            </Routes> */}
            <Row className="justify-content-between align-items-center">
                <Col md={6}>
                    <Breadcrumb>
                        <LinkContainer to='/'>
                            <Breadcrumb.Item>HOME</Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>PRODUCTS</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col md={6} lg={4}>
                    <SearchBox category={category} />
                </Col>
            </Row>
            
            <div className="my-5">
                <NavLink to="/product/category/all"
                    className={({ isActive }) => (isActive ? "opacity-100 navItem" : "opacity-50 navItem")}
                >
                    ALL
                </NavLink>
                <NavLink to="/product/category/breads"
                    className={({ isActive }) => (isActive ? "opacity-100 navItem" : "opacity-50 navItem")}
                >
                    BREADS
                </NavLink>
                <NavLink to="/product/category/cakes"
                    className={({ isActive }) => (isActive ? "opacity-100 navItem" : "opacity-50 navItem")}
                >
                    CAKES
                </NavLink>
                <NavLink to="/product/category/pastries"
                    className={({ isActive }) => (isActive ? "opacity-100 navItem" : "opacity-50 navItem")}
                >
                    PASTRIES
                </NavLink>
                <NavLink to="/product/category/biscuits"
                    className={({ isActive }) => (isActive ? "opacity-100 navItem" : "opacity-50 navItem")}
                >
                    BISCUITS
                </NavLink>      
            </div>
            <h1 className="mb-5">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                <>
                    <Row className="gap-3">
                        {products.map((product) => (
                            <Col sm={6} md={3} key={product._id}>
                                <Product product={product} key={product._id}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} category={category}/>
                </>
            }
        </>
        // {!keyword ? <ProductCarousel /> 
        //         : <Link to='/' className='btn btn-light'>Go Back</Link>}
        
    )
}

export default ProductScreen