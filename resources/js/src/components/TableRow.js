import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function TableRow({ id, report_name, study, status, totalComments }) {
    const history = useHistory();
    var statusColors = {
        "passed": "badge-success",
        "failed": "badge-danger",
        "programming": "badge-warning",
        "testing": "badge-info",
    }
    const rowStyle = {
        cursor: 'pointer'
    }

    function reportSelect(id){
        history.push(`/reports/${id}`);
    }


    return (
        <>
            <tr className="d-flex" style={rowStyle} onClick={reportSelect.bind(this, id)}>
                <td className="col-2">{id}</td>
                <td className="col-3">{report_name}</td>
                <td className="col-3">{study}</td>
                <td className="col-2"><h4><span className={`border badge badge ${statusColors[status]}`}>{status}</span></h4></td>
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
