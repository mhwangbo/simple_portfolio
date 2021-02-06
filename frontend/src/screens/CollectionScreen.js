import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listArtworks } from '../actions/artworkActions'
import './CollectionScreen.css'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CollectionScreen = () => {
    const dispatch = useDispatch()

    const artworkList = useSelector(state => state.artworkList)
    const { loading, error, artworks } = artworkList

    useEffect(() => {
        dispatch(listArtworks())
    }, [dispatch])

    return (
        <div className="scroll-container">
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    :
                    <div className="content-wrapper">
                        {artworks.map((artwork) => (
                            <div className="scroll-child" key={artwork.image}>
                                <img src={artwork.image} alt={artwork.image} width="300" />
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default CollectionScreen
