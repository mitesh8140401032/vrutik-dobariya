import React, { useEffect, useRef, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import JoditEditor from 'jodit-react';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';


export default function Editpage() {

    const navigate = useNavigate()
    const mainRef = useRef(null);
    const [content, setContent] = useState('');

    const [selectedImages, setSelectedImages] = useState([]);

    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleSwitchChange = () => {
        setIsChecked((prevChecked) => !prevChecked);
    };
    const handleSwitchChange2 = () => {
        setIsChecked2((prevChecked) => !prevChecked);
    }; const handleSwitchChange3 = () => {
        setIsChecked3((prevChecked) => !prevChecked);
    };
    const handleSwitchChange4 = () => {
        setIsChecked4((prevChecked) => !prevChecked);
    };
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };

    const Harddisk = [
        { label: '500GB', price: '2500', id: 1 },
        { label: '1TB', price: '7500', id: 2 },
        { label: '2TB', price: '8000', id: 3 },
        { label: '3TB', price: '9500', id: 4 }
    ]

    const Sdd = [
        { label: '120GB', price: '2500', id: 101 },
        { label: '256GB', price: '7500', id: 102 },
        { label: '1TB', price: '8000', id: 103 },
        { label: '2TB', price: '8000', id: 104 }
    ]
    const Ram = [
        { label: '4gb', price: '4000', id: 201 },
        { label: '8gb', price: '8000', id: 202 },
        { label: '16gb', price: '12500', id: 203 },
        { label: '32gb', price: '15000', id: 204 }
    ]
    const Grap = [
        { label: 'ZEB-GT730-4GD3', price: '4000', id: 301 },
        { label: 'ZEB-GT730-5AC3', price: '8000', id: 302 },
        { label: 'ZEB-GT730-5AC4', price: '12500', id: 303 },
        { label: 'ZEB-GT730-5GV4', price: '15000', id: 304 }
    ]
    const [selectedHDD, setSelectedHDD] = useState('');
    const [selectedSDD, setSelectedSDD] = useState('');
    const [selectedRAM, setSelectedRAM] = useState('');
    const [selectedGRAPHICS, setSelectedGRAPHICS] = useState('');

    const hddId = Harddisk.find((obj) => obj.price === selectedHDD.toString())?.id || null;
    const sddId = Sdd.find((obj) => obj.price === selectedSDD.toString())?.id || null;
    const ramId = Ram.find((obj) => obj.price === selectedRAM.toString())?.id || null;
    const graphicsId = Grap.find((obj) => obj.price === selectedGRAPHICS.toString())?.id || null;
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        companyName: Yup.string().required('Company Name is required'),
        productType: Yup.string().required('Please select a product type'),
        price: Yup.number().required('Price is required').min(1, 'Min').max(100000, 'Max'),


    });
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
    const onSubmit = (values, { resetForm }) => {
        console.log(values.sdd)
        let obj = {
            name: values.title,
            company: values.companyName,
            type: values.productType,
            price: values.price,
            hdd: hddId,
            sdd: sddId,
            ram: ramId,
            graphicscard: graphicsId,
            img: selectedImages,
            id: values.id,
            description: content
        }
        console.log(obj)
        Products[index] = obj
        console.log(Products)


        localStorage.setItem("Products", JSON.stringify(Products))
        navigate('/productsanalytics')
        // localStorage.removeItem("Edit")
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
        setSelectedImages([])
        setContent('')
        setSelectedHDD('')
        setSelectedSDD('')
        setSelectedRAM('')
        setSelectedGRAPHICS('')
        resetForm()
    }

    const Edit = JSON.parse(localStorage.getItem("Edit"))

    const Products = JSON.parse(localStorage.getItem("Products"))
    const index = Products.findIndex(item => item.id === Edit);
    console.log(index)

    console.log()
    let Meet = Products[index]

    return (
        <div>
            <AdminSidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}  >
                <div className='col-lg-5'>
                    <Formik
                        initialValues={{
                            title: Meet.name || '',
                            companyName: Meet.company || '',
                            productType: Meet.type || '',
                            price: Meet.price || '',
                            img: Meet.img || [],
                            hdd: Meet.hdd || '',
                            graphicscard: Meet.graphicscard || '',
                            sdd: Meet.sdd || '',
                            id: Meet.id
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
                                    <div className="mt-4">
                                        <label htmlFor="abc">Hard Disk</label>
                                        <br />
                                        <Field type="hidden" name="switchValue" value={isChecked} />
                                        <Switch
                                            checked={isChecked}
                                            onChange={handleSwitchChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            name="isChecked"
                                            id='abc'
                                        />
                                        <Field onChange={(e) => setSelectedHDD(e.target.value)} value={selectedHDD} className="form-select" name="hdd" id="hdd" disabled={!isChecked} as="select">
                                            <option value="">Select Hdd</option>
                                            {Harddisk.map((i) => (
                                                <option key={i.id} value={i.price}>
                                                    {i.label}
                                                </option>
                                            ))}

                                        </Field>

                                        <ErrorMessage name="hdd" component="div" className="error-message text-danger" />


                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="abc2">SDD</label>
                                        <br />
                                        <Field type="hidden" name="switchValue2" value={isChecked2} />
                                        <Switch
                                            checked={isChecked2}
                                            onChange={handleSwitchChange2}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            name="isChecked2"
                                            id='abc2'
                                        />
                                        <Field value={selectedSDD} onChange={(e) => setSelectedSDD(e.target.value)} className="form-select" name="sdd" id="sdd" disabled={!isChecked2} as="select">
                                            <option value="">Select SDD</option>

                                            {Sdd.map((i) => (
                                                <option key={i.id} value={i.price}>
                                                    {i.label}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="sdd" component="div" className="error-message text-danger" />


                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="abc2">RAM</label>
                                        <br />
                                        <Field type="hidden" name="switchValue2" value={isChecked4} />
                                        <Switch
                                            checked={isChecked4}
                                            onChange={handleSwitchChange4}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            name="isChecked4"
                                            id='abc2'
                                        />
                                        <Field value={selectedRAM} onChange={(e) => setSelectedRAM(e.target.value)} className="form-select" name="ram" id="ram" disabled={!isChecked4} as="select">
                                            <option value="">Select RAM</option>

                                            {Ram.map((i) => {
                                                return (
                                                    <option key={i.id} value={i.price}>
                                                        {i.label}
                                                    </option>
                                                );
                                            })}
                                        </Field>

                                        <ErrorMessage name="sdd" component="div" className="error-message text-danger" />

                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="graphicscard">Graphics Cards</label>
                                        <br />
                                        <Field type="hidden" name="switchValue3" value={isChecked3} />
                                        <Switch
                                            checked={isChecked3}
                                            onChange={handleSwitchChange3}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            name="isChecked3"
                                            id='graphicscard'
                                        />
                                        <Field value={selectedGRAPHICS} onChange={(e) => setSelectedGRAPHICS(e.target.value)} className="form-select" name="graphicscard" id="graphicscard" disabled={!isChecked3} as="select">
                                            <option value="">Select Graphics</option>

                                            {Grap.map((i) => {
                                                return (

                                                    <option key={i.id} value={i.price}>
                                                        {i.label}
                                                    </option>
                                                )
                                            })}

                                        </Field>

                                        <ErrorMessage name="hdd" component="div" className="error-message text-danger" />


                                    </div>
                                    <div className="mt-4">

                                        <JoditEditor

                                            value={content}
                                            tabIndex={1}
                                            onBlur={newContent => setContent(newContent)}
                                            onChange={newContent => setContent(newContent)}
                                        />

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
    )
}
