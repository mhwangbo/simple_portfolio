import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listSites, updateSite } from '../actions/siteActions'
import { SITE_UPDATE_RESET } from '../constants/siteConstants'
import RichTextEditor from 'react-rte';

const SiteInfoEditScreen = ({ history }) => {
    const [value, setValue] = useState(RichTextEditor.createEmptyValue())
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [description, setDescription] = useState('')
    const [keywords, setKeywords] = useState('')
    const [logo, setLogo] = useState('')
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState()

    const dispatch = useDispatch()

    const siteList = useSelector((state) => state.siteList)
    const { loading, error, sites } = siteList

    const siteUpdate = useSelector((state) => state.siteUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = siteUpdate

    useEffect(() => {
        dispatch(listSites())
    }, [dispatch])

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SITE_UPDATE_RESET })
            setMessage("Upload success")
        } else if (sites.length > 0) {
            setName(sites[0].name)
            setDetail(sites[0].detail)
            setDescription(sites[0].description)
            setKeywords(sites[0].keywords)
            setLogo(sites[0].logo)
            setValue(RichTextEditor.createValueFromString(detail, 'html'))
        }
    }, [dispatch, sites, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateSite({
            _id: sites[0]._id,
            name,
            detail,
            description,
            keywords,
            logo
        }))
        sessionStorage.removeItem('siteInfo')
        history.push('/')
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

            setLogo(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const onChangeHandler = (val) => {
        setValue(val)
        setDetail(val.toString('html'))
    }

    return (
        <>
            <FormContainer>
                <h1>Edit Site Info</h1>
                {loadingUpdate && <Loader />}
                {message && <Message>{message}</Message>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form className='py-3' onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Site Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='detail'>
                                <Form.Label>Site Detail</Form.Label>
                                <div>
                                    <RichTextEditor
                                        value={value}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Short description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter short description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='keywords'>
                                <Form.Label>Keywords</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter keywords'
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                ></Form.Control>
                                <div>*Enter each keyword separated by comma</div>
                            </Form.Group>
                            <Form.Group controlId='logo'>
                                <div>
                                    <img src={logo} alt={logo} width='50' height='50' />
                                </div>
                                <Form.Label>Logo</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter logo url'
                                    value={logo}
                                    onChange={(e) => setLogo(e.target.value)}
                                ></Form.Control>
                                <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Button type="submit" variant="primary">Update</Button>
                        </Form>
                    )}
            </FormContainer>
        </>
    )
}

export default SiteInfoEditScreen
