import React from 'react';
import PropTypes from 'prop-types';

function StudyList({ id, study, totalReport }) {
    return (
        <div>
            {
                <a href="#" className="list-group-item list-group-item-action">{study}<span className="badge badge-primary badge-pill float-right">{totalReport}</span></a>
            }
        </div>
    )
}

export default StudyList;

StudyList.propTypes = {
    id: PropTypes.number.isRequired,
    study: PropTypes.string.isRequired,
    totalReport: PropTypes.number.isRequired
}
