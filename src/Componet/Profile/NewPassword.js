import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Sidebar from './Sidebar';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
        .required('New Password is required'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export default function NewPassword() {
    const alldata = JSON.parse(localStorage.getItem("Alldata"))
    const login = JSON.parse(localStorage.getItem("Login"))
    const index = alldata.findIndex(item => item.F_Name === login);

    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };

    console.log(alldata[index].Password)
    const handleSubmit = (values, { resetForm }) => {

        console.log(values);
        if (alldata[index].Password === values.oldPassword) {
            console.log("Successfully Password")

            alldata[index].Password = values.newPassword
            localStorage.setItem('Alldata', JSON.stringify(alldata))
            toast.success('Successfully Password Change!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error('Your old password does not match !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("")
        }

        resetForm();

    };


    // console.log(alldata[index].Password)


    return (
        <div>
            <Sidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                <div className="container p-3">
                    <div className="row  ">
                        <div className="col-lg-5 col-md-8 col-sm-12 profile p-0 p-4">
                            <h1>Change Password</h1>
                            <Formik
                                initialValues={{
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <Field type="password" name="oldPassword" className="form-control" />
                                        <ErrorMessage name="oldPassword" component="div" />

                                        <label htmlFor="newPassword">New Password</label>
                                        <Field type="password" name="newPassword" className="form-control" />
                                        <ErrorMessage name="newPassword" component="div" />

                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Field type="password" name="confirmPassword" className="form-control" />
                                        <ErrorMessage name="confirmPassword" component="div" />

                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
