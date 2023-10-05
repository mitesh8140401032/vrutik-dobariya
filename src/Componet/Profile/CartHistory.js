import React from 'react'
import Sidebar from './Sidebar'
import { useRef } from 'react';
import { useState } from 'react';
import MUIDataTable from "mui-datatables";

import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function CartHistory() {
    const Navigate = useNavigate()
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const columns = [
        {
            name: "name",
            label: "Title",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "company",
            label: "company",
            options: {
                filter: false,
                sort: false,

            }
        },
        {
            name: "type",
            label: "type",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "price",
            label: "price",
            options: {
                filter: true,
                sort: false,

            }
        },


        {
            name: "Remove",
            label: "Order_Cancel",
            options: {

                customBodyRender: (value, tableMeta) => {
                    const rowData = matchingProducts[tableMeta.rowIndex];
                    const handleRemove = () => {
                        const updatedCart = alldata[index].cart.filter((itemId) => itemId !== rowData.id);
                        alldata[index].cart = updatedCart;
                        console.log(updatedCart)
                        console.log(alldata)
                        localStorage.setItem('Alldata', JSON.stringify(alldata));
                        Navigate('/cartHistory')

                    }
                    // console.log(value)
                    return (<>
                        <button className='btn btn-danger' onClick={handleRemove} >Remove</button>
                    </>)
                }
            }
        },



    ];

    const alldata = JSON.parse(localStorage.getItem("Alldata"))
    const login = JSON.parse(localStorage.getItem("Login"))
    const index = alldata.findIndex(i => i.F_Name == login)

    const cartProducts = JSON.parse(localStorage.getItem("Products"))
    const matchingProducts = [];

    if (alldata && cartProducts) {
        for (let i = 0; i < alldata[index].cart.length; i++) {
            for (let j = 0; j < cartProducts.length; j++) {
                if (alldata[index].cart[i] === cartProducts[j].id) {
                    matchingProducts.push(cartProducts[j]);

                }
            }
        }
    }
    const data = alldata[index].myOrder
    const filteredData = data.filter(item => item.Status !== "pendding");

    const options = {
        filterType: 'checkbox',
    };
    return (
        <div>
            <Sidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                <div>
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"Order List"}
                                data={matchingProducts}
                                columns={columns}
                                options={options}
                                className="text-center"
                            />
                        </ThemeProvider>
                    </CacheProvider>
                </div>
            </div>
        </div>
    )
}
