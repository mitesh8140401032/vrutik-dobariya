import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import AdminSidebar from './AdminSidebar';



export default function Banner() {
    const Navigate = useNavigate()
    const formRef = useRef(null);
    const mainRef = useRef(null);


    const [imageBase64Array, setImageBase64Array] = React.useState([]);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };

    const handleimg = async (img) => {
        const newImages = Array.from(img.target.files);
        const base64Images = await Promise.all(newImages.map(imageToBase64));
        setImageBase64Array(base64Images);
    }

    const imageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handlesubmit = () => {
        localStorage.setItem("Banner", JSON.stringify(imageBase64Array))
        console.log(imageBase64Array);
        Navigate('/')
        // if (formRef.current) {
        //     formRef.current.reset();
        // }

    }


    return (
        <div>
            <AdminSidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}  >

                <div>


                    <div className="row d-flex justify-content-start">

                        <div className="col-lg-5">
                            <form ref={formRef}>
                                <input type="file" onChange={(event) => handleimg(event)} accept='image/*' multiple className='form-control' />
                                <div className='d-flex justify-content-center'>

                                    <button className='button mt-4' onClick={handlesubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}
