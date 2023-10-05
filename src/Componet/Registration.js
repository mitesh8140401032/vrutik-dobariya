import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
let fromarray = [];
export default function Registration() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Alldata")) {
      fromarray = JSON.parse(localStorage.getItem("Alldata"))
    }
  })
  const validationSchema = Yup.object().shape({
    F_Name: Yup.string().required('First Name is required'),
    Email: Yup.string().required('Email ID is required').email('Invalid email address'),
    Password: Yup.string().required('Password is required'),
    Contact_Number: Yup.string()
      .required('Contact number is required')
      .matches(/^[0-9]{10}$/, 'Contact number must be a 10-digit number'),
  });
  let accountNumber = '10000'
  const digits = '0123456789'
  for (let index = 0; index < 3; index++) {
    accountNumber += digits[Math.floor(Math.random() * 10)];
  }
  const initialValues = {
    F_Name: '',
    Contact_Number: '',
    Email: '',
    Password: '',
    img: '',
    cart: [],
    bankdetails: [],
    address: [],
    watchlist: [],
    myOrder: [],
    UserId: accountNumber

  };

  const onSubmit = (values, { resetForm }) => {
    let already = false
    if (JSON.parse(localStorage.getItem('Alldata'))) {
      for (let i = 0; i < fromarray.length; i++) {
        if (fromarray[i].Email === values.Email || fromarray[i].Contact_Number === values.Contact_Number)
          already = true;
      }
    }

    if (already) {
      toast.error('Already Resgistered', {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      console.log("success")
      fromarray.push(values);

      localStorage.setItem("Alldata", JSON.stringify(fromarray));
      navigate("/login");
    }
    resetForm();

  }

  return (
    <>
      <Header />
      <div className='pt-5' >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>

          <Form className='loginform'>
            <div className="container pt-5">
              <div className="row d-flex align-items-center justify-content-center ms-5 me-5">
                <div className="col-lg-3 col-md-6 col-sm-12 m-3">

                  <Field type="text" className='form-control' placeholder='Full_Name' name='F_Name' />
                  <ErrorMessage name="F_Name" component="div" className="text-danger" />
                </div>

              </div>
              <div className="row d-flex align-items-center justify-content-center ms-5 me-5">


                <div className="col-lg-3 col-md-6 col-sm-12 m-3 "  >
                  <Field type="number" className='form-control' placeholder='Contact_Number' name='Contact_Number' />
                  <ErrorMessage name="Contact_Number" component="div" className="text-danger" />
                </div>
              </div>
              <div className="row d-flex align-items-center justify-content-center ms-5 me-5">
                <div className="col-lg-3 col-md-6 col-sm-12 m-3 "  >
                  <Field type="email" className='form-control' placeholder='Email ID' name='Email' />
                  <ErrorMessage name="Email" component="div" className="text-danger" />
                </div>
              </div>
              <div className="row d-flex align-items-center justify-content-center ms-5 me-5">
                <div className="col-lg-3 col-md-6 col-sm-12 m-3 "  >
                  <Field type="password" className='form-control' placeholder='password' name='Password' />
                  <ErrorMessage name="Password" component="div" className="text-danger" />
                </div>
              </div>
              <div className="row  d-flex align-items-center justify-content-center ms-5 me-5">


                <button className='col-lg-2   btn btn-success' type='submit'>Submit</button>


              </div>
              <h6 className='text-center mt-3'>Have an account? <Link to={'/login'} className='login'>Login</Link></h6>
            </div>
          </Form>


        </Formik>


        <ToastContainer />

      </div>
    </>
  )
}
