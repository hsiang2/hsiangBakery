import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { IoSearchOutline } from 'react-icons/io5'

const SearchBox = ({ category }) => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            // navigate(`/search/${keyword}`)
            navigate(`/product/category/${category}/search/${keyword}`)
            
        } else {
            navigate(`/product/category/${category}`)
        }
    }

    return (
        <Form onSubmit={submitHandler} className='searchBox' >
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Product...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' className='p-2'>
                <IoSearchOutline size={20} />
                {/* Search */}
            </Button>
        </Form>
    )
}

export default SearchBox