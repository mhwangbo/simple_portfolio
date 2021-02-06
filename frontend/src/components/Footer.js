import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Footer = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center pt-3'>
                        Copyright &copy; Liemi
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        {!userInfo &&
                            <a style={{ color: '#f2f2f2' }} href="/admin/login">Login</a>
                        }
                        {userInfo &&
                            <a style={{ color: '#f2f2f2' }} href="/" onClick={logoutHandler}>Logout</a>
                        }
                    </Col>
                </Row>
            </Container>
        </footer >
    )
}

export default Footer
