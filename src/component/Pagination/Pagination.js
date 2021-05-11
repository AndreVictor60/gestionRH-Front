/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

export class Pagination extends Component {
    render() {
        const { totalPages, currentPage, paginate, nextPage, prevPage} = this.props;

        const pageNumbers = [];
       
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return (
            <nav className="mt-2">
                <ul className="pagination justify-content-center">
                    {currentPage > 0 &&   
                    <li className="page-item">
                        <a className="page-link" onClick={() => prevPage()}>Précedent</a>
                    </li>
                    }
                    {totalPages > 1 &&
                        pageNumbers.map(num => (
                            <li  className={`page-item ${currentPage === num - 1 ? "active" : ""}`} key={num}>
                                <a onClick={() => paginate(num - 1)} href="#" className="page-link">{num}</a>
                            </li>
                        ))
                    }
                    {currentPage !== totalPages - 1 &&
                    <li className="page-item">
                        <a className="page-link" onClick={() => nextPage()}>Suivant</a>
                    </li>
                    }
                </ul>
            </nav>
        )
    }
}

export default Pagination