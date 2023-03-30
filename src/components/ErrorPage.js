import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const ErrorPage = ({ title, text }) => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="8">
                    <Alert variant="danger" className="text-center">
                        <h1>{title}</h1>
                        <p>{text}</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default ErrorPage;