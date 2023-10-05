import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Sidebar from './Sidebar';
import Modal from 'react-bootstrap/Modal';


import './Profile.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Profile() {
    const mainRef = useRef(null);

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const handleShowModal1 = () => setShowModal1(true);
    const handleShowModal2 = () => setShowModal2(true);
    const handleShowModal3 = () => setShowModal3(true);
    const handleCloseModal1 = () => setShowModal1(false);
    const handleCloseModal2 = () => setShowModal2(false);
    const handleCloseModal3 = () => setShowModal3(false);




    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };


    const login = JSON.parse(localStorage.getItem('Login'));
    const alldata = JSON.parse(localStorage.getItem('Alldata'));
    const index = alldata.findIndex(item => item.F_Name === login);
    const showaddress = alldata[index].address
    const showbank = alldata[index].bankdetails


    // Formik and Yup
    const bankValidationSchema = Yup.object().shape({
        accountNumber: Yup.number().required('Account number is required'),
        name: Yup.string().required('Name is required'),
        bankName: Yup.string().required('Bank name is required'),
        ifscCode: Yup.string().required('IFSC code is required'),
    });

    const addressDetailsValidationSchema = Yup.object().shape({
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        pinCode: Yup.string().required('Zip Code is required'),
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        contact: Yup.string().required('Contact number is required'),
    });
    const [avatar, setAvatar] = useState('');
    const [avatarBase64, setAvatarBase64] = useState('');

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarBase64(reader.result);
            };
            reader.readAsDataURL(file);
            setAvatar(file);
        }
    };



    return (
        <div>
            <Sidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}  >


                <div className='pt-3 pb-3'>

                    <div className="container mt-5">
                        <div className="profile">
                            <div className="row d-flex align-items-top">
                                <div className="col-lg-6 col-sm-10">
                                    <h1>Personal Detail</h1>
                                </div>
                                <div className="col-lg-6 col-sm-2 text-end">
                                    <button onClick={handleShowModal1} className='me-2 mt-3 editbtn'>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img src={alldata[index].img} alt="!!.." width={100} height={100} style={{ objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <div className="row" style={{ wordBreak: 'break-all' }}>
                                <div className="col-lg-6">
                                    <h3 className='ms-2'>Name:-{alldata[index].F_Name}</h3>
                                </div>
                                <div className="col-lg-6">
                                    <h3 className='ms-2'>Email:-{alldata[index].Email}</h3>
                                </div>
                                <div className="col-lg-6">
                                    <h3 className='ms-2'>Contact:-{alldata[index].Contact_Number}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        <div className="profile">
                            <div className="row">
                                <div className="col-lg-10">
                                    <h1>Residental Detail</h1>

                                </div>
                                <div className="col-lg-2 text-end">
                                    <button onClick={handleShowModal2} className='me-2 mt-3 editbtn'>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </div>
                            </div>
                            <div className="row" style={{ wordBreak: 'break-all' }}>
                                <div className="col-lg-6">
                                    <h3>Street:-{showaddress[index]?.street || ''}</h3>
                                </div>
                                <div className="col-lg-6">
                                    <h3>City:-{showaddress[index]?.city || ''}</h3>

                                </div>
                                <div className="col-lg-6">
                                    <h3>Pincode:-{showaddress[index]?.pinCode || ''}</h3>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-5">
                        <div className="profile">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h1>    Bank Detail</h1>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <button onClick={handleShowModal3} className='me-2 mt-3 editbtn'>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </div>
                            </div>
                            <div className="row" style={{ wordBreak: 'break-all' }}>
                                <div className="col-lg-6">
                                    <h3>Account_number:-{showbank[index]?.accountNumber || ''}</h3>
                                </div>
                                <div className="col-lg-6">
                                    <h3>Bank_name{showbank[index]?.bankName || ''}</h3>

                                </div>
                                <div className="col-lg-6">
                                    <h3>Holder_name:-{showbank[index]?.name || ''}</h3>

                                </div>
                                <div className="col-lg-6">
                                    <h3>Ifsc_code:-{showbank[index]?.ifscCode || ''}</h3>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <Modal show={showModal1} onHide={handleCloseModal1}>
                <Modal.Header closeButton>
                    <Modal.Title>Personal Details</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={{ avatar: alldata[index].img, email: alldata[index].Email, contact: alldata[index].Contact_Number }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (alldata[index].Email === '') {
                            console.log("Add")
                        } else {
                            let s = alldata
                            s[index].Email = values.email
                            s[index].img = avatarBase64
                            s[index].Contact_Number = values.contact
                            localStorage.setItem("Alldata", JSON.stringify(s))
                            console.log("Update")
                        }
                        handleCloseModal1();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Modal.Body>
                                <img src={avatarBase64} alt="Avatar" width={100} height={100} />
                                <input type="file" name="avatar" accept="image/*" className="form-control mt-3" onChange={handleFileChange} />
                                <Field type="email" name="email" placeholder="Email" className="form-control mt-3" />
                                <Field type="tel" name="contact" placeholder="Contact" className="form-control mt-3" />
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" variant="secondary" onClick={handleCloseModal1}>
                                    Close
                                </button>
                                <button type="submit" variant="primary" disabled={isSubmitting}>
                                    Save
                                </button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>

            <Modal show={showModal2} onHide={handleCloseModal2}>
                <Modal.Header closeButton>
                    <Modal.Title>Address Details</Modal.Title>
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
                            handleCloseModal2();
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
                    <button variant="secondary" onClick={handleCloseModal2}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal3} onHide={handleCloseModal3}>
                <Modal.Header closeButton>
                    <Modal.Title>Bank Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    
                    <Formik
                        initialValues={{
                            accountNumber: showbank[index]?.accountNumber || '',
                            name: showbank[index]?.name || '',
                            bankName: showbank[index]?.bankName || '',
                            ifscCode: showbank[index]?.ifscCode || '',

                        }}
                        validationSchema={bankValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            if (alldata[index].bankdetails.length === 0) {
                                alldata[index].bankdetails.push(values);
                                console.log("Add", alldata);
                            } else {
                                let bank = alldata[index].bankdetails;
                                bank[index].accountNumber = values.accountNumber;
                                bank[index].name = values.name;
                                bank[index].bankName = values.bankName;
                                bank[index].ifscCode = values.ifscCode;
                                console.log("Update", alldata);
                            }
                            localStorage.setItem("Alldata", JSON.stringify(alldata));
                            handleCloseModal3();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <label>Account Number</label>
                                    <Field type="number" name="accountNumber" className="form-control" />
                                    <ErrorMessage name="accountNumber" component="div" />
                                </div>
                                <div>
                                    <label>Name</label>
                                    <Field type="text" name="name" className="form-control" />
                                    <ErrorMessage name="name" component="div" />
                                </div>
                                <div>
                                    <label>Bank Name</label>
                                    <Field type="text" name="bankName" className="form-control" />
                                    <ErrorMessage name="bankName" component="div" />
                                </div>
                                <div>
                                    <label>IFSC Code</label>
                                    <Field type="text" name="ifscCode" className="form-control" />
                                    <ErrorMessage name="ifscCode" component="div" />
                                </div>
                                <button type="submit" disabled={isSubmitting}>
                                    Save
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleCloseModal3}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

        </div >










    )
}
