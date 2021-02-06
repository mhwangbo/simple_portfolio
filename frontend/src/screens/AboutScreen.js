import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listSites } from '../actions/siteActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AboutScreen = () => {
    const [siteDetail, setSiteDetail] = useState('')

    const dispatch = useDispatch()

    const siteList = useSelector((state) => state.siteList)
    const { loading, error, sites } = siteList

    useEffect(() => {
        if (!sites) {
            dispatch(listSites())
        }
    }, [dispatch])

    useEffect(() => {
        if (sites && sites.length > 0) {
            setSiteDetail(sites[0].detail)
        }
    }, [sites])

    return (
        <>
            <div className='py-5' style={{ width: '50vw' }}>
                <h4>About Me</h4>
                <br />
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div dangerouslySetInnerHTML={{ __html: siteDetail }} />
                }
            </div>
        </>
    )
}

export default AboutScreen
