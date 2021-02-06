import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listArtworks, deleteArtwork } from '../actions/artworkActions'
import { Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import './ManageArtworkScreen.css'
import { LinkContainer } from 'react-router-bootstrap'


const ManageArtworkScreen = ({ history }) => {
    const dispatch = useDispatch()

    const artworkList = useSelector(state => state.artworkList)
    const { loading, error, artworks } = artworkList

    const artworkDelete = useSelector(state => state.artworkDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = artworkDelete

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo.isAdmin) {
            history.push('/admin/login')
        } else {
            dispatch(listArtworks())
        }
    }, [dispatch, userInfo, history, successDelete])

    const deleteArtworkHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteArtwork(id))
        }
    }

    return (
        <>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <>
                            <table className='center'>
                                <thead>
                                    <tr>
                                        <th className='artwork-view'>Artwork</th>
                                        <th className='artwork-name'>Name</th>
                                        <th colSpan='2'>Options</th>
                                    </tr>
                                    <tr>
                                        <th colSpan='4' style={{ textAlign: 'right' }}>
                                            <LinkContainer to={'/admin/artworks/create'}>
                                                <Button variant='success' size='sm' ><i className="fas fa-plus-circle"></i></Button>
                                            </LinkContainer>
                                        </th>
                                    </tr>
                                    {artworks.map((artwork) => (
                                        <tr>
                                            <td className='artwork-view'><img className='rotateimg90' src={artwork.image} alt={artwork.name} width='50' height='50' /></td>
                                            <td className='artwork-name'>{artwork.name}</td>
                                            <td className='artwork-options' style={{ textAlign: 'right' }}>
                                                <LinkContainer to={`/admin/artworks/${artwork._id}/edit`}>
                                                    <Button variant='info' size='sm'><i className="fas fa-edit"></i></Button>
                                                </LinkContainer>
                                            </td>
                                            <td className='artwork-options'>
                                                <Button size='sm' onClick={() => { deleteArtworkHandler(artwork._id) }}><i className="fas fa-trash-alt"></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </thead>
                            </table>
                        </>
                    )}
        </>
    )
}

export default ManageArtworkScreen