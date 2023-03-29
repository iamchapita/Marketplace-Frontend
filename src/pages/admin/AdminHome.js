import React from 'react';
import { Navigate } from 'react-router-dom';
import ErrorPage from '../../components/ErrorPage';
import { Container, Row, Col } from 'react-bootstrap';

const AdminHome = ({ isLoggedIn, setLoggedIn, isAdmin, setIsAdmin }) => {

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }

    if (isAdmin === false) {
        return (
            <div>
                <ErrorPage />
            </div>
        );
    }

    if (isAdmin === true) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className='row mx-4 my-3'>
                    <div className='col-md-3'>
                        <div className='col-md-12 container-style' style={{ margin: '0 0 1em 0'}}>
                            <ul>
                                <li>
                                    <a href='/'>Home</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <div className='col-md-12 container-style'>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                <div className="col">
                                    <div className="card h-100">
                                        <img src="..." className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100">
                                        <img src="..." className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">This is a short card.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100">
                                        <img src="..." className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100">
                                        <img src="..." className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminHome;