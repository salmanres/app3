import React, { Fragment, useState } from 'react'
import { BarChart, Bar, PieChart, Pie } from "recharts";

function AdminMenu() {
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const data01 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
    ];
    const data02 = [
        { name: "A1", value: 100 },
        { name: "A2", value: 300 },
        { name: "B1", value: 100 },
        { name: "B2", value: 80 },
        { name: "B3", value: 40 },
        { name: "B4", value: 30 },
        { name: "B5", value: 50 },
        { name: "C1", value: 100 },
        { name: "C2", value: 200 },
        { name: "D1", value: 150 },
        { name: "D2", value: 50 }
    ];
    return (
        <Fragment>
            <div className='container-fluid g-0 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-10 mt-5 justify-content-center'>
                        <BarChart width={310} height={180} data={data} barSize={29}>
                            <Bar dataKey="uv" fill="orange" />
                        </BarChart>
                        <label className='label-2 border-warning w-100 rounded-0 shadow-sm mb-4'>SALES</label>
                        <div className='left'>
                            <PieChart width={600} height={500}>
                                <Pie
                                    data={data01}
                                    dataKey="value"
                                    cx={200}
                                    cy={200}
                                    outerRadius={60}
                                    fill="orange"
                                />
                                <Pie
                                    data={data02}
                                    dataKey="value"
                                    cx={200}
                                    cy={200}
                                    innerRadius={70}
                                    outerRadius={90}
                                    fill="orange"
                                    label
                                />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminMenu