import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faHouse, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Image/logo.png'

export default function ProductHeader() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const naviagte = useNavigate();
    const alldata = JSON.parse(localStorage.getItem("Alldata"))

    useEffect(() => {

        if (localStorage.getItem('Login')) {
            setLoggedIn(true);
            setLoggedInUser(loggedInUser.Username);
        }

        const cartItems = alldata.reduce((total, user) => total.concat(user.cart), []);
        setCartItemsCount(cartItems.length);
    }, []);

    const handlelogout = () => {
        setLoggedIn(false)
        localStorage.removeItem('Login')
    }
    const handleprofile = () => {
        naviagte('/profile')
    }
    const panel = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div style={{ position: 'fixed', width: '100%', zIndex: "9999" }}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container >
                    <Navbar.Brand >
                        <Link to={'/'} onClick={panel} className='anchor'>
                            <img src={logo} alt="!..." height={80} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"


                        >

                            <Nav.Link >
                                <Link to={'/market'} onClick={panel} className='anchor'>
                                    Market
                                </Link>
                            </Nav.Link>

                            <Nav.Link >
                                <Link to={'/blog'} onClick={panel} className='anchor'>
                                    Blog
                                </Link>
                            </Nav.Link> <Nav.Link >
                                <Link to={'/about'} onClick={panel} className='anchor'>
                                    About
                                </Link>
                            </Nav.Link>


                        </Nav>
                        <Nav>

                            {loggedIn ? (<Nav.Link>


                                <NavDropdown title={<button className='btn'><FontAwesomeIcon icon={faUser} /></button>} id="navbarScrollingDropdown">

                                    <NavDropdown.Item href="#action4" onClick={handleprofile}>
                                        <FontAwesomeIcon icon={faHouse} beatFade /> Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handlelogout}>
                                        <FontAwesomeIcon icon={faRightFromBracket} fade /> Log Out
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </Nav.Link>) : (<Nav.Link className='mt-3' >
                                <Link to={'/login'} className='anchor '>Login</Link>
                            </Nav.Link>)}
                            <Nav.Link className='mt-3' >
                                <Link to={'/cart'} onClick={panel} className='anchor'>

                                    <FontAwesomeIcon icon={faCartShopping} />
                                    {cartItemsCount > 0 && (
                                        <span className="badge badge-danger ml-1">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
