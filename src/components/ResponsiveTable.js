import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import apiClient from "../utils/apiClient";

const ResponsiveTable = ({ headings, isReadyToRender, setIsReadyToRender, data, setData, paginateLinks, setLinks }) => {

    const handlePaginator = async (url) => {
        if (url !== null) {
            setIsReadyToRender(false);
            await apiClient.get(url).
                then((response) => {
                    setData(response.data.data);
                    setLinks(response.data.links);
                    setIsReadyToRender(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
    };

    if (!isReadyToRender) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        );

    } else {
        return (
            <div>
                <div className="table-responsive" style={{ marginTop: '2em' }}>
                    <table className="table table-bordered table-light table-hover align-middle" id="table">
                        <thead className="table-dark">
                            <tr className="text-center">
                                {
                                    headings.map((value, index) => (
                                        <th key={index}>{value}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((object, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        {
                                            Object.values(object).map((value, subIndex) => (
                                                <td key={subIndex}>{value}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <ul className="pagination">
                            {paginateLinks.map(link => (
                                <li key={link.label} className={`page-item${link.active ? ' active' : ''}${link.url === null ? ' disabled' : ''}`}>
                                    <a className="page-link" onClick={() => { handlePaginator(link.url) }}>
                                        {
                                            !link.label.includes('Previous') && !link.label.includes('Next') ? (link.label) : (
                                                link.label.includes('Previous') ? ('Anterior') : ('Siguiente')
                                            )
                                        }
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default ResponsiveTable;