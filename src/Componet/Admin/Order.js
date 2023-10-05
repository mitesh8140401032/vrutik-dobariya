import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import AdminSidebar from './AdminSidebar';
import MUIDataTable from "mui-datatables";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function Order() {
    const Navigate = useNavigate('')
    const mainRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };
    const columns = [
        {
            name: "UserId",
            label: "UserId",
            options: {
                filter: true,
                sort: true,
            }
        },
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
            name: 'Status',
            label: 'Status',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {

                    const rowData = data[tableMeta.rowIndex];

                    const handleStatusChange = (e) => {
                        const selectedValue = e.target.value;

                        // Admin Order_Find Index
                        const index = data.findIndex((i) => i.OrderId === rowData.OrderId);
                        data[index].Status = selectedValue;
                        
                        localStorage.setItem("Order", JSON.stringify(data));

                        // Alldata
                        const UserIndex = Alldata.findIndex(i => i.UserId === rowData.UserId)
                        let order = Alldata[UserIndex].myOrder
                        const OrderFindStatus = order.findIndex(i => i.OrderId = rowData.OrderId)
                        order[OrderFindStatus].Status = selectedValue


                        order = Alldata[UserIndex].myOrder
                        localStorage.setItem("Alldata", JSON.stringify(Alldata))


                        updateValue(selectedValue);
                        Navigate('/order');
                    };


                    return (
                        <select
                            value={value}
                            onChange={handleStatusChange}
                            className="form-select"
                        >
                            {/* <option value="">Status</option> */}
                            <option value="readytoShip">Ready to Ship</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    );
                },
            },
        },




    ];

    let data = JSON.parse(localStorage.getItem("Order"))

    let pendingOrders = []
    let readytoShipOrders = []
    let shippedOrders = []
    let deliveredOrders = []
    let cancelOrders = []
    let returnOrders = []
    if (data) {

        pendingOrders = data.filter(order => order.Status === 'pending');
        readytoShipOrders = data.filter(order => order.Status === 'readytoShip');
        shippedOrders = data.filter(order => order.Status === 'shipped');
        deliveredOrders = data.filter(order => order.Status === 'delivered');
        cancelOrders = data.filter(order => order.Status === 'cancel');
        returnOrders = data.filter(order => order.Status === 'return');
    }

    const Alldata = JSON.parse(localStorage.getItem("Alldata"))


    const options = {
        filterType: 'checkbox',
    };
    return (
        <div>
            <AdminSidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}  >
                <Tabs
                    defaultActiveKey="Pending"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="Pending" title="Pending" className="text-center">
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Order List"}
                                        data={pendingOrders}
                                        columns={columns}
                                        options={options}
                                        className="text-center"
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </Tab>
                    <Tab eventKey="Ready to Shipped" title="Ready to Ship" className="text-center">
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Ready to Shipped"}
                                        data={readytoShipOrders}
                                        columns={columns}
                                        options={options}
                                        className="text-center"
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </Tab>
                    <Tab eventKey="Shipped" title="Shipped" className="text-center">
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Shipped"}
                                        data={shippedOrders}
                                        columns={columns}
                                        options={options}
                                        className="text-center"
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </Tab>
                    <Tab eventKey="Delivered" title="Delivered" className="text-center">
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Delivered"}
                                        data={deliveredOrders}
                                        columns={columns}
                                        options={options}
                                        className="text-center"
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </Tab>
                    <Tab eventKey="Cancel" title="Cancel_Order" className="text-center">
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Delivered"}
                                        data={cancelOrders}
                                        columns={columns}
                                        options={options}
                                        className="text-center"
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </Tab>
                    <Tab eventKey="Return" title="Return_Order" className="text-center">
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Delivered"}
                                        data={returnOrders}
                                        columns={columns}
                                        options={options}
                                        className="text-center"
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        </div>
    )
}
