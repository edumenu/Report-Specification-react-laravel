import React from 'react'

export default function Pagination({ comments, searchComments }) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${comments.prev_page_url === null ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => searchComments("previous", null)} tabIndex="-1">Previous</button>
                </li>
                <li className={`page-item ${comments.next_page_url === null ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => searchComments("next", null)}>Next</button>
                </li>
            </ul>
        </nav>
    )
}
