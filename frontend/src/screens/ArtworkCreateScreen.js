import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createArtwork } from '../actions/artworkActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ARTWORK_CREATE_RESET } from '../constants/artworkConstants'
import FormContainer from '../components/FormContainer'

const ArtworkCreateScreen = ({ match, history }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const artworkCreate = useSelector(state => state.artworkCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = artworkCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: ARTWORK_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/admin/login')
        }
        if (successCreate) {
            history.push('/admin/artworkslist')
        }
    }, [dispatch, userInfo, history, successCreate])

    const createArtworkHandler = (e) => {
        e.preventDefault()
        dispatch(createArtwork(name, image))
    }

    return (
        <>
            <Link to='/admin/artworksList' className='btn my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Add Artwork</h1>
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <Form onSubmit={createArtworkHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Add
                        </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ArtworkCreateScreen
