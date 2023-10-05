import React, { useRef, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Chart from 'react-apexcharts';

export default function AdminDashboard() {
    const mainRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };

    const [options, setOptions] = useState({
        chart: {
            width: 380,
            type: 'pie', // Use 'pie' type for a pie chart
        },
        labels: ['Pending ', 'Processing ', 'Complet'], // Replace with your labels
    });
    const order = JSON.parse(localStorage.getItem("Order"))
    
    const [series, setSeries] = useState([100, 100, 100]);

    return (
        <div>
            <AdminSidebar />
            <div className={`main  ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea vel, molestiae ipsum maxime nostrum a fugit iure provident ullam voluptates fugiat voluptatem, ut at animi magni molestias assumenda odio repellendus?
                </div>
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <h1 className='text-center'>Products_Order</h1>
                            <Chart

                                options={options}
                                series={series}
                                type="pie"
                                width="500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
