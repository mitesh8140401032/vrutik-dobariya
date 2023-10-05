import React, { useEffect } from 'react'
import Header from './Header'
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from 'formik';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';
export default function Login() {
  var navigate = useNavigate()
  let fromdata = []
  if (localStorage.getItem("Alldata")) {

    fromdata = JSON.parse(localStorage.getItem('Alldata'))
  }
  console.log(fromdata)
  const validationSchema = Yup.object().shape({
    Username: Yup.string()
      .required('Username ID is required'),
    Password: Yup.string()
      .required('Password is required')
  });
  const Admin = [{ Admin: 'Decode', Password: '8140401032' }]
  console.log(Admin)
  const initialValues = {
    Username: '',
    Password: '',
  };

  const onSubmit = (values) => {
    let isUser = false;
    let isAdmin = false;


    for (let i = 0; i < fromdata.length; i++) {
      if (fromdata[i].F_Name === values.Username && fromdata[i].Password === values.Password) {
        isUser = true;

      }
    }


    for (let i = 0; i < Admin.length; i++) {
      if (Admin[i].Admin === values.Username && Admin[i].Password === values.Password) {
        isAdmin = true;

      }
    }

    if (isUser) {

      localStorage.setItem('Login', JSON.stringify(values.Username));
      navigate('/');
    } else if (isAdmin) {
      localStorage.setItem('Admin', JSON.stringify(values.Username));
      navigate('/add');
    } else {

      toast.error('Invalid credentials');
    }
  };

  return (
    <>
      <Header />
      <div className='pt-5'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ errors, touched, values }) => (
            <Form className='loginform'>
              <div className="container pt-5">


                <div className="row d-flex align-items-center justify-content-center ms-5 me-5">
                  <div className="col-lg-3 col-md-6 col-sm-12 m-3 "  >
                    <Field type="text" className='form-control' placeholder='Username' name='Username' />
                    <ErrorMessage name="Username" component="div" className="text-danger" />
                  </div>


                </div>
                <div className="row d-flex align-items-center justify-content-center ms-5 me-5">
                  <div className="col-lg-3 col-md-6 col-sm-12 m-3 "  >
                    <Field type="password" className='form-control' placeholder='password' name='Password' />
                    <ErrorMessage name="Password" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="row d-flex align-items-center justify-content-center ms-5 me-5">

                  <button className='col-lg-2   btn btn-success'>Submit</button>

                </div>
                <div className='d-flex justify-content-center'>
                  <Link to={'/forget'}><span>Forget Password</span></Link>
                </div>
                <h6 className='text-center mt-3'>Don't have an account? <Link to={'/registration'} className='login'>Registration</Link></h6>
              </div>
            </Form>
          )}

        </Formik>
        <ToastContainer />
      </div>
    </>
  )
}
