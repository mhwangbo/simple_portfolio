import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { listSites } from '../actions/siteActions'
import Loader from './Loader'
import Message from './Message'
import Meta from './Meta'

const Header = () => {
    const [siteName, setSiteName] = useState('Site Name')
    const [siteDescription, setSiteDescription] = useState('')
    const [siteKeywords, setSiteKeywords] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const siteList = useSelector((state) => state.siteList)
    const { loading, error, sites } = siteList

    useEffect(() => {
        if (!sites) {
            dispatch(listSites())
        }
    }, [dispatch])

    useEffect(() => {
        if (sites && sites.length > 0) {
            setSiteName(sites[0].name)
            setSiteDescription(sites[0].description)
            setSiteKeywords(sites[0].keywords)
        }
    }, [sites])

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'></Message>
                    : (
                        <>
                            <Meta title={siteName} description={siteDescription} keyword={siteKeywords} />
                            <Navbar bg="light" expand="lg" collapseOnSelect>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="/about">About</Nav.Link>
                                        <Nav.Link href="/collection">Collection</Nav.Link>
                                        {userInfo && userInfo.isAdmin && (
                                            <NavDropdown title='Admin' id='adminmenu'>
                                                <NavDropdown.Item href='/admin/artworksList'>Manage Artworks</NavDropdown.Item>
                                                <NavDropdown.Item href='/admin/siteinfo'>Edit Site Info</NavDropdown.Item>
                                                <NavDropdown.Item href='/' onClick={logoutHandler}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                        )}
                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Navbar.Brand href="/"><h3>{siteName}</h3></Navbar.Brand>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </>
                    )}
        </header>
    )
}

export default Header