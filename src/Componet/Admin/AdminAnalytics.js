import React from 'react'
import AdminSidebar from './AdminSidebar'
import { useState } from 'react';
import { useRef } from 'react';
import MUIDataTable from "mui-datatables";

import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function AdminAnalytics() {
    const mainRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };

    const columns = [
        {
            name: "F_Name",
            label: "User",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "img",
            label: "Profile",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <div>
                            <img
                                src={value} // Assuming "img" contains the image URL
                                alt="Profile"
                                style={{ width: '100px', height: 'auto' }}
                            />
                        </div>
                    );
                },
            }
        },
        {
            name: "Email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Password",
            label: "Password",
            options: {
                filter: true,
                sort: false,

            }
        },

        {
            label: "Contact_Number",
            name: "Contact_Number"
        },
        // {
        //     name: "View",
        //     options: {
        //         customBodyRender: (value, tableMeta) => {
        //             return (
        //                 <button className='btn btn-success'>View</button>
        //             );
        //         },

        //     }
        // }

    ];



    const data = JSON.parse(localStorage.getItem("Alldata"))




    const options = {
        filterType: 'checkbox',
    };
    return (
        <div>
            <AdminSidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}  >
                <div>
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={"Employee List"}
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
