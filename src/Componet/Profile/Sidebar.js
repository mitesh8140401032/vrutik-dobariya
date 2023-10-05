import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFont, faHouse, faRightFromBracket, faSignsPost, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Sidebar() {
    const navigate = useNavigate('')

    const toggleRef = useRef(null);
    const sidebarRef = useRef(null);
    const mainRef = useRef(null);
    const linkRefs = useRef([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };
    const linkColor = (link) => {
        linkRefs.current.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
    };

    const handlelogout = () => {
        localStorage.removeItem('Login')
        navigate('/login')
    }


    useEffect(() => {
        const handleLinkClick = (event) => {
            linkColor(event.target);
        };

        if (toggleRef.current) {
            toggleRef.current.addEventListener('click', toggleSidebar);
        }

        linkRefs.current.forEach(l => l.addEventListener('click', handleLinkClick));

        return () => {
            if (toggleRef.current) {
                toggleRef.current.removeEventListener('click', toggleSidebar);
            }
            linkRefs.current.forEach(l => l.removeEventListener('click', handleLinkClick));
        };
    }, []);
    return (

        <div className={`wrapper ${sidebarOpen ? 'show-sidebar' : ''}`} style={{ overflow: 'hidden' }}>


            <header className="header">
                <div className="header__container">
                    <button ref={toggleRef} className='btn header__toggle'>
                        <FontAwesomeIcon icon={faBars} className='fs-3' />
                    </button>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`} id="sidebar" ref={sidebarRef}>

                <nav className="sidebar__container">
                    <div class="sidebar__logo">

                    </div>
                    <div className="sidebar__content">
                        <div className="sidebar__list">

                            <Link to={'/'} className="sidebar__link link" >
                                <FontAwesomeIcon className='ri-home-5-line' icon={faHouse} />
                                <span class="sidebar__link-name">Home</span>
                                <span class="sidebar__link-floating">Home</span>
                            </Link>
                            <Link to={'/profile'} className="sidebar__link link ">
                                <FontAwesomeIcon className='ri-home-5-line' icon={faUser} />

                                <span class="sidebar__link-name">Profile</span>
                                <span class="sidebar__link-floating">Profile</span>
                            </Link>
                            <Link to={'/watchlist'} className="sidebar__link link">
                                <FontAwesomeIcon icon={faSquarePlus} />

                                <span class="sidebar__link-name">Wishlist</span>
                                <span class="sidebar__link-floating">Wishlist</span>
                            </Link>
                            <Link to={'/cartHistory'} className="sidebar__link link">
                                <FontAwesomeIcon icon={faSignsPost} />

                                <span class="sidebar__link-name">Cart</span>
                                <span class="sidebar__link-floating">Cart</span>
                            </Link>
                            <Link to={'/orderHistory'} className="sidebar__link link">
                                <FontAwesomeIcon icon={faFont} />

                                <span class="sidebar__link-name">Order History</span>
                                <span class="sidebar__link-floating">Order History</span>
                            </Link>
                            <Link to={'/newpassword'} className="sidebar__link link">
                                <FontAwesomeIcon icon={faFont} />

                                <span class="sidebar__link-name">Change Password</span>
                                <span class="sidebar__link-floating">Change Password</span>
                            </Link>
                            <span className="sidebar__link link" onClick={handlelogout}>
                                <FontAwesomeIcon icon={faRightFromBracket} />

                                <span class="sidebar__link-name">Logout</span>
                                <span class="sidebar__link-floating">Logout</span>
                            </span>

                        </div>
                    </div>
                </nav>
            </div>
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>

            </main>
        </div>


    )
}
