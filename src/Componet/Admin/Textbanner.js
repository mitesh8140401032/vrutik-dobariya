import React, { useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { useNavigate } from 'react-router-dom'
import AdminSidebar from './AdminSidebar';

export default function Textbanner() {
    const mainRef = useRef(null);

    const text = [];
    const navigate = useNavigate('')
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };



    const onSubmit = (values, { resetForm }) => {

        console.log(values);
        let obj = {
            txt: capitalizeFirstLetterAllWords(values.sentence),
            txtcolor: values.txtColor,
            txtbackground: values.bgColor
        }
        console.log(obj)
        text.push(obj);
        console.log(text)
        localStorage.setItem("Text", JSON.stringify(text))
        resetForm()
    }
    const capitalizeFirstLetterAllWords = (str) => {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    const validationSchema = Yup.object().shape({
        sentence: Yup.string().required('Field is required'),
        txtColor: Yup.string().required('Text color is required'),
        bgColor: Yup.string().required('Background color is required')
            .test('color-mismatch', 'Text and background colors must be different', function (value) {
                return value !== this.parent.txtColor;
            }),
    });
    return (
        <div>
            <AdminSidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}  >
                <div className="container">
                    <div className="row d-flex justify-content-start m-0 ">
                        <div className="col-lg-4 col-sm-12 m-0 p-0">
                            <Formik
                                initialValues={{ sentence: '', txtColor: '', bgColor: '' }}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div>
                                            <label htmlFor="sentence">Field Name</label>
                                            <Field type="text" id="sentence" name="sentence" className="form-control" />
                                            <ErrorMessage name="sentence" component="div" className='text-danger' />
                                        </div>
                                        <div>
                                            <label htmlFor="txtColor">Text Color</label>
                                            <Field type="color" id="txtColor" name="txtColor" className="form-control" />
                                            <ErrorMessage name="txtColor" component="div" className='text-danger' />
                                        </div>
                                        <div>
                                            <label htmlFor="bgColor">Backgorund Color</label>
                                            <Field type="color" id="bgColor" name="bgColor" className="form-control" />
                                            <ErrorMessage name="bgColor" component="div" className='text-danger' />
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button type="submit" className='button mt-4' disabled={isSubmitting}>Submit</button>

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





