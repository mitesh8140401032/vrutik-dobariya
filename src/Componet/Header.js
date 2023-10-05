import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Image/logo.png';

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        if (localStorage.getItem('Login')) {
            setLoggedIn(true);
            setLoggedInUser(loggedInUser.Username);
        }
        // function handleScroll() {
        //     if (window.scrollY > 50) {
        //         document.getElementById("myP").className = "test anchor2";
        //     } else {
        //         document.getElementById("myP").className = "";
        //     }
        // }

        // window.addEventListener('scroll', handleScroll);




    }, []);

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('Login');
    }

    const handleProfile = () => {
        navigate('/profile');
    }
    const panel = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div id="myP" style={{ position: 'fixed', width: '100%', zIndex: '99999', backgroundColor: 'white' }}>
            <Navbar expand="lg" className=""   >
                <Container >
                    <Navbar.Brand>
                        <Link to={'/'} className='anchor' >
                            <img src={logo} onClick={panel} alt="!..." height={80} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0">
                            <Nav.Link>
                                <Link to={'/market'} onClick={panel} className='anchor' >
                                    Market
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={'/blog'} onClick={panel} className='anchor' >
                                    Blog
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={'/about'} onClick={panel} className='anchor' >
                                    About
                                </Link>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {loggedIn ? (
                                <Nav.Link>
                                    <NavDropdown title={<button className='btn'><FontAwesomeIcon icon={faUser} /></button>} id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#action4" onClick={handleProfile}>
                                            <FontAwesomeIcon icon={faHouse} beatFade /> Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>
                                            <FontAwesomeIcon icon={faRightFromBracket} fade /> Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Link>
                            ) : (
                                <Nav.Link className='mt-3' >
                                    <Link to={'/login'} className='anchor'  >Login</Link>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
}
