import React from 'react'
import AdminSidebar from './AdminSidebar'
import { useState } from 'react';
import { useRef } from 'react';
import MUIDataTable from "mui-datatables";
import parse from 'html-react-parser';


import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function ProductsAnalytics() {
    useEffect(() => {
        localStorage.removeItem("Edit")
    }, [])
    const mainRef = useRef(null);
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };
    const handleEdit = (data) => {
        console.log(data.id)
        localStorage.setItem("Edit", JSON.stringify(data.id))
        navigate('/edit')

    }
    const handleremove = (i) => {
        console.log(i.id)
        let Produtcs = []
        if (localStorage.getItem("Products")) {
            Produtcs = JSON.parse(localStorage.getItem("Products"))
        }
        let newdata = Produtcs.filter(obj => obj.id !== i.id)
        console.log(newdata)
        localStorage.setItem("Products", JSON.stringify(newdata))
        navigate("/productsanalytics")

    }
    const columns = [
        {
            name: "name",
            label: "name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "company",
            label: "company",
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
                    console.log(value, "IMg")
                    return (
                        <div>
                            <img
                                src={value[0]}
                                alt="Profile"
                                style={{ width: '100px', height: 'auto' }}
                            />
                        </div>
                    );
                },
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
            name: "type",
            label: "type",
            options: {
                filter: true,
                sort: false,

            }
        },
        {
            name: "Edit",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const rowData = data[tableMeta.rowIndex];
                    return (
                        <button className='btn btn-success' onClick={() => handleEdit(rowData)} >Edit</button>
                    );
                },

            }
        },
        {
            name: "Remove",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const rowData = data[tableMeta.rowIndex];
                    return (
                        <button className='btn btn-success' onClick={() => handleremove(rowData)} >Edit</button>
                    );
                },

            }
        }
    ];



    const data = JSON.parse(localStorage.getItem("Products"))
    console.log(data)



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
                                title={"Products"}
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
