import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Market.css'
import LayoutProct from './LayoutProct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';

export default function Market() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const navigate = useNavigate()
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedType, setSelectedType] = useState('');
  const [sortingOption, setSortingOption] = useState('');
  const toggleRef = useRef(null);
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);
  const linkRefs = useRef([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let productdata = []
  let Ram = []
  let HDD = []
  let SDD = []
  let GRAPICSCARD = []
  if (localStorage.getItem("Products")) {

    productdata = JSON.parse(localStorage.getItem("Products"));
  }
  if (localStorage.getItem("RAM")) {
    Ram = JSON.parse(localStorage.getItem("RAM"))

  }
  if (localStorage.getItem("HDD")) {
    HDD = JSON.parse(localStorage.getItem("HDD"))

  }
  if (localStorage.getItem("SDD")) {

    SDD = JSON.parse(localStorage.getItem("SDD"))
  }
  if (localStorage.getItem("Graphics")) {
    GRAPICSCARD = JSON.parse(localStorage.getItem("Graphics"))

  }
  var filteredProducts = [];


  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const [likedProducts, setLikedProducts] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRam, setSelectedRam] = useState('');
  const [selectedHDD, setSelectedHDD] = useState('');
  const [selectedSDD, setSelectedSDD] = useState('');
  const [selectedGRAPICSCARD, setSelectedGRAPICSCARD] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const toggleSidebar = () => {
    setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
  };
  const linkColor = (link) => {
    linkRefs.current.forEach(l => l.classList.remove('active-link'));
    link.classList.add('active-link');
  };
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRamChange = (id) => {
    const updatedSelectedRam = [...selectedRam];
    if (updatedSelectedRam.includes(id)) {
      const index = updatedSelectedRam.indexOf(id);
      if (index !== -1) {
        updatedSelectedRam.splice(index, 1);
      }
    } else {
      updatedSelectedRam.push(id);
    }
    setSelectedRam(updatedSelectedRam);
  };
  const handleHDDChange = (id) => {
    const updatedSelectedHDD = [...selectedHDD];
    if (updatedSelectedHDD.includes(id)) {
      const index = updatedSelectedHDD.indexOf(id);
      if (index !== -1) {
        updatedSelectedHDD.splice(index, 1);
      }
    } else {
      updatedSelectedHDD.push(id);
    }
    setSelectedHDD(updatedSelectedHDD);
  };
  const handleSDDChange = (id) => {
    const updatedSelectedSDD = [...selectedSDD];
    if (updatedSelectedSDD.includes(id)) {
      const index = updatedSelectedSDD.indexOf(id);
      if (index !== -1) {
        updatedSelectedSDD.splice(index, 1);
      }
    } else {
      updatedSelectedSDD.push(id);
    }
    setSelectedSDD(updatedSelectedSDD);
  };
  const handleGRAPICSCARDChange = (id) => {
    const updatedSelectedGRAPICSCARD = [...selectedGRAPICSCARD];
    if (updatedSelectedGRAPICSCARD.includes(id)) {
      const index = updatedSelectedGRAPICSCARD.indexOf(id);
      if (index !== -1) {
        updatedSelectedGRAPICSCARD.splice(index, 1);
      }
    } else {
      updatedSelectedGRAPICSCARD.push(id);
    }
    setSelectedGRAPICSCARD(updatedSelectedGRAPICSCARD);
  };
  const handleGrapicscardChange = (event) => {
    console.log(event.target.value)
  }

  if (productdata !== null) {
    if (productdata !== null) {
      filteredProducts = productdata.filter((product) => {
        const productPrice = parseFloat(product.price);
        const isPriceInRange = productPrice >= priceRange[0] && productPrice <= priceRange[1];
        const isTypeMatch = selectedType === '' || product.type === selectedType;
        const isCompanyMatch = selectedCompany === '' || product.company === selectedCompany;
        const isRamMatch = selectedRam.length === 0 || selectedRam.includes(product.ram);
        const isHDDMatch = selectedHDD.length === 0 || selectedHDD.includes(product.hdd);
        const isSDDMatch = selectedSDD.length === 0 || selectedSDD.includes(product.sdd);
        const isGRAPICSCARDMatch = selectedGRAPICSCARD.length === 0 || selectedGRAPICSCARD.includes(product.graphicscard);
        const productTitle = product.name.toLowerCase();
        return (
          isPriceInRange &&
          isTypeMatch &&
          isCompanyMatch &&
          isRamMatch &&
          isHDDMatch &&
          isSDDMatch &&
          isGRAPICSCARDMatch &&
          productTitle.includes(searchQuery.toLowerCase())

        );
      });
    }

  } else {
    console.log('No product data available');
  }

  const alldata = JSON.parse(localStorage.getItem('Alldata'));

  const handleAddToCart = (productId) => {
    console.log(productId)
    const login = JSON.parse(localStorage.getItem('Login'));
    console.log(login)
    if (login === null) {

      console.log("object")

      handleShow();

    } else {
      const index = alldata.findIndex((item) => item.F_Name === login);
      if (index !== -1) {

        if (alldata[index].cart.includes(productId)) {
          toast.error('Product is already in the cart !', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {

          alldata[index].cart.push(productId);
          localStorage.setItem('Alldata', JSON.stringify(alldata));
          navigate("/cart")
        }
      } else {

        console.error('User data not found in alldata');
      }

    }
  };


  const handleWatchlist = (id) => {
    const alldata = JSON.parse(localStorage.getItem("Alldata"));
    const login = JSON.parse(localStorage.getItem("Login"));
    const index = alldata.findIndex((items) => items.F_Name === login);

    const updatedWatchlist = [...alldata[index].watchlist];
    const isAlreadyInWatchlist = updatedWatchlist.includes(id);

    if (isAlreadyInWatchlist) {
      // Remove the product from the watchlist
      const updatedWatchlistWithoutId = updatedWatchlist.filter((watchlistId) => watchlistId !== id);
      alldata[index].watchlist = updatedWatchlistWithoutId;
      // Remove the product from likedProducts state
      setLikedProducts(likedProducts.filter((productId) => productId !== id));
    } else {
      // Add the product to the watchlist
      updatedWatchlist.push(id);
      alldata[index].watchlist = updatedWatchlist;
      // Add the product to likedProducts state
      setLikedProducts([...likedProducts, id]);
    }

    localStorage.setItem("Alldata", JSON.stringify(alldata));
  };


  return (
    <LayoutProct>


      <div className={`wrapper ${sidebarOpen ? 'show-sidebar' : ''}`} style={{ overflow: 'hidden', paddingTop: '150px' }}>


        <header className="header" style={{ paddingBottom: '100px' }}>
          <div className="header__container" style={{ marginTop: '111px', backgroundColor: 'white' }}>

            <button ref={toggleRef} className='btn header__toggle' style={{ marginTop: '12px', color: 'black', float: 'right' }}>
              <FontAwesomeIcon icon={faFilter} className='fs-3' />
            </button>
          </div>
          <div>

          </div>
        </header>

        <div className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`} id="sidebar" ref={sidebarRef} style={{ position: 'fixed', padding: '0px 20px' }}>

          <nav className="sidebar__container">

            <div className="sidebar__content">
              <div className="sidebar__list">


                Price Slider
                <div className='ms-3 me-3'>
                  <Box >

                    <Slider

                      getAriaLabel={() => 'Price range'}
                      value={priceRange}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      max={100000}

                    />
                  </Box>
                </div>
                Product Option
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className='form-select'
                >
                  <option value="" className='selected'>All Types</option>
                  <option value="computer">Computer</option>
                  <option value="laptop">Laptop</option>
                  <option value="mouse">Mouse</option>
                  <option value="keyoborad">Keyborad</option>
                  <option value="monitor">Monitor</option>
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
                Select Company
                <select className='form-select' onChange={(e) => { setSelectedCompany(e.target.value) }} value={selectedCompany}>
                  <option value="" className='selected'>No Sorting</option>

                  <option value="Hp">Hp</option>
                  <option value="Dell">Dell</option>
                  <option value="Asus">Asus</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Apple">Apple</option>
                  <option value="Acer">Acer</option>
                  <option value="Tvs">TVS</option>
                </select>

                <div>
                  <h6>Select Ram </h6>

                  {Ram.map((i) => (
                    <span className='ms-1 me-1' key={i.label}>
                      <input
                        type='checkbox'
                        value={i.label}
                        onChange={() => handleRamChange(i.id)}
                        checked={selectedRam.includes(i.id)}
                      />
                      {i.label}
                    </span>
                  ))}

                </div>

                <div>
                  <h6>Select HDD </h6>

                  {HDD.map((i) => (
                    <span className='ms-1 me-1' key={i.label}>
                      <input
                        type='checkbox'
                        value={i.label}
                        onChange={() => handleHDDChange(i.id)}
                        checked={selectedHDD.includes(i.id)}
                      />
                      {i.label}
                    </span>
                  ))}

                </div>
                <div>
                  <h6>Select SDD </h6>

                  {SDD.map((i) => (
                    <span className='ms-1 me-1' key={i.label}>
                      <input
                        type='checkbox'
                        value={i.label}
                        onChange={() => handleSDDChange(i.id)}
                        checked={selectedSDD.includes(i.id)}
                      />
                      {i.label}
                    </span>
                  ))}

                </div>
                <div>
                  <h6>Select SDD </h6>

                  {GRAPICSCARD.map((i) => (
                    <span className='ms-1 me-1' key={i.label}>
                      <input
                        type='checkbox'
                        value={i.label}
                        onChange={() => handleGRAPICSCARDChange(i.id)}
                        checked={selectedGRAPICSCARD.includes(i.id)}
                      />
                      {i.label} <br />
                    </span>
                  ))}

                </div>

              </div>
            </div>
          </nav>
        </div>
        <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
          <div className="container pt-2 pb-5">
            <h1 className='text-center'>/All Products/</h1>
            <div className="row d-flex  m-0 p-0">

              <div className='d-flex justify-content-center text-center '>

                <div className="col-lg-4 ">
                  <input
                    type="text"
                    placeholder="Search_Title"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control"
                  />
                </div>

              </div>
              {filteredProducts.map(product => (
                <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mt-4" >
                  <div class="card" >
                    <div>
                      <Link to={'/products/' + product.type + "/" + product.id} className='anchor'>

                        <img src={product.img[0]} className="img-fluid  images p-3" alt="..." />
                      </Link>

                      <div class="card-body">

                        <h5 class="card-title">Title:-{product.name}</h5>
                        <h5>Company_Name:-{product.company}</h5>
                        <Link to={'/products/' + product.type + "/" + product.id} className='anchor'>

                          <h5 class="card-text">₹<span className='fs-3'>{product.price}</span> </h5>
                        </Link>

                        <button onClick={() => { handleAddToCart(product.id) }}>Add To Cart</button>
                        <FontAwesomeIcon
                          onClick={() => handleWatchlist(product.id)}
                          className={likedProducts.includes(product.id) ? 'text-danger fs-3' : 'fs-3'}
                          icon={faHeart}
                        />


                        <Modal show={show} onHide={handleClose} centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Login Form</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Formik
                              initialValues={{ username: '', password: '' }}
                              validationSchema={validationSchema}
                              onSubmit={(values) => {
                                let isUser = false;
                                for (let i = 0; i < alldata.length; i++) {
                                  if (alldata[i].F_Name === values.username && alldata[i].Password === values.password) {
                                    isUser = true;

                                  }
                                }
                                if (isUser) {
                                  localStorage.setItem("Login", JSON.stringify(values.username))
                                }
                                else {
                                  alert("Invalid credentials")
                                }
                                handleClose();

                              }}
                            >
                              {({ isSubmitting }) => (
                                <Form>
                                  <div className="mb-3">
                                    <Field
                                      type="text"
                                      placeholder="username"
                                      name="username"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="username"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <Field
                                      type="password"
                                      placeholder="password"
                                      name="password"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                  <div className="d-grid">
                                    <button type="submit" disabled={isSubmitting}>
                                      Submit
                                    </button>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </Modal.Body>

                          <Modal.Footer>
                            <button onClick={handleClose} className="btn btn-secondary">
                              Close
                            </button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>

                  </div>
                </div>

              ))}
            </div>
          </div>
        </main>



        <ToastContainer />
      </div>

    </LayoutProct>
  );
}
