import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/collection">Collection</Nav.Link>
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <NavDropdown.Item href='/admin/artworksList'>Manage Artworks</NavDropdown.Item>
                                <NavDropdown.Item href='/admin/profile'>Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item href='/' onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    <Nav className="ml-auto">
                        <Navbar.Brand href="/"><h3>Site Name</h3></Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header