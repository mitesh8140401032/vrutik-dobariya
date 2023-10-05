import React, { useState } from 'react';
import Layout from './Layout';
import { useNavigate, useParams } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import parse from 'html-react-parser';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useEffect } from 'react';

function Products() {
    const { type, slug } = useParams();

    useEffect(() => {
        if (localStorage.getItem("Order")) {
            order = JSON.parse(localStorage.getItem("Order"))
        }
    }, [])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const RAM = JSON.parse(localStorage.getItem("RAM"))
    const HDD = JSON.parse(localStorage.getItem("HDD"))
    const SDD = JSON.parse(localStorage.getItem("SDD"))
    const Graphics = JSON.parse(localStorage.getItem("Graphics"))
    const navigate = useNavigate();
    const productData = JSON.parse(localStorage.getItem('Products'));
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const productIndex = productData.findIndex(obj => obj.id == slug);
    console.log(productIndex)
    const product = productData[productIndex];
    console.log(product.hdd)
    const [mainimage, setMainimage] = useState(product.img[0]);

    let getGRAPHICSCARD = [];
    let getSDD = [];
    let getRAM = [];
    let getHDD = [];

    let graphicscardLabel = '';
    let hddLabel = '';
    let sddLabel = '';
    let ramLabel = '';

    if (product.graphicscard) {
        getGRAPHICSCARD = Graphics.findIndex((obj) => obj.id === product.graphicscard);
        graphicscardLabel = getGRAPHICSCARD !== -1 ? Graphics[getGRAPHICSCARD].label : " ";
    }
    if (product.sdd) {
        getSDD = SDD.findIndex((obj) => obj.id === product.sdd);
        sddLabel = getSDD !== -1 ? SDD[getSDD].label : " ";
    }
    if (product.ram) {
        getRAM = RAM.findIndex((obj) => obj.id === product.ram);
        ramLabel = getRAM !== -1 ? RAM[getRAM].label : " ";
    }
    if (product.hdd) {
        getHDD = HDD.findIndex((obj) => obj.id === product.hdd);
        hddLabel = getHDD !== -1 ? HDD[getHDD].label : " ";
    }










    const login = JSON.parse(localStorage.getItem('Login'));
    const alldata = JSON.parse(localStorage.getItem('Alldata'));
    const index = alldata.findIndex(item => item.F_Name === login);
    const showaddress = alldata[index]?.address || [];


    const addressDetailsValidationSchema = Yup.object().shape({
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        pinCode: Yup.string().required('Zip Code is required'),
    });

    const handleAddToCart = (productId) => {
        alldata[index].cart.push(productId);
        localStorage.setItem('Alldata', JSON.stringify(alldata));
        navigate('/cart');
    };


    const handleThumbnailClick = (image) => {
        setMainimage(image);
    };
    let order = []
    const handleBuynow = (Product) => {

        if (login === null) {
            handleShow();
        }
        else {
            if (alldata[index].address.length === 0) {
                handleShow2();
            }
            else {
                let obj = {

                    ProductId: Product.id,
                    ProductPrice: Product.price,
                    OrderTD: moment(Date.now()).format('DD-MM-YYYY hh: mm: ss'),
                    Status: 'pending',
                    OrderId: Date.now(),
                    UserId: alldata[index].UserId
                }

                order.push(obj)
                console.log(order)
                alldata[index].myOrder.push(obj)

                console.log(alldata)
                localStorage.setItem("Alldata", JSON.stringify(alldata))
                localStorage.setItem("Order", JSON.stringify(order))
            }
        }
    }



    return (
        <Layout>
            <div className="container pt-5">
                <div className="row pt-5 pb-5 d-flex ">

                    <div className="row d-flex  align-content-center">
                        <div className="col-lg-2">
                            {product.img.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className="img-fluid m-2"
                                    height={100}
                                    width={100}
                                    onClick={() => handleThumbnailClick(image)}
                                />
                            ))}
                        </div>
                        <div className="magnifier-image col-lg-6  d-flex align-content-center justify-content-center " style={{ objectFit: 'cover' }}>

                            <ReactImageMagnify className='RESPONSIVE'
                                {...{
                                    smallImage: {
                                        alt: 'Product Zoom',
                                        isFluidWidth: false,
                                        src: mainimage,
                                        width: 300, // Adjust the width as needed
                                        height: 300,

                                    },
                                    largeImage: {
                                        src: mainimage,
                                        width: 800, // Adjust the width for the zoomed image
                                        height: 800, // Adjust the height for the zoomed image
                                    },
                                    mouseActivation: 'hover', // Options: 'click', 'hover', 'touch'
                                    isHintEnabled: true,

                                }}
                            />
                        </div>
                    </div>


                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <h1>Company: {product.company}</h1>
                        <h3>Product Price: ₹ {product.price}</h3>

                        {hddLabel.length === 0 ? (<>{ }</>) : (<h3>Hrad_Disk:-{hddLabel} <br /> </h3>)}
                        {ramLabel.length === 0 ? (<>{ }</>) : (<h3>Ram:-{ramLabel} <br /></h3>)}
                        {sddLabel.length === 0 ? (<>{ }</>) : (<h3>Sdd:-{sddLabel}<br /></h3>)}
                        {graphicscardLabel.length === 0 ? (<>{ }</>) : (<h3>{graphicscardLabel}<br /></h3>)}
                        {parse(product.description)}

                        <button className="btn btn-success m-3" onClick={() => handleAddToCart(product.id)}>
                            Add Cart
                        </button>
                        <button className="btn btn-success m-3" onClick={() => handleBuynow(product)}>Buy</button>
                    </div>
                </div>
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
                <Modal show={show2} onHide={handleClose2} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                street: showaddress[index]?.street || '',
                                city: showaddress[index]?.city || '',
                                pinCode: showaddress[index]?.pinCode || '',


                            }}
                            validationSchema={addressDetailsValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                if (alldata[index].address.length === 0) {
                                    alldata[index].address.push(values);
                                    localStorage.setItem("Alldata", JSON.stringify(alldata));
                                    console.log("New Address", alldata);
                                } else {
                                    let address = alldata[index].address;
                                    address[index].street = values.street;
                                    address[index].city = values.city;
                                    address[index].pinCode = values.pinCode;
                                    localStorage.setItem("Alldata", JSON.stringify(alldata));
                                    console.log("Update Address", alldata);
                                }
                                console.log('Address details form submitted:', values);

                                handleClose2();

                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div>
                                        <label>Street</label>
                                        <Field type="text" name="street" className="form-control" />
                                        <ErrorMessage name="street" component="div" />
                                    </div>
                                    <div>
                                        <label>City</label>
                                        <Field type="text" name="city" className="form-control" />
                                        <ErrorMessage name="city" component="div" />
                                    </div>
                                    <div>
                                        <label>Zip Code</label>
                                        <Field type="text" name="pinCode" className="form-control" />
                                        <ErrorMessage name="pinCode" component="div" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting}>
                                        Save
                                    </button>
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
        </Layout>
    );
}

export default Products;
