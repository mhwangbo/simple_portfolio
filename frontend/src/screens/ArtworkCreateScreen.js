import axios from 'axios'
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
    const [uploading, setUploading] = useState(false)

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

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }

    }

    return (
        <>
            <Link to='/admin/artworksList' className='btn my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Add Artwork</h1>
                {image &&
                    <img className='rotateimg90 py-4' src={image} alt={image} width='200' />
                }
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
                        <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                        <div>*Please rotate your image 90CW before upload.</div>
                        {uploading && <Loader />}
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
