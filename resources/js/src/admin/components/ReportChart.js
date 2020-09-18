import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { curveCardinal } from 'd3-shape';
import { indexCounter } from '../../utility/StudyUtility';

function ReportChart(props) {

    useEffect(() => {
        console.log(indexCounter(props.reports, "Passed", "numberOfStatus"));
    })

    const data = [
        {
            name: 'Passed', uv: indexCounter(props.reports, "passed", "numberOfStatus")
        },
        {
            name: 'Failed', uv: indexCounter(props.reports, "failed", "numberOfStatus")
        },
        {
            name: 'Programming', uv: indexCounter(props.reports, "programming", "numberOfStatus")
        },
        {
            name: 'Testing', uv: indexCounter(props.reports, "testing", "numberOfStatus")
        }
    ];

    const cardinal = curveCardinal.tension(0.1);

    return (
        <div className="card shadow-sm mb-5">
            <div className="card-header font-weight-bold">Bar Chart</div>
            {/* <h4 className="mt-3">Bar Chart</h4> */}
            <h6 className="text-center mt-2">A bar chart provides a way of showing data values represented as vertical bars.</h6>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10, right: 65, left: 0, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        <Area type={cardinal} dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ReportChart
