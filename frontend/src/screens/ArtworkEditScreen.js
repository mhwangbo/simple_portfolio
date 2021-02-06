import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listArtworkDetails, updateArtwork } from '../actions/artworkActions'
import { ARTWORK_UPDATE_RESET } from '../constants/artworkConstants'

const ArtworkEditScreen = ({ match, history }) => {
    const artworkId = match.params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const artworkDetails = useSelector((state) => state.artworkDetails)
    const { loading, error, artwork } = artworkDetails

    const artworkUpdate = useSelector((state) => state.artworkUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = artworkUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ARTWORK_UPDATE_RESET })
            history.push('/admin/artworksList')
        } else {
            if (!artwork || !artwork.name || artwork._id !== artworkId) {
                dispatch(listArtworkDetails(artworkId))
            } else {
                setName(artwork.name)
                setImage(artwork.image)
            }
        }
    }, [dispatch, history, artworkId, artwork, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateArtwork({
            _id: artworkId,
            name,
            image
        }))
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
                <h1>Edit Artwork</h1>
                <img className='rotateimg90 py-4' src={image} alt={name} width='200' />
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{error}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form className='py-3' onSubmit={submitHandler}>
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
                                Update
                        </Button>
                        </Form>
                    )}
            </FormContainer>
        </>
    )
}

export default ArtworkEditScreen