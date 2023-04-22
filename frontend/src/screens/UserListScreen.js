import { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listUsers, deleteUser } from "../redux/userActions"

const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1 className="mt-3 mb-4">Users</h1>
            {loading ? <Loader /> : 
                error ? <Message variant='danger'>{error}</Message> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th className="p-3">ID</th>
                                <th className="p-3">NAME</th>
                                <th className="p-3">EMAIL</th>
                                <th className="p-3">ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="p-3">{user._id}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td className="p-3">
                                        {user.isAdmin ? (
                                            <i className="fas fa-check" style={{ color: '#9DCBBD' }}></i>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: '#E08D6A' }}></i>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <div className="d-flex justify-content-around">
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button 
                                                variant="danger" className="btn-sm" 
                                                onClick={() => deleteHandler(user._id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </div>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            )}
        </>
    )
}

export default UserListScreen