/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

export class Pagination extends Component {
    render() {
        const { totalPages, currentPage, paginate} = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className="mt-2">
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(num => (
                        <li  className={`page-item ${currentPage === num - 1 ? "active" : ""}`} key={num}>
                            <a onClick={() => paginate(num - 1)} href="#" className="page-link">{num}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

export default Pagination