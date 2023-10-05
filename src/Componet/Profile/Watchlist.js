import React from 'react';
import Sidebar from './Sidebar';
import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Watchlist() {
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const alldata = JSON.parse(localStorage.getItem("Alldata"));
    const login = JSON.parse(localStorage.getItem("Login"));
    const index = alldata.findIndex((i) => i.F_Name === login);
    console.log(alldata[index].watchlist);
    const Products = JSON.parse(localStorage.getItem("Products"));

    const matchingProducts = [];

    if (alldata && Products) {
        for (let i = 0; i < alldata[index].watchlist.length; i++) {
            for (let j = 0; j < Products.length; j++) {
                if (alldata[index].watchlist[i] === Products[j].id) {
                    matchingProducts.push(Products[j]);
                    console.log(matchingProducts);
                }
            }
        }
    }

    return (
        <div>
            <Sidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                {/* Render your matching products here */}
                <div className="row">
                    {matchingProducts.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mt-4" >
                            <div class="card" >
                                <div>
                                    <Link to={'/products/' + product.type + "/" + product.id} className='anchor'>

                                        <img src={product.img[0]} className="img-fluid  images p-3" alt="..." />
                                    </Link>

                                    <div class="card-body">

                                        <h5 class="card-title">Title:-{product.name}</h5>
                                        <h5>Company_Name:-{product.company}</h5>
                                        <Link to={'/products/' + product.type + "/" + product.id} className='anchor'>

                                            <h5 class="card-text">₹<span className='fs-3'>{product.price}</span> </h5>
                                        </Link>


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
