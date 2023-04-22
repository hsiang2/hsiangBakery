import { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listUsers, deleteUser } from "../redux/userActions"
import { listOrders } from "../redux/orderActions"

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <>
            <h1 className="mt-3 mb-4">Orders</h1>
            {loading ? <Loader /> : 
                error ? <Message variant='danger'>{error}</Message> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th className="p-3">ID</th>
                                <th className="p-3">USER</th>
                                <th className="p-3">DATE</th>
                                <th className="p-3">TOTAL</th>
                                <th className="p-3">PAID</th>
                                <th className="p-3">DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="p-3">{order._id}</td>
                                    <td className="p-3">{order.user && order.user.name}</td>
                                    <td className="p-3">{order.createdAt.substring(0, 10)}</td>
                                    <td className="p-3">${order.totalPrice}</td>
                                    <td className="p-3">
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className="fas fa-times" style={{ color: '#E08D6A' }}></i>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className="fas fa-times" style={{ color: '#E08D6A' }}></i>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant="light" className="btn-sm">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            )}
        </>
    )
}

export default OrderListScreen