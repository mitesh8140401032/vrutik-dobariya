import { faBars, faChartLine, faChartSimple, faFont, faHouse, faKey, faRightFromBracket, faSignsPost, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminSidebar() {
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
        localStorage.removeItem('Admin')
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





                            <Link to={'/add'} className="sidebar__link link ">
                                <FontAwesomeIcon icon={faSquarePlus} />
                                <span class="sidebar__link-name">Add_Products</span>
                                <span class="sidebar__link-floating">Add_Products</span>
                            </Link>
                            <Link to={'/productsanalytics'} className="sidebar__link link ">
                                <FontAwesomeIcon icon={faChartLine} />
                                <span class="sidebar__link-name">Products_Analytics</span>
                                <span class="sidebar__link-floating">Products_Analytics</span>
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
