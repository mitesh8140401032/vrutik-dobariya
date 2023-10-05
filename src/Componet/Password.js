import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Password = () => {
    const navigate = useNavigate()
    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        password: Yup.string()

            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        let alldata = []
        let moblie = []
        if (localStorage.getItem("Alldata")) {

            alldata = JSON.parse(localStorage.getItem('Alldata'))
        }
        if (localStorage.getItem("Moblie_Number")) {

            moblie = JSON.parse(localStorage.getItem('Moblie_Number'))
        }

        const index = alldata.findIndex(item => item.Contact_Number === moblie);
        console.log(index)
        console.log(alldata[index].Password = values.password)
        localStorage.setItem("Alldata", JSON.stringify(alldata))


        navigate('/login')
        resetForm();
    };

    return (
        <div className='forget'>
            <div>
                <div className="col-lg-12 p-5 maindiv">
                    <h1>New Password</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="form-control"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </div>

                            <button type="submit" className="mt-3">
                                Submit
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Password;
