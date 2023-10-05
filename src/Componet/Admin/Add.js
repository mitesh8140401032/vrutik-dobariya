import React, { useEffect } from 'react'
import JoditEditor from 'jodit-react';
import '../Profile/Add.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRef } from 'react';


import AdminSidebar from './AdminSidebar';

let Products = []
export default function Add() {
  useEffect(() => {
    if (localStorage.getItem("Products")) {
      Products = JSON.parse(localStorage.getItem("Products"))
    }
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);
  const toggleSidebar = () => {
    setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
  };

  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        imagePreviews.push(e.target.result);
        if (imagePreviews.length === files.length) {
          setSelectedImages(imagePreviews);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    companyName: Yup.string().required('Company Name is required'),
    productType: Yup.string().required('Please select a product type'),
    price: Yup.number().required('Price is required').min(1, 'Min').max(100000, 'Max'),


  });


  const onSubmit = (values, { resetForm }) => {




    const obj = {
      name: values.title,
      company: values.companyName,
      type: values.productType,
      price: values.price,
      img: selectedImages,

      amount: values.price,

      id: Date.now()
    };
    let alraedyAdd = false
    if (JSON.parse(localStorage.getItem("Products"))) {
      for (let i = 0; i < Products.length; i++) {
        if (values.title === Products[i].name)
          alraedyAdd = true
      }
    }
    if (alraedyAdd) {
      console.log("Already Add")
    } else {
      Products.push(obj);
      localStorage.setItem("Products", JSON.stringify(Products));
    }



    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
    setSelectedImages([])

    resetForm();
  };

  return (
    <div>
      <AdminSidebar />
      <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}  >

        <h1 className='text-start'>Add Products</h1>
        <div className="row d-flex justify-content-start m-0 ">
          <div className="col-lg-7 col-sm-12 m-0 p-0  pb-5">
            <Formik
              initialValues={{
                title: '',
                companyName: '',
                productType: '',
                price: '',
                img: '',

                hdd: '',
                graphicscard: '',
                sdd: '',
                id: Date.now()
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}

            >
              {({ isSubmitting }) => (
                <Form>

                  <div className=" ">
                    <Field type="text" name="title" className='form-control mt-4' placeholder='Product_Tittle' />
                    <ErrorMessage name="title" component="div" className="error-message text-danger" />

                    <Field type="text" name="companyName" className='form-control mt-4' placeholder='Company Name' />
                    <ErrorMessage name="companyName" component="div" className="error-message text-danger" />

                    <Field as="select" name="productType" className="form-select mt-4" aria-label="Default select example">
                      <option value="">Select a Product Type</option>
                      <option value="laptop">Laptop</option>
                      <option value="computer">Computer</option>
                      <option value="mouse">Mouse</option>
                      <option value="keyoborad">Keyborad</option>
                      <option value="monitor">Monitor</option>
                    </Field>
                    <ErrorMessage name="productType" component="div" className="error-message text-danger" />

                    <Field type="number" name="price" className='form-control mt-4' placeholder='Price' maxlength="4" />
                    <ErrorMessage name="price" component="div" className="error-message text-danger" />




                    <input type="file" name="img" className='form-control mt-4' multiple accept="image/png, image/gif, image/jpeg" onChange={handleImageChange} />
                    <ErrorMessage name="img" component="div" className="error-message text-danger" />

                    <div className="image-preview">
                      {selectedImages.map((image, index) => (
                        <img key={index} src={image} alt={`Preview ${index}`} className="preview-image" height={100} />
                      ))}
                    </div>

                    <div className='d-flex justify-content-center'>
                      <button type="submit" className='button mt-4' disabled={isSubmitting}>Submit</button>

                    </div>
                  </div>
                </Form>
              )}
            </Formik>


          </div>
        </div>
      </div>

    </div>


  )
}
