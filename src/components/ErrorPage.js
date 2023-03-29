import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const ErrorPage = () => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="8">
                    <Alert variant="danger" className="text-center">
                        <h1>Acceso denegado</h1>
                        <p>No tienes permisos para acceder a esta página.</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default ErrorPage;