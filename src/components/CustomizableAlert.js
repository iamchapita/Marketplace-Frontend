import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const CustomizableAlert = ({ title, text, variant = 'danger' }) => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="12">
                    <Alert variant={variant} className="text-center">
                        <h1>{title}</h1>
                        <p>{text}</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomizableAlert;