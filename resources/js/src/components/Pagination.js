import React from 'react'

export default function Pagination() {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${comments.prev_page_url === null ? "disabled" : ""}`}>
                    <button className="page-link" onClick={searchComments} tabIndex="-1">Previous</button>
                </li>
                <li className="page-item"><a className="page-link" onClick={searchComments}>1</a></li>
                <li className="page-item"><a className="page-link" onClick={searchComments}>2</a></li>
                <li className="page-item"><a className="page-link" onClick={searchComments}>3</a></li>
                <li className={`page-item ${comments.next_page_url === null ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => searchComments("next")}>Next</button>
                </li>
            </ul>
        </nav>
    )
}
