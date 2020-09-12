import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

export default function TableRow({ id, report_name, study, status, totalComments }) {
    const history = useHistory();

    const rowStyle = {
        cursor: 'pointer'
    }

    function reportSelect(id){
        history.push(`/report/${id}`);
    }


    return (
        <>
            <tr className="d-flex" style={rowStyle} onClick={reportSelect.bind(this, id)}>
                <td className="col-2">{id}</td>
                <td className="col-3">{report_name}</td>
                <td className="col-3">{study}</td>
                <td className="col-2"><h4><span className="border badge badge badge-success">{status}</span></h4></td>
                <td className="col-2 font-weight-bold">{totalComments}</td>
            </tr>
        </>
    )
}

TableRow.propTypes = {
    id: PropTypes.number.isRequired,
    report_name: PropTypes.string.isRequired,
    study: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired
}
