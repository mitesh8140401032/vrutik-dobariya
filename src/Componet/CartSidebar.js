import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import Header from './Header'

import '../Componet/Profile/Sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';


export default function CartSidebar() {
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
    const handleAddToCart = (productId) => {
        let login = []
        let alldata = []
        if (localStorage.getItem("Login")) {

            login = JSON.parse(localStorage.getItem('Login'));
        }
        if (localStorage.getItem("Alldata")) {

            alldata = JSON.parse(localStorage.getItem('Alldata'));
        }

        const index = alldata.findIndex(item => item.F_Name === login);
        console.log(index)
        let alreadycart = false;
        for (let i = 0; i < alldata[index].cart.length; i++) {
            if (alldata[index].cart[i] === productId) {
                alreadycart = true;
            }
        }

        if (alreadycart) {
            toast.error('Product is already in the cart !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            alldata[index].cart.push(productId);
            localStorage.setItem("Alldata", JSON.stringify(alldata));
            navigate('/cart')
        }
    };
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [selectedType, setSelectedType] = useState('');
    const [sortingOption, setSortingOption] = useState('');
    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    let productdata = []
    if (localStorage.getItem("Products")) {

        productdata = JSON.parse(localStorage.getItem("Products"));
    }
    console.log(productdata)
    let filteredProducts = [];
    if (productdata !== null) {
        filteredProducts = productdata.filter(product => {
            const productPrice = parseFloat(product.totalprice);
            const isPriceInRange = productPrice >= priceRange[0] && productPrice <= priceRange[1];
            const isTypeMatch = selectedType === '' || product.type === selectedType;
            return isPriceInRange && isTypeMatch;
        });

        if (sortingOption === 'lowToHigh') {
            filteredProducts.sort((a, b) => parseFloat(a.totalprice) - parseFloat(b.totalprice));
        } else if (sortingOption === 'highToLow') {
            filteredProducts.sort((a, b) => parseFloat(b.totalprice) - parseFloat(a.totalprice));
        }
    } else {
        console.log('No product data available');
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



            <Header />

            <div className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`} id="sidebar" ref={sidebarRef} style={{}}>
                <header className="header">
                    <div className="header__container" style={{ backgroundColor: 'white' }}>
                        <button ref={toggleRef} className='btn header__toggle'>
                            <FontAwesomeIcon icon={faBars} className='fs-3' />
                        </button>
                    </div>
                </header>
                <nav className="sidebar__container">
                    <div class="sidebar__logo">

                    </div>
                    <div className="sidebar__content">
                        <div className="sidebar__list">

                            <div className='p-2'>
                                <Slider
                                    getAriaLabel={() => 'Price range'}
                                    value={priceRange}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    max={100000}
                                />
                            </div>



                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className='form-select'
                            >
                                <option value="" className='selected'>All Types</option>
                                <option value="computer">Computer</option>
                                <option value="laptop">Laptop</option>
                            </select>
                            Price Sorting
                            <select
                                value={sortingOption}
                                onChange={(e) => setSortingOption(e.target.value)}
                                className='form-select'
                            >
                                <option value="" className='selected'>No Sorting</option>
                                <option value="lowToHigh">Low to High</option>
                                <option value="highToLow">High to Low</option>
                            </select>

                        </div>
                    </div>
                </nav>
            </div>
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef} style={{ paddingTop: '80px' }}>
                <div className=" pt-2 pb-5">
                    <div className="row d-flex justify-content-center m-0 p-0">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mt-4">
                                <div class="card">
                                    {!product.id ? (
                                        <div>
                                            <Skeleton height={50} />
                                            <br />
                                            <Skeleton count={5} />
                                        </div>
                                    ) : (

                                        <div>
                                            <Link to={'/products/' + product.type + "/" + product.id} className='anchor'>

                                                <img src={product.img[0]} className="card-img-top images" alt="..." height={250} width={250} />
                                            </Link>

                                            <div class="card-body">

                                                <h5 class="card-title">Title:-{product.name}</h5>
                                                <h5>Company_Name:-{product.company}</h5>
                                                <Link to={'/products/' + product.type + "/" + product.id} className='anchor'>

                                                    <h5 class="card-text"><sup>₹</sup><span className='fs-3'>{product.totalprice}</span> <span className='fs-6'> MRF: <del> {product.price}</del></span> <span className='text-danger'>({product.discount}%off)</span></h5>
                                                </Link>
                                                {parse(product.description)}
                                                {/* <Link to={'/cart'}> */}
                                                <button onClick={() => handleAddToCart(product.id)}>Add Cart</button>
                                                {/* </Link> */}
                                                {/* <Link to={'/cart'}><button>Buy</button></Link> */}

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </main>
        </div>


    )
}
