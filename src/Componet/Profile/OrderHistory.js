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
export default function OrderHistory() {
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const Navigate = useNavigate()

    const columns = [
        {
            name: "OrderId",
            label: "OrderId",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "OrderTD",
            label: "Time & Date",
            options: {
                filter: false,
                sort: false,

            }
        },
        {
            name: "ProductId",
            label: "ProductId",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "ProductPrice",
            label: "ProductPrice",
            options: {
                filter: true,
                sort: false,

            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: true,
                sort: false,

            }
        },
        {
            name: "UserId",
            label: "UserId",
            options: {
                filter: true,
                sort: false,

            }
        },
        {
            name: "Remove",
            label: "Option",
            options: {

                customBodyRender: (value, tableMeta) => {
                    const rowData = data[tableMeta.rowIndex];
                    const orderStatus = data.findIndex(i => i.OrderId === rowData.OrderId)
                    const adminOrder = order.findIndex(i => i.OrderId === rowData.OrderId)

                    const handleOrder = (e) => {


                        data[orderStatus].Status = e
                        order[adminOrder].Status = e

                        localStorage.setItem("Order", JSON.stringify(order))
                        alldata[index].myOrder = data
                        
                        localStorage.setItem("Alldata", JSON.stringify(alldata))
                        console.log(data)
                        console.log(alldata)

                        Navigate('/orderHistory')
                    }



                    return (<>

                        <select onChange={(e) => handleOrder(e.target.value)} className='form-select' disabled={data[orderStatus].Status == 'shipped'} >
                            {data[orderStatus].Status == 'pending' ?
                                <option value="cancel">Cancel</option>
                                : data[orderStatus].Status == 'readytoShip' ?
                                    <option value="cancel">Cancel</option>
                                    : data[orderStatus].Status == 'delivered' ?
                                        <option value="return">Return</option>
                                        : ''}

                        </select>
                    </>)
                }
            }
        },



    ];



    const alldata = JSON.parse(localStorage.getItem("Alldata"))
    const order = JSON.parse(localStorage.getItem("Order"))

    const login = JSON.parse(localStorage.getItem("Login"))
    const index = alldata.findIndex(i => i.F_Name == login)
    let data = alldata[index].myOrder



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
                                data={data}
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
