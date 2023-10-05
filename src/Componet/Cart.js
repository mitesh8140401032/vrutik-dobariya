import React, { useEffect, useState } from 'react';
import LayoutProct from './LayoutProct';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const Navigate = useNavigate()
    let alldata = []
    let login = []
    let products = []
    if (localStorage.getItem("Alldata")) {

        alldata = JSON.parse(localStorage.getItem('Alldata'));
    }
    if (localStorage.getItem("Login")) {

        login = JSON.parse(localStorage.getItem('Login'));
    }
    if (localStorage.getItem("Products")) {
        products = JSON.parse(localStorage.getItem('Products'));

    }
    const index = alldata.findIndex((item) => item.F_Name === login);
    const matchingProducts = [];

    if (alldata && products) {
        for (let i = 0; i < alldata[index].cart.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (alldata[index].cart[i] === products[j].id) {
                    matchingProducts.push(products[j]);

                }
            }
        }
    }

    // Cart Remove Items arrow
    const handleremove = (id) => {
        const updatedCart = alldata[index].cart.filter((itemId) => itemId !== id);

        alldata[index].cart = updatedCart;
        console.log(updatedCart)

        localStorage.setItem('Alldata', JSON.stringify(alldata));
        console.log(alldata)
        // window.location.reload();
        Navigate('/cart')
    };

    return (
        <LayoutProct>
            <div className="container pt-5 ">
                <div className="row pt-5 d-flex justify-content-center">
                    {matchingProducts.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mt-4 pt-5">
                            <div className="card p-3">
                                <h1 onClick={() => handleremove(product.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </h1>
                                <Link to={'/products/' + product.type + '/' + product.id} className="anchor">
                                    <img
                                        src={product.img[0]}
                                        className="card-img-top"
                                        alt="..."
                                        height={250}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Link>
                                <div className="card-body">
                                    <Link to={'/products/' + product.type + '/' + product.id} className="anchor">
                                        <h5 className="card-title">Owner:-{product.name}</h5>
                                    </Link>
                                    <Link to={'/products/' + product.type + '/' + product.id} className="anchor">
                                        <h5>Type:-{product.type}</h5>
                                    </Link>
                                    <h5>Company:-{product.company}</h5>
                                    <Link to={'/products/' + product.type + '/' + product.id} className="anchor">
                                        <h5 className="card-text">Price:-₹{product.totalprice}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutProct>
    );
}
