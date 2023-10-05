import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [generatedOTP, setGeneratedOTP] = useState('');
    const navigate = useNavigate('')
    const initialValues = {
        number: '',
        otp: '',
    };

    const validationSchema = {
        step1: Yup.object({
            number: Yup.string()
                .matches(/^\d+$/, 'Please enter a valid phone number')
                .required('Phone Number is required'),
        }),
        step2: Yup.object({
            otp: Yup.string()
                .matches(/^\d{4}$/, 'Please enter a valid 4-digit OTP')
                .required('OTP is required'),
        }),
    };

    const generateOTP = () => {
        const min = 1000;
        const max = 9999;
        const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return newRandomNumber.toString();
    };
    let alldata = []
    if (localStorage.getItem("Alldata")) {

        alldata = JSON.parse(localStorage.getItem('Alldata'))
    }
    const handleStep1Submit = (values, { resetForm }) => {

        const index = alldata.findIndex(item => item.Contact_Number === values.number);
        console.log(index)
        const newOTP = generateOTP();
        const phoneNumber = encodeURIComponent(values.number);
        const message = encodeURIComponent(`Your verification code is: ${newOTP}. Please use it to complete your WhatsApp number`);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        if (index === -1) {

            console.log("Not found")
        }
        else {
            console.log("success")
            window.open(whatsappUrl, '_blank');
            localStorage.setItem("Moblie_Number", JSON.stringify(values.number))
            setStep(2);
            setGeneratedOTP(newOTP);
        }

        resetForm();
    };

    const handleStep2Submit = (values, { resetForm }) => {
        if (values.otp === generatedOTP) {
            navigate('/password');
            setStep(1);
        } else {
            console.log('OTP is incorrect');
        }

        resetForm();
    };

    return (
        <div className='forget'>
            <div>
                <div className="col-lg-12 maindiv">
                    {step === 1 ? (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema.step1}
                            onSubmit={handleStep1Submit}
                        >
                            <Form>
                                <h2>Find Your Account</h2>
                                <p>Please enter your phone number to send a WhatsApp message.</p>
                                <div className="form-group">
                                    <Field
                                        type="number" // Change the input type to "number"
                                        name="number"
                                        placeholder="Phone Number"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="number" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="mt-3">
                                    Send WhatsApp Message
                                </button>
                            </Form>
                        </Formik>
                    ) : (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema.step2}
                            onSubmit={handleStep2Submit}
                        >
                            <Form>
                                <h1>Enter Your Code</h1>
                                <div>
                                    <Field
                                        type="text"
                                        name="otp"
                                        className=''
                                        maxLength="4"
                                        placeholder="OTP"
                                    />
                                    <ErrorMessage name="otp" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="mt-3">
                                    Verify OTP
                                </button>
                            </Form>
                        </Formik>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
